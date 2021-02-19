package com.plover.model.notification;

import com.plover.model.user.Users;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Date;

@Entity
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name="notification")
public class Notification {
    @Id
    @GeneratedValue
    private Long no;

    //누가 보냈냐 => user no
    @ManyToOne
    @JoinColumn(name = "from_user_no")
    private Users fromUser;

    //누가 받냐 => user no
    @ManyToOne
    @JoinColumn(name = "to_user_no")
    private Users toUser;

    @NotBlank
    private String title;
    @NotBlank
    private String message;
    @NotBlank
    private String url;
    private int status;
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date createDate;

    public Notification(@NotBlank String title, @NotBlank String message, @NotBlank String url, int status) {
        this.title = title;
        this.message = message;
        this.url = url;
        this.status = status;
    }

    public void setFromUser(Users user){
        this.fromUser = user;
    }

    public void setToUser(Users user){
        this.toUser = user;
    }
}
