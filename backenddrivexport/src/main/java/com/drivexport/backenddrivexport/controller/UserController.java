package com.drivexport.backenddrivexport.controller;

import com.drivexport.backenddrivexport.BodyRequestClasses;
import com.drivexport.backenddrivexport.model.User;
import com.drivexport.backenddrivexport.service.UserService;
import com.drivexport.backenddrivexport.utils.CustomResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService){
        super();
        this.userService = userService;
    }

    //* Create a new User?
    @PostMapping()
    public CustomResponse saveUser(@RequestBody User user){
        CustomResponse response = new CustomResponse();
        if( userService.findSinleUserByEmailService(user.getEmail())){
            response.setMessage("Please use a different email");
            response.setStatus(422);
        }else {
            response.setStatus(201);
            User savedUser = userService.saveUser(user);
            response.setUser(savedUser);
        }

        return response;
    }

    //* Get all data
    @GetMapping
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }

    //? Get by email password
    @PostMapping("/login")
    public ResponseEntity<CustomResponse> getSingleUserByEmailPasword(@RequestBody BodyRequestClasses loginBodyRequest ){
        String email = loginBodyRequest.getEmail();
        String password = loginBodyRequest.getPassword();
//        User userData = userService.getSingleUserByEmailPasword(email, password);
        CustomResponse userFoundData = userService.getSingleUserByEmailPasword(email, password);
        if(userFoundData != null){
            return ResponseEntity.ok(userFoundData);
        }else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(userFoundData);
        }
    }

    //? Get user by ID
    @GetMapping("{id}")
//    @GetMapping
    public ResponseEntity<User> getSingleUserController(@PathVariable("id") Integer id){
        return new ResponseEntity<>(userService.getSingleUser(id), HttpStatus.OK);
    }

    //? Update an user
    @PutMapping("{id}")
    public ResponseEntity<User> updateUser(@PathVariable("id") Integer id, @RequestBody User user ){
        return new ResponseEntity<>(userService.updateUser(user, id), HttpStatus.OK);
    }

    //? Delete an user
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") Integer id){
        //? Delete user
        userService.deleteUser(id);

        return new ResponseEntity<>("User deleted correctly", HttpStatus.OK);
    }
}
