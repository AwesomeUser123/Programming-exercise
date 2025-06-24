import WebSocket, { WebSocketServer } from 'ws';
import mysql from 'mysql';
import dotenv from 'dotenv';
import { db } from "../connect.js";
dotenv.config();

const PORT = 8080;
const wss = new WebSocketServer({ port: PORT });

console.log(`WebSocket server started on ws://localhost:${PORT}`);

const clients = new Map(); // Map of username -> WebSocket
let adminSocket = null;

wss.on('connection', (ws) => {
  ws.on('message', (data) => {
    const msg = JSON.parse(data);

    const { username, message, ownership } = msg;

    if (ownership === 'admin') {
      // Save admin socket
      adminSocket = ws;
      ws.username = 'admin';
      console.log('[Admin connected]');
    } else {
      // Register user
      clients.set(username, ws);
      ws.username = username;
      console.log(`[User connected: ${username}]`);
    }

    // Save to DB
    db.query(
      "INSERT INTO chat (username, message, date_created, ownership) VALUES (?, ?, NOW(), ?)",
      [username, message, ownership],
      (err) => {
        if (err) console.error('DB Error:', err);
      }
    );

    // Send to counterpart only
    if (ownership === 'user' && adminSocket) {
      adminSocket.send(JSON.stringify({ username, message, ownership, date_created: new Date() }));
    }

    if (ownership === 'admin') {
      const target = msg.targetUser; // Admin must specify who to reply to
      const targetSocket = clients.get(target);
      if (targetSocket) {
        targetSocket.send(JSON.stringify({ username: 'admin', message, ownership, date_created: new Date() }));
      }
    }
  });

  ws.on('close', () => {
    if (ws.username && ws.username !== 'admin') {
      clients.delete(ws.username);
      console.log(`[User disconnected: ${ws.username}]`);
    }
    if (ws === adminSocket) {
      console.log('[Admin disconnected]');
      adminSocket = null;
    }
  });
});
