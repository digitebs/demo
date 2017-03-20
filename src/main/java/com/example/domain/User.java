package com.example.domain;

import lombok.Data;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

/**
 * Created by johnlim on 17/3/17.
 *
 * Using this class as model and dto
 */
@Entity
@Data
public class User {

    public enum Type{
        ADMIN,NORMAL;
    }

    @Id
    @GeneratedValue
    private Long id;

    @Column
    private String firstName;

    @Column
    private String lastName;

    @Column
    private String emailAddress;

    @Column
    private String bioData;

    @Column
    private String jobDescription;

    @Column
    private Integer accessCode;

    @Column
    @Enumerated(EnumType.STRING)
    private Type type;

    @Column
    @Temporal(TemporalType.DATE)
    private Date birthDate;

}
