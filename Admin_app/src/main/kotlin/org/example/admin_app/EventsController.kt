package org.example.admin_app

import javafx.application.Platform
import javafx.event.ActionEvent
import javafx.fxml.FXML
import javafx.fxml.FXMLLoader
import javafx.scene.Node
import javafx.scene.Parent
import javafx.scene.Scene
import javafx.scene.control.*
import javafx.scene.image.Image
import javafx.scene.image.ImageView
import javafx.scene.control.cell.PropertyValueFactory
import javafx.stage.Stage
import org.json.JSONArray
import org.json.JSONObject
import java.io.IOException
import java.net.HttpURLConnection
import java.net.URL
import java.text.SimpleDateFormat

import java.time.Instant
import java.time.LocalDateTime
import java.time.ZoneId
import java.time.format.DateTimeFormatter

class EventsController {
    private var selectedEventName: String? = null
    @FXML private lateinit var eventTable: TableView<Event>
    @FXML private lateinit var colName: TableColumn<Event, String>
    @FXML private lateinit var colStart: TableColumn<Event, String>
    @FXML private lateinit var colEnd: TableColumn<Event, String>
    @FXML private lateinit var colImage: TableColumn<Event, String>
    @FXML private lateinit var colDescription: TableColumn<Event, String>

    @FXML private lateinit var nameField: TextField
    @FXML private lateinit var startField: TextField
    @FXML private lateinit var endField: TextField
    @FXML private lateinit var imageField: TextField
    @FXML private lateinit var descField: TextField
    @FXML private lateinit var previewImage: ImageView

    private val dateFormat = SimpleDateFormat("yyyy-MM-dd HH:mm:ss").apply {
        isLenient = false
    }

    @FXML
    fun initialize() {
        colName.cellValueFactory = PropertyValueFactory("name")
        colStart.cellValueFactory = PropertyValueFactory("dateStart")
        colEnd.cellValueFactory = PropertyValueFactory("dateEnd")
        colImage.cellValueFactory = PropertyValueFactory("imageLink")
        colDescription.cellValueFactory = PropertyValueFactory("description")

        imageField.textProperty().addListener { _, _, newValue ->
            try {
                previewImage.image = Image(newValue, true)
            } catch (_: Exception) {
                previewImage.image = null
            }
        }

        eventTable.selectionModel.selectedItemProperty().addListener { _, _, selected ->
            selected?.let {
                nameField.text = it.name
                startField.text = it.dateStart
                endField.text = it.dateEnd
                imageField.text = it.imageLink
                descField.text = it.description
            }
        }

        loadEvents()
    }

    @FXML
    fun addEvent() {
        if (!validateInputs()) return
        if (!showConfirmation("Add this event?")) return

        val payload = JSONObject().apply {
            put("name", nameField.text)
            put("dateStart", startField.text)
            put("dateEnd", endField.text)
            put("imageLink", imageField.text)
            put("description", descField.text)
        }

        sendPostRequest("http://localhost:8800/api/event/insertEvent", payload)
        loadEvents()
    }

    @FXML
    fun modifyEvent() {
        val selected = eventTable.selectionModel.selectedItem ?: run {
            showAlert("No event selected", Alert.AlertType.WARNING)
            return
        }

        if (!showConfirmation("Modify this event?")) return

        val oldName = selectedEventName ?: selected.name

        val payload = JSONObject().apply {
            put("oldName", oldName)
            put("name", if (nameField.text.isNotBlank()) nameField.text else selected.name)
            put("dateStart", if (startField.text.isNotBlank()) startField.text else selected.dateStart)
            put("dateEnd", if (endField.text.isNotBlank()) endField.text else selected.dateEnd)
            put("imageLink", if (imageField.text.isNotBlank()) imageField.text else selected.imageLink)
            put("description", if (descField.text.isNotBlank()) descField.text else selected.description)
        }

        try {
            sendPostRequest("http://localhost:8800/api/event/modifyEvent", payload)
            showAlert("Event modified successfully", Alert.AlertType.INFORMATION)
            loadEvents()
            selectedEventName = null // Reset
        } catch (e: Exception) {
            showAlert("Failed to modify event:\n${e.message}", Alert.AlertType.ERROR)
        }
    }



