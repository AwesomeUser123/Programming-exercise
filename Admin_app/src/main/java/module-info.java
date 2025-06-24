module org.example.admin_app {
    requires javafx.controls;
    requires javafx.fxml;

    requires org.controlsfx.controls;
    requires org.kordamp.bootstrapfx.core;
    requires com.google.gson;
    requires kotlinx.coroutines.core;
    requires org.json;

    opens org.example.admin_app to javafx.fxml;
    exports org.example.admin_app;
}