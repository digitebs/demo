package com.example.service;

import com.example.domain.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.util.List;
import java.util.concurrent.CompletableFuture;

/**
 * Created by johnlim on 17/3/17.
 *
 * using the service as repository/dao layer
 */
@Service
@Transactional
public class UserServiceImpl implements  UserService{

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @PersistenceContext
    EntityManager em;


    @Async
    public CompletableFuture<Void> addUser(User user) {
        /** persist user object*/
        logger.info(user.toString());
        em.persist(user);
        return  CompletableFuture.completedFuture(null);
    }


    @Async
    public CompletableFuture<List<User>> searchUser(String query){
        /** persist query object use like with OR*/
            Query q = em.createQuery("Select  u from User u where" +
                    " lower(u.firstName) like lower(:firstName) or" +
                    " lower(u.lastName) like lower(:lastName) or" +
                    " lower(u.bioData) like lower(:bioData) or" +
                    " lower(u.jobDescription) like lower(:jobDescription)");

            String str = "%" + query + "%"; //prepend
            q.setParameter("firstName", str);
            q.setParameter("lastName", str);
            q.setParameter("bioData", str);
            q.setParameter("jobDescription", str);

            List<User> result =  q.getResultList();

        return  CompletableFuture.completedFuture(result);
    }
}
