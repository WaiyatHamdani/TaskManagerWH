package org.example.Repository;

import org.example.Model.Task;

import java.sql.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

public class TaskRepository {
    private static final String DB_URL = "jdbc:sqlite:D:/document_D_Drive/WaiyatReactApp/TaskManagerWH/server/TaskWaiyat.db";

    // Create a new task
    public Task createTask(String taskName, Date date) {
        String sql = "INSERT INTO tasks (Taskname, date) VALUES (?, ?)";
        try (Connection conn = DriverManager.getConnection(DB_URL);
             PreparedStatement pstmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

            pstmt.setString(1, taskName);
            pstmt.setDate(2, new java.sql.Date(date.getTime()));
            int affectedRows = pstmt.executeUpdate();

            if (affectedRows > 0) {
                try (ResultSet generatedKeys = pstmt.getGeneratedKeys()) {
                    if (generatedKeys.next()) {
                        int taskId = generatedKeys.getInt(1);
                        return new Task(taskId, taskName, date);
                    }
                }
            }
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        return null;
    }

    // Get all tasks
    public List<Task> getAllTasks() {
        String sql = "SELECT * FROM tasks";
        List<Task> tasks = new ArrayList<>();

        try (Connection conn = DriverManager.getConnection(DB_URL);
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {

            while (rs.next()) {
                Task task = new Task(
                        rs.getInt("id"),
                        rs.getString("Taskname"),
                        rs.getDate("date")
                );
                tasks.add(task);
            }
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }

        return tasks;
    }

    // Get a task by ID
    public Optional<Task> getTaskById(int id) {
        String sql = "SELECT * FROM tasks WHERE id = ?";

        try (Connection conn = DriverManager.getConnection(DB_URL);
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setInt(1, id);
            ResultSet rs = pstmt.executeQuery();

            if (rs.next()) {
                Task task = new Task(
                        rs.getInt("id"),
                        rs.getString("Taskname"),
                        rs.getDate("date")
                );
                return Optional.of(task);
            }
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }

        return Optional.empty();
    }

    // Update a task
    public boolean updateTask(int id, String taskName, Date date) {
        String sql = "UPDATE tasks SET Taskname = ?, date = ? WHERE id = ?";

        try (Connection conn = DriverManager.getConnection(DB_URL);
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setString(1, taskName);
            pstmt.setDate(2, new java.sql.Date(date.getTime()));
            pstmt.setInt(3, id);

            int affectedRows = pstmt.executeUpdate();
            return affectedRows > 0;

        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }

        return false;
    }

    // Delete a task
    public boolean deleteTask(int id) {
        String sql = "DELETE FROM tasks WHERE id = ?";
        try (Connection conn = DriverManager.getConnection(DB_URL);
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            pstmt.setInt(1, id);
            int affectedRows = pstmt.executeUpdate();
            return affectedRows > 0;

        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        return false;
    }
}
