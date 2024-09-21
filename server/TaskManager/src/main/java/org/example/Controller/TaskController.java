package org.example.Controller;

import org.example.Model.Task;
import org.example.Repository.TaskRepository;
import io.javalin.http.Context;
import java.util.*;

public class TaskController {
    private TaskRepository taskRepository = new TaskRepository();

    // Create a new task
    public void createTask(Context ctx) {
        Task task = ctx.bodyAsClass(Task.class);  // Get task details from request body
        Task createdTask = taskRepository.createTask(task.getTaskname(), task.getDate());

        if (createdTask != null) {
            ctx.status(201).json(createdTask);  // Return the created task
        } else {
            ctx.status(400).json("Error creating task");
        }
    }

    // Get all tasks
    public void getAllTasks(Context ctx) {
        List<Task> tasks = taskRepository.getAllTasks();
        ctx.json(tasks);  // Return the list of tasks
    }

    // Get a task by ID
    public void getTaskById(Context ctx) {
        int taskId = Integer.parseInt(ctx.pathParam("id"));
        Optional<Task> task = taskRepository.getTaskById(taskId);

        if (task.isPresent()) {
            ctx.status(200).json(task.get());
        } else {
            ctx.status(404).json("Task not found");
        }
    }

    // Update a task
    public void updateTask(Context ctx) {
        int taskId = Integer.parseInt(ctx.pathParam("id"));
        Task task = ctx.bodyAsClass(Task.class);

        boolean success = taskRepository.updateTask(taskId, task.getTaskname(), task.getDate());

        if (success) {
            ctx.status(200).json("Task updated successfully");
        } else {
            ctx.status(400).json("Error updating task");
        }
    }

    // Delete a task
    public void deleteTask(Context ctx) {
        int taskId = Integer.parseInt(ctx.pathParam("id"));
        boolean success = taskRepository.deleteTask(taskId);

        if (success) {
            ctx.status(204);  // No content
        } else {
            ctx.status(400).json("Error deleting task");
        }
    }
}
