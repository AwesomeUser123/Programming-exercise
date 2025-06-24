package org.example.admin_app

import javafx.event.EventHandler
import javafx.fxml.FXML
import javafx.fxml.FXMLLoader
import javafx.scene.control.Label
import javafx.scene.image.Image
import javafx.scene.image.ImageView
import javafx.scene.input.MouseEvent
import javafx.scene.layout.GridPane
import javafx.scene.layout.VBox
import javafx.geometry.Pos
import javafx.scene.Node
import javafx.scene.Parent
import javafx.scene.Scene
import javafx.stage.Stage

class AppGridController {

    @FXML
    private lateinit var appGrid: GridPane

    data class AppFeature(
        val name: String,
        val iconPath: String,
        val onClick: (MouseEvent) -> Unit
    )

    @FXML
    fun initialize() {
        val features = listOf(
            AppFeature("Chat", "/icons/chat_icon.png", ::openChat),
        AppFeature("Settings", "/icons/settings_icon.png", ::openSettings),
        AppFeature("Events","/icons/event_icon.png",::openEvents)


        // You can easily add more like:
            // AppFeature("Reservations", "/reservation_icon.png", ::openReservations)
        )

        val columns = 4
        var col = 0
        var row = 0

        for (feature in features) {
            val vbox = VBox(10.0)
            vbox.alignment = Pos.CENTER
            vbox.style = "-fx-background-color: rgba(255, 255, 255, 0.7); -fx-padding: 20; -fx-background-radius: 15;"
            vbox.onMouseClicked = EventHandler { event -> feature.onClick(event) }


            val imageView = ImageView(Image(javaClass.getResourceAsStream(feature.iconPath)))
            imageView.fitHeight = 64.0
            imageView.fitWidth = 64.0

            val label = Label(feature.name)
            label.style = "-fx-font-size: 14px; -fx-font-weight: bold;"

            vbox.children.addAll(imageView, label)

            appGrid.add(vbox, col, row)

            col++
            if (col >= columns) {
                col = 0
                row++
            }
        }
    }

    private fun openChat(event: MouseEvent) {
        openView("/views/ChatDisplay.fxml", event)
    }

    private fun openSettings(event: MouseEvent) {
        openView("/views/SettingsView.fxml", event)
    }
    private fun openEvents(event: MouseEvent)   {
        openView("/views/EventsView.fxml", event)
    }

    private fun openView(fxmlFile: String, event: MouseEvent) {
        val loader = FXMLLoader(javaClass.getResource(fxmlFile))
        val root = loader.load<Parent>()
        val stage = (event.source as Node).scene.window as Stage
        stage.scene = Scene(root)

    }
}
