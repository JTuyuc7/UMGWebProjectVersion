package com.drivexport.backenddrivexport.service;

import com.drivexport.backenddrivexport.model.User;

import java.util.List;

public interface UserService {
    //* Create a new User
    User saveUser(User user);

    //* Todos los usuarios
    List<User> getAllUsers();

    //? Get a single User to Login
    User getSingleUserByEmailPasword(String email, String password );

    //!Temporal
    User getSingleUser(Integer id);

    //? Update
    User updateUser( User user, Integer id);

    void deleteUser(Integer id);
}