    @FXML
    fun deleteEvent() {
        val selected = eventTable.selectionModel.selectedItem ?: run {
            showAlert("No event selected", Alert.AlertType.WARNING)
            return
        }

        if (!showConfirmation("Delete event '${selected.name}'?")) return

        val payload = JSONObject().apply {
            put("name", selected.name)
        }

        sendPostRequest("http://localhost:8800/api/event/deleteEvent", payload)
        loadEvents()
    }

    @FXML
    fun loadEvents() {
        eventTable.setOnMouseClicked {
            val selected = eventTable.selectionModel.selectedItem
            if (selected != null) {
                // Save the original name for later comparison
                selectedEventName = selected.name

                // Optionally load data into the input fields
                nameField.text = selected.name
                startField.text = selected.dateStart
                endField.text = selected.dateEnd
                imageField.text = selected.imageLink
                descField.text = selected.description
            }
        }

        val url = URL("http://localhost:8800/api/event/viewEvent")
        val connection = url.openConnection() as HttpURLConnection
        connection.requestMethod = "GET"

        val response = connection.inputStream.bufferedReader().readText()
        val events = JSONArray(response)

        val formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")

        Platform.runLater {
            eventTable.items.clear()
            for (i in 0 until events.length()) {
                val obj = events.getJSONObject(i)

                val dateStartIso = obj.getString("date of occurence")
                val dateEndIso = obj.getString("date of ending")

                val dateStartFormatted = Instant.parse(dateStartIso)
                    .atZone(ZoneId.systemDefault())
                    .toLocalDateTime()
                    .format(formatter)

                val dateEndFormatted = Instant.parse(dateEndIso)
                    .atZone(ZoneId.systemDefault())
                    .toLocalDateTime()
                    .format(formatter)

                eventTable.items.add(
                    Event(
                        obj.getString("name"),
                        dateStartFormatted,
                        dateEndFormatted,
                        obj.getString("image link"),
                        obj.getString("description")
                    )
                )
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

    private fun sendPostRequest(urlStr: String, json: JSONObject) {
        val url = URL(urlStr)
        with(url.openConnection() as HttpURLConnection) {
            requestMethod = "POST"
            doOutput = true
            setRequestProperty("Content-Type", "application/json")
            outputStream.write(json.toString().toByteArray(Charsets.UTF_8))
            try {
                inputStream.bufferedReader().use { it.readText() }
            } catch (e: IOException) {
                val errorBody = errorStream?.bufferedReader()?.use { it.readText() }
                showAlert("" + errorBody, Alert.AlertType.ERROR)
                throw e
            }
        }
    }


    private fun validateInputs(): Boolean {
        if (nameField.text.isBlank()) {
            showAlert("Event name is required", Alert.AlertType.WARNING)
            return false
        }
        try {
            dateFormat.parse(startField.text)
            dateFormat.parse(endField.text)
        } catch (e: Exception) {
            showAlert("Invalid date format. Use YYYY-MM-DD HH:MM:SS", Alert.AlertType.ERROR)
            return false
        }
        return true
    }

    private fun showAlert(message: String, type: Alert.AlertType) {
        Platform.runLater {
            Alert(type).apply {
                contentText = message
                showAndWait()
            }
        }
    }

    private fun showConfirmation(message: String): Boolean {
        val alert = Alert(Alert.AlertType.CONFIRMATION)
        alert.contentText = message
        val result = alert.showAndWait()
        return result.isPresent && result.get() == ButtonType.OK
    }
}

data class Event(
    val name: String,
    val dateStart: String,
    val dateEnd: String,
    val imageLink: String,
    val description: String
)
