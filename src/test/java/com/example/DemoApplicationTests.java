package com.example;

import com.example.domain.User;
import com.example.service.UserService;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@RunWith(SpringRunner.class)
@SpringBootTest
public class DemoApplicationTests {

    @Autowired
    UserService userService;

    @Test
    public void addAndGetUser() throws Exception {
        User user = new User();
        user.setFirstName("jOhn");
        user.setLastName("lim");
        user.setBioData("iron man");
        user.setJobDescription("killing machine");
        CompletableFuture future1 = userService.addUser(user);

        user = new User();
        user.setFirstName("gaBriele");
        user.setLastName("anders");
        user.setBioData("war machine");
        user.setJobDescription("war time");
        CompletableFuture future2 = userService.addUser(user);
        
        CompletableFuture.allOf(future1, future2).join();

        List<User> users = userService.searchUser("jo").get();
        Assert.assertEquals(1, users.size());

        users = userService.searchUser("oN").get();
        Assert.assertEquals(1, users.size());

        users = userService.searchUser("ine").get();
        Assert.assertEquals(2, users.size());

        users = userService.searchUser("ZO").get();
        Assert.assertEquals(0, users.size());

        users = userService.searchUser("anders").get();
        Assert.assertEquals(1, users.size());
    }

}
