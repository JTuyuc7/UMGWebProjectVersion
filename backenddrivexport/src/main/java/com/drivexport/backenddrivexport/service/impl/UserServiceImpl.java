package com.drivexport.backenddrivexport.service.impl;

import com.drivexport.backenddrivexport.exception.ResourceNotFoundException;
import com.drivexport.backenddrivexport.model.User;
import com.drivexport.backenddrivexport.repository.UserRepository;
import com.drivexport.backenddrivexport.service.UserService;
import com.drivexport.backenddrivexport.utils.CustomResponse;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        super();
        this.userRepository = userRepository;
    }

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public CustomResponse getSingleUserByEmailPasword(String email, String password) {
        Optional<User> singleUserfound = Optional.ofNullable(userRepository.findByEmailAndPassword(email, password));
        CustomResponse response = new CustomResponse();
        System.out.println(singleUserfound);
        if(singleUserfound.isPresent()){
            response.setMessage("User found");
            response.setStatus(200);
            response.setUser(singleUserfound.get());
        }else {
            response.setMessage("Please check your credentials.");
            response.setStatus(400);

        }

        return response;
    }

    @Override
    public boolean findSinleUserByEmailService(String email) {
        Optional<User> userfound = Optional.ofNullable(userRepository.findExisitingUserByEmail(email));

        return userfound.isPresent();
    }


    //! Apply the same logic to find it by email and password
    @Override
    public User getSingleUser(Integer id) {
        Optional<User> singleUser = userRepository.findById(id);

        if(singleUser.isPresent()){
            return singleUser.get();
        }else {
            throw new ResourceNotFoundException("User", "Id", id);
        }
    }

    @Override
    public User updateUser(User user, Integer id) {

        //? Check the user exist with the ID
        User existingUser = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User", "user", id) );

        existingUser.setLast_name( user.getLast_name());
        userRepository.save(existingUser);
        return existingUser;
    }

    @Override
    public void deleteUser(Integer id) {
        // Validate a suer exists
        userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User", "user", id) );

        userRepository.deleteById(id);
    }

}
