package com.drivexport.backenddrivexport.controller;

import com.drivexport.backenddrivexport.BodyRequestClasses;
import com.drivexport.backenddrivexport.exception.ResourceNotFoundException;
import com.drivexport.backenddrivexport.model.User;
import com.drivexport.backenddrivexport.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService){
        super();
        this.userService = userService;
    }

    //* Create a new User?
    @PostMapping()
    public ResponseEntity<User> saveUser(@RequestBody User user){
        return new ResponseEntity<>(userService.saveUser(user), HttpStatus.CREATED);
    }

    //* Get all data
    @GetMapping
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }

    //? Get by email password
    @PostMapping("/login")
    public ResponseEntity<User> getSingleUserByEmailPasword(@RequestBody BodyRequestClasses loginBodyRequest ){
        String email = loginBodyRequest.getEmail();
        String password = loginBodyRequest.getPassword();
        User userData = userService.getSingleUserByEmailPasword(email, password);
        if(userData != null){
            return ResponseEntity.ok(userData);
        }else {
            throw new ResourceNotFoundException("User", "user", email);
//            return ResponseEntity.notFound().build();
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
