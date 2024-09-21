package org.example.Repository;



import org.example.Model.User;
import java.sql.*;
import java.util.Optional;

public class UserRepository {
    private static final String DB_URL = "jdbc:sqlite:D:/document_D_Drive/WaiyatReactApp/TaskManagerWH/server/TaskWaiyat.db";

    public boolean registerUser(String firstname, String lastname,String username,String password){
        String query = "INSERT INTO users(firstname,lastname,username, password) VALUES (?,?,?, ?)";
        try(Connection conn = DriverManager.getConnection(DB_URL);
            PreparedStatement pstmt = conn.prepareStatement(query)){
            pstmt.setString(1, firstname);
            pstmt.setString(2, lastname);
            pstmt.setString(3, username);
            pstmt.setString(4, password);
            pstmt.executeUpdate();
            return true;
        }catch (SQLException e){
            System.out.println(e.getMessage());
            return false;
        }
    }

    public Optional<User> loginUser(String username, String password){
        String query = "SELECT * FROM users WHERE username = ? AND password = ?";
        try(Connection conn = DriverManager.getConnection(DB_URL);
            PreparedStatement pstmt = conn.prepareStatement(query)){
            pstmt.setString(1, username);
            pstmt.setString(2, password);
            ResultSet rs = pstmt.executeQuery();

            if(rs.next()){
                User user = new User(rs.getInt("id"),
                                    rs.getString("firstname"),
                                    rs.getString("lastname"),
                                    rs.getString("username"),
                                    rs.getString("password"));
                return Optional.of(user);
            }

        }catch (SQLException e){
            System.out.println(e.getMessage());

        }
        return Optional.empty();
    }


    public Optional<User> findById(int id) {
        String sql = "SELECT * FROM users WHERE id = ?";

        try (Connection conn = DriverManager.getConnection(DB_URL);
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setInt(1, id);
            ResultSet rs = pstmt.executeQuery();

            if (rs.next()) {
                User user = new User(rs.getInt("id"),
                                    rs.getString("firstname"),
                                    rs.getString("lastname"),
                                    rs.getString("username"),
                                    rs.getString("password"));

                return Optional.of(user);
            }
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        return Optional.empty();
    }

}
