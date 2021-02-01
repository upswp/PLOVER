package com.plover.model.metoring;

import com.plover.model.user.UserDto;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.sql.Date;
import java.sql.Time;

/**
 * @author Park Sangwoo
 */
@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name="mentoring")
public class Mentoring {

    @Id
    @GeneratedValue
    private Long no;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserDto user;

    private int type;

    private String title;

    private Date startDate;

    private Time startTime;

    private Date endDate;

    private Time endTime;

    private String content;

    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date createDate;

    @Temporal(TemporalType.TIMESTAMP)
    @UpdateTimestamp
    private Date updateDate;

    public Mentoring(int type, String title, Date startDate,
                     Time startTime, Date endDate, Time endTime, String content) {
        this.type = type;
        this.title = title;
        this.startDate = startDate;
        this.startTime = startTime;
        this.endDate = endDate;
        this.endTime = endTime;
        this.content = content;
    }

    public void update(int type, String title, Date startDate,
                       Time startTime, Date endDate, Time endTime, String content){
        this.type = type;
        this.title = title;
        this.startDate = startDate;
        this.startTime = startTime;
        this.endDate = endDate;
        this.endTime = endTime;
        this.content = content;
    }

    public void setUser(UserDto user) {
        this.user = user;
    }
}
