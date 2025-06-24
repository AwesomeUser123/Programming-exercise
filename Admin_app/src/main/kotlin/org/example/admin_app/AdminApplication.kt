package org.example.admin_app

import javafx.application.Application
import javafx.fxml.FXMLLoader
import javafx.scene.Parent
import javafx.scene.Scene
import javafx.stage.Stage

class AdminApplication : Application() {
    override fun start(primaryStage: Stage) {
        val root = FXMLLoader.load<Parent>(javaClass.getResource("/AppGrid.fxml"))
        primaryStage.scene = Scene(root)
        primaryStage.title = "Admin Dashboard"
        primaryStage.show()
    }

}
