package org.example.Controller;

import io.javalin.http.Context;
import org.example.Model.User;
import org.example.Repository.UserRepository;


import java.util.Optional;

public class UserController {
    private UserRepository userRepository = new UserRepository();

    // Register a new user
    public void registerUser(Context ctx) {
        User user = ctx.bodyAsClass(User.class);  // Get user details from request body
        boolean success = userRepository.registerUser(user.getLastname(),
                                                        user.getFirstname(),
                                                        user.getUsername(),
                                                        user.getPassword());

        if (success) {
            ctx.status(201).json("User registered successfully");
        } else {
            ctx.status(400).json("Error registering user");
        }
    }

    // Login user
    public void loginUser(Context ctx) {
        User user = ctx.bodyAsClass(User.class);  // Get login details from request body
        Optional<User> loggedInUser = userRepository.loginUser(user.getUsername(), user.getPassword());

        if (loggedInUser.isPresent()) {
            ctx.status(200).json(loggedInUser.get());
        } else {
            ctx.status(401).json("Invalid username or password");
        }
    }

    // Get user by ID
    public void getUserById(Context ctx) {
        int userId = Integer.parseInt(ctx.pathParam("id"));  // Get ID from path parameter
        Optional<User> user = userRepository.findById(userId);

        if (user.isPresent()) {
            ctx.status(200).json(user.get());
        } else {
            ctx.status(404).json("User not found");
        }
    }
}
