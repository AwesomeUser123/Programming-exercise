package org.example.admin_app

import java.util.concurrent.Executors
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import com.google.gson.annotations.SerializedName
import javafx.application.Platform
import javafx.collections.FXCollections
import javafx.event.ActionEvent
import javafx.fxml.FXML
import javafx.fxml.FXMLLoader
import javafx.fxml.Initializable
import javafx.geometry.Insets
import javafx.geometry.Pos
import javafx.scene.Node
import javafx.scene.Parent
import javafx.scene.Scene
import javafx.scene.control.*
import javafx.scene.layout.HBox
import javafx.scene.layout.VBox
import javafx.stage.Stage
import kotlinx.coroutines.*
import java.net.HttpURLConnection
import java.net.URL
import java.io.OutputStreamWriter
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import java.time.OffsetDateTime
import java.time.ZoneOffset
import org.json.JSONArray
import java.util.concurrent.TimeUnit


import java.util.*

data class Message(
    @JvmField val ownership: String,
    @JvmField val message: String,
    @SerializedName("date created") @JvmField val dateCreated: String,
    @JvmField val username: String
)

class ChatDisplayController : Initializable {

    @FXML private lateinit var userListView: ListView<String>
    @FXML private lateinit var chatListView: ListView<Message>
    @FXML private lateinit var replyField: TextField
    @FXML private lateinit var searchField: TextField
    @FXML private lateinit var usernameLabel: Label
    @FXML private lateinit var notificationButton: Button



    private val scheduler = Executors.newSingleThreadScheduledExecutor()
    private val gson = Gson()
    private var selectedUser: String? = null
    private var refreshJob: Job? = null
    private var allUsers: List<String> = emptyList()
    private var currentMessages: List<Message> = emptyList()


    override fun initialize(location: URL?, resources: ResourceBundle?) {
        setupSearch()
        setupChatBubbleRenderer()
        loadUsers()
        startPollingUncheckedUsers()


        userListView.selectionModel.selectedItemProperty().addListener { _, _, newValue ->
            if (newValue != null) {
                selectedUser = newValue
                usernameLabel.text = newValue
                loadChatHistory(newValue)
                startPollingChat(newValue)
                markMessagesChecked(newValue)
            }
        }

    }

    private fun startPollingChat(username: String) {
        refreshJob?.cancel() // Cancel previous polling job if exists

        refreshJob = CoroutineScope(Dispatchers.IO).launch {
            while (isActive) {
                loadChatHistory(username)
                delay(2000) // Poll every 2 seconds
            }
        }
    }


    private fun setupSearch() {
        searchField.textProperty().addListener { _, _, newVal ->
            val filtered = allUsers.filter { it.contains(newVal, ignoreCase = true) }
            userListView.items = FXCollections.observableArrayList(filtered)
        }
    }

    private fun setupChatBubbleRenderer() {
        chatListView.setCellFactory {
            object : ListCell<Message>() {
                private var showingTimestamp = false

                override fun updateItem(item: Message?, empty: Boolean) {
                    super.updateItem(item, empty)
                    if (item == null || empty) {
                        graphic = null
                        text = null
                    } else {
                        val msgLabel = Label(item.message)
                        msgLabel.style = if (item.ownership == "admin")
                            "-fx-background-color: lightblue; -fx-padding: 10; -fx-background-radius: 10;"
                        else
                            "-fx-background-color: lightgreen; -fx-padding: 10; -fx-background-radius: 10;"

                        msgLabel.wrapTextProperty().set(true)
                        msgLabel.maxWidth = 300.0

                        val vbox = VBox()
                        vbox.children.add(msgLabel)

                        setOnMouseClicked {
                            showingTimestamp = !showingTimestamp
                            if (showingTimestamp) {
                                val timestamp = Label("Sent at: ${item.dateCreated}")
                                vbox.children.add(timestamp)
                            } else {
                                if (vbox.children.size > 1) vbox.children.removeAt(1)
                            }
                        }

                        val container = HBox(vbox)
                        container.alignment = if (item.ownership == "admin") Pos.CENTER_RIGHT else Pos.CENTER_LEFT
                        container.padding = Insets(5.0)

                        graphic = container
                        text = null
                    }
                }
            }
        }
    }

    private fun loadUsers() {
        CoroutineScope(Dispatchers.IO).launch {
            try {
                val response = URL("http://localhost:8800/api/contact/users").readText()
                val type = object : TypeToken<List<Map<String, String>>>() {}.type
                val rawUsers = gson.fromJson<List<Map<String, String>>>(response, type)
                allUsers = rawUsers.mapNotNull { it["username"]?.trim() }

                Platform.runLater {
                    userListView.items = FXCollections.observableArrayList(allUsers)
                }
            } catch (e: Exception) {
                e.printStackTrace()
            }
        }
    }

