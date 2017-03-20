package com.example.service;

import com.example.domain.User;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by johnlim on 17/3/17.
 */
public interface UserService {

    public void addUser(User user);
    public List<User> searchUser(String user);


}
