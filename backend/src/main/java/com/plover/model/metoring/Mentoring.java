package com.plover.model.metoring;

import com.plover.model.user.UserDto;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;

import java.util.Date;

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
    @JoinColumn(name = "user_no")
    private UserDto user;

    @Column(nullable = false)
    private String type;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String startDate;

    @Column(nullable = false)
    private String startTime;

    @Column(nullable = false)
    private String endDate;

    @Column(nullable = false)
    private String endTime;

    @Column(nullable = false)
    private String content;

    @Column
    private Long fileId;

    @Temporal(TemporalType.DATE)
    @CreationTimestamp
    private Date createDate;

    @Temporal(TemporalType.DATE)
    @UpdateTimestamp
    private Date updateDate;

    @Builder
    public Mentoring(String type, String title, String startDate, String startTime, String endDate, String endTime, String content, Long fileId) {
        this.type = type;
        this.title = title;
        this.startDate = startDate;
        this.startTime = startTime;
        this.endDate = endDate;
        this.endTime = endTime;
        this.content = content;
        this.fileId = fileId;
    }




    public void setUser(UserDto user){this.user = user;}
}
