package com.plover.model.metoring;

import com.plover.model.user.UserDto;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Time;
import java.time.LocalDateTime;

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

    @Column(nullable = false)
    private int type;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private Date startDate;

    @Column(nullable = false)
    private Time startTime;

    @Column(nullable = false)
    private Date endDate;

    @Column(nullable = false)
    private Time endTime;

    @Column(nullable = false)
    private String content;

    @Column
    private Long fileId;

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdDate;

    @LastModifiedDate
    private LocalDateTime updateDate;

    @Builder
    public Mentoring(Long no, int type, String title, Date startDate, Time startTime, Date endDate, Time endTime, String content, Long fileId) {
        this.no = no;
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