    private fun loadChatHistory(username: String) {
        CoroutineScope(Dispatchers.IO).launch {
            try {
                val url = URL("http://localhost:8800/api/contact/chatHistory?username=$username")
                val response = url.readText()

                // Safe parse: empty list fallback
                val messages: List<Message> = gson.fromJson(response, object : TypeToken<List<Message>>() {}.type) ?: emptyList()

                val sortedMessages = messages.sortedBy { OffsetDateTime.parse(it.dateCreated) }

                // Only update UI if messages have changed
                if (sortedMessages != currentMessages) {
                    currentMessages = sortedMessages

                    Platform.runLater {
                        chatListView.items = FXCollections.observableArrayList(sortedMessages)

                        // Scroll only if messages are available
                        if (sortedMessages.isNotEmpty()) {
                            chatListView.scrollTo(sortedMessages.size - 1)
                        } else {
                            // Optional: show a placeholder message in UI
                            println("No chat history for $username")
                        }
                    }
                }
            } catch (e: Exception) {
                e.printStackTrace()
            }
        }
    }



    @FXML
    fun onSendClick() {
        val msg = replyField.text
        if (!msg.isNullOrBlank() && selectedUser != null) {
            CoroutineScope(Dispatchers.IO).launch {
                try {
                    val connection = URL("http://localhost:8800/api/contact/Admin_insertMessage").openConnection() as HttpURLConnection
                    connection.requestMethod = "POST"
                    connection.doOutput = true
                    connection.setRequestProperty("Content-Type", "application/json")

                    val payload = mapOf(
                        "username" to selectedUser!!,
                        "message" to msg
                    )
                    val writer = OutputStreamWriter(connection.outputStream)
                    writer.write(gson.toJson(payload))
                    writer.flush()
                    writer.close()

                    if (connection.responseCode == 200) {
                        loadChatHistory(selectedUser!!)
                        Platform.runLater { replyField.clear() }
                    }
                } catch (e: Exception) {
                    e.printStackTrace()
                }
            }
        }
    }

    @FXML
    fun handleBackClick(event: ActionEvent) {
        val loader = FXMLLoader(javaClass.getResource("/AppGrid.fxml"))
        val root = loader.load<Parent>()
        val stage = (event.source as Node).scene.window as Stage
        stage.scene = Scene(root)
        stage.show()
    }

    fun parseUncheckedUsersFromArray(jsonArray: JSONArray): Set<String> {
        val uncheckedUsers = mutableSetOf<String>()
        for (i in 0 until jsonArray.length()) {
            val userObj = jsonArray.getJSONObject(i)
            val username = userObj.getString("username")
            uncheckedUsers.add(username)
        }
        return uncheckedUsers
    }

    fun startPollingUncheckedUsers() {
        scheduler.scheduleAtFixedRate({
            try {
                val response = URL("http://localhost:8800/api/contact/notify").readText()
                val uncheckedUsers = parseUncheckedUsersFromArray(JSONArray(response))
                Platform.runLater {
                    updateUserListWithNotifications(uncheckedUsers)
                    updateNotificationBell(uncheckedUsers)
                }
            } catch (e: Exception) {
                println("Error polling unchecked users: ${e.message}")
            }
        }, 0, 5, TimeUnit.SECONDS)
    }

    fun updateUserListWithNotifications(uncheckedUsers: Set<String>) {
        val sortedUsers = allUsers.sortedWith(
            compareByDescending<String> { it in uncheckedUsers }.thenBy { it }
        )
        userListView.items.setAll(sortedUsers)

        userListView.setCellFactory {
            object : ListCell<String>() {
                override fun updateItem(item: String?, empty: Boolean) {
                    super.updateItem(item, empty)
                    text = item ?: ""
                    if (item in uncheckedUsers) {
                        style = "-fx-font-weight: bold;"
                    } else {
                        style = ""
                    }
                }
            }
        }
    }
    fun updateNotificationBell(uncheckedUsers: Set<String>) {
        if (uncheckedUsers.isNotEmpty()) {
            notificationButton.text = "🔔 (${uncheckedUsers.size})"
            notificationButton.style = "-fx-text-fill: red;"
        } else {
            notificationButton.text = "🔔"
            notificationButton.style = "-fx-text-fill: black;"
        }
    }

    @FXML
    fun onNotificationClick() {
        CoroutineScope(Dispatchers.IO).launch {
            try {
                val response = URL("http://localhost:8800/api/contact/notify").readText()
                val uncheckedUsers = parseUncheckedUsersFromArray(JSONArray(response))
                Platform.runLater {
                    val alert = Alert(Alert.AlertType.INFORMATION)
                    alert.title = "New Messages"
                    alert.headerText = "Users with unchecked messages:"
                    alert.contentText = if (uncheckedUsers.isEmpty()) "No new messages." else uncheckedUsers.joinToString("\n")
                    alert.showAndWait()
                }
            } catch (e: Exception) {
                e.printStackTrace()
            }
        }
    }
    fun markMessagesChecked(username: String) {
        CoroutineScope(Dispatchers.IO).launch {
            try {
                val connection = URL("http://localhost:8800/api/contact/userCheck").openConnection() as HttpURLConnection
                connection.requestMethod = "POST"
                connection.doOutput = true
                connection.setRequestProperty("Content-Type", "application/json")

                val payload = mapOf("username" to username)
                val writer = OutputStreamWriter(connection.outputStream)
                writer.write(gson.toJson(payload))
                writer.flush()
                writer.close()

                connection.inputStream.close()
            } catch (e: Exception) {
                e.printStackTrace()
            }
        }
    }


}
