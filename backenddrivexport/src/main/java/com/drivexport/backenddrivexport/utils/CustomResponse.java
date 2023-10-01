package com.drivexport.backenddrivexport.utils;

import com.drivexport.backenddrivexport.model.User;

public class CustomResponse {

//    public CustomResponse(User user, String message, Integer status) {
//        this.user = user;
//        this.message = message;
//        this.status = status;
//    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    private User user;
    private String message;
    private Integer status;


}
