package org.example.Model;

public class User {
    private int user_id;
    private String firstname;
    private String lastname;
    public User() {}

    public User(int user_id, String firstname, String lastname) {
        this.user_id = user_id;
        this.firstname = firstname;
        this.lastname = lastname;
    }

    public int getUser_id() {return user_id;}
    public void setUser_id(int user_id) {this.user_id = user_id;}
    public String getFirstname() {return firstname;}
    public void setFirstname(String firstname) {this.firstname = firstname;}
    public String getLastname() {return lastname;}
    public void setLastname(String lastname) {this.lastname = lastname;}
}
