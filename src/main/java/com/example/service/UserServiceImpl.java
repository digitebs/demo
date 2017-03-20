package com.example.service;

import com.example.domain.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.util.List;

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

    public void addUser(User user){
        /** persist user object*/
        em.persist(user);
        logger.info(user.toString());

    }

    public List<User> searchUser(String query){
        /** persist query object use like with OR*/
        Query q = em.createQuery("Select  u from User u where" +
                " lower(u.firstName) like lower(:firstName) or" +
                " lower(u.lastName) like lower(:lastName) or"+
                " lower(u.bioData) like lower(:bioData) or"+
                " lower(u.jobDescription) like lower(:jobDescription)");

        query="%"+query+"%"; //prepend
        q.setParameter("firstName",query);
        q.setParameter("lastName",query);
        q.setParameter("bioData",query);
        q.setParameter("jobDescription",query);

        return q.getResultList();
    }
}
