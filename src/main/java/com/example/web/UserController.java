package com.example.web;

import com.example.domain.User;
import com.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionStage;

/**
 * Created by johnlim on 17/3/17.
 */
@RestController
class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping(value="/user",method = RequestMethod.POST)
    public CompletionStage<String> addUser( @RequestBody User user) {
        return userService.addUser(user)
                .thenApply(v ->
                    "User data saved"
                );
    }

    @RequestMapping(value="/user",method = RequestMethod.GET)
    public CompletionStage<List<User>> searchUser(@RequestParam("query") String text) {
        return userService.searchUser(text);
    }


}
