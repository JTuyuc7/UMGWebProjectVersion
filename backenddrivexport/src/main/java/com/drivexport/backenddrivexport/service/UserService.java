package com.drivexport.backenddrivexport.service;

import com.drivexport.backenddrivexport.model.User;
import com.drivexport.backenddrivexport.utils.CustomResponse;

import java.util.List;

public interface UserService {
    //* Create a new User
    User saveUser(User user);

    //* Todos los usuarios
    List<User> getAllUsers();

    //? Get a single User to Login
    CustomResponse getSingleUserByEmailPasword(String email, String password );

    //? Find single user by email
    boolean findSinleUserByEmailService(String email);

    //!Temporal
    User getSingleUser(Integer id);

    //? Update
    User updateUser( User user, Integer id);

    void deleteUser(Integer id);
}
