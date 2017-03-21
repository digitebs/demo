package com.example.service;

import com.example.domain.User;

import java.util.List;
import java.util.concurrent.CompletableFuture;

/**
 * Created by johnlim on 17/3/17.
 */
public interface UserService {
    public CompletableFuture<Void> addUser(User user);
    public CompletableFuture<List<User>> searchUser(String user);
}
