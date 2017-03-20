package com.example.web;

import com.example.domain.User;
import com.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

/**
 * Created by johnlim on 17/3/17.
 */
@RestController
class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping(value="/user",method = RequestMethod.POST)
    public String addUser( @RequestBody User user) {
        userService.addUser(user);
        return "User data saved";
    }

    @RequestMapping(value="/user",method = RequestMethod.GET)
    public List<User> searchUser(@RequestParam("query") String text) {
        return userService.searchUser(text);
    }


}
