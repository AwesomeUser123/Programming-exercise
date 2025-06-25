import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./ChatPage.scss";
import { useNavigate } from "react-router-dom";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showTimestampIndex, setShowTimestampIndex] = useState(null);
  const navigate = useNavigate();
  const chatRef = useRef(null);

  const user = JSON.parse(sessionStorage.getItem("user"));
  const username = user?.username;

  // Load chat history on mount
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/contact/chatHistory", {
          params: { username }
        });
        setMessages(res.data);
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };
    fetchMessages();
  }, [username]);

  // Scroll to bottom on new messages
  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message to backend
  const sendMessage = async () => {
    if (!input.trim()) return;

    try {
      await axios.post("http://localhost:8800/api/contact/insertMessage", {
        username,
        message: input
      });

      // Add to local view immediately
      setMessages([...messages, {
        username,
        message: input,
        ownership: "user"
      }]);
      setInput("");
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };
  // Poll for new messages every 2 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/contact/chatHistory", {
          params: { username }
        });
        setMessages(res.data);
      } catch (err) {
        console.error("Polling error:", err);
      }
    }, 2000); // Every 2 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [username]);


  return (
    <div className="chat-page">
      <div className="chat-header">
        <h2>Chat with Us</h2>
        <button className="disconnect-btn" onClick={() => navigate("/")}>
          Disconnect
        </button>
      </div>

      <div className="chat-body">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`chat-bubble ${msg.ownership === "user" ? "user" : "admin"}`}
            onClick={() => setShowTimestampIndex(showTimestampIndex === i ? null : i)}
          >
            <div>{msg.message}</div>
            {showTimestampIndex === i && msg["date created"] && (
              <div className="timestamp">
                {new Date(msg["date created"]).toLocaleString()}
              </div>
            )}
          </div>
        ))}
        <div ref={chatRef} />
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatPage;
