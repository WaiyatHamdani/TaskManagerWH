package org.example.Model;

import java.util.Date;

public class Task {
    private int id;
    private String Taskname;
    private Date date;
    public Task() {}
    public Task(int id, String taskname, Date date) {
        this.id = id;
        Taskname = taskname;
        this.date = date;
    }
    public int getId() {return id;}
    public void setId(int id) {this.id = id;}
    public String getTaskname() {return Taskname;}
    public void setTaskname(String taskname) {Taskname = taskname;}
    public Date getDate() {return date;}
    public void setDate(Date date) {this.date = date;}
}
