package org.example.Util;
import io.javalin.Javalin;
import org.example.Controller.TaskController;

public class JavalinUtil {
    public static void startServer() {
        Javalin app = Javalin.create().start(8080);  // Starts the server on port 8080

        // Add CORS support
        app.before(ctx -> {
            ctx.header("Access-Control-Allow-Origin", "*");
            ctx.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            ctx.header("Access-Control-Allow-Headers", "Content-Type");
        });

        app.options("/*", ctx -> {
            ctx.header("Access-Control-Allow-Origin", "*");
            ctx.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            ctx.header("Access-Control-Allow-Headers", "Content-Type");
            ctx.status(204);
        });

        // Add your routes/controllers here
        configureRoutes(app);
    }



    // Mapping routes
    private static void configureRoutes(Javalin app) {
        TaskController taskController = new TaskController();

        // Task Routes all in controller
        // the task mapping path will be here
        app.get("/tasks", taskController::getAllTasks);
        app.get("/tasks/{id}", taskController::getTaskById);
        app.post("/tasks", taskController::createTask);
        app.put("/tasks/{id}", taskController::updateTask);
        app.delete("/tasks/{id}", taskController::deleteTask);
    }
}
