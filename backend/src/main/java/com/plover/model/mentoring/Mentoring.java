package com.plover.model.mentoring;

import com.plover.model.user.Users;
import io.swagger.annotations.ApiModel;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * @author Park Sangwoo
 */
@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ApiModel(description = "멘토링 Entity")
@Table(name = "mentoring")
public class Mentoring {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_no")
    private Users user;

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
    @Lob
    private String content;

    @Column(columnDefinition = "varchar(255) default 'images/mentoring/default-image.png'")
    private String mentoringImageUrl;

    //현재인원
    private Integer currentPersonnel;

    //전체인원
    private Integer maxPersonnel;

    //만남 장소
    private String place;

    //라이브 주소
    private String address;

    //라이브 상태
    private String state;

    @Temporal(TemporalType.DATE)
    @CreationTimestamp
    private Date createDate;

    @Temporal(TemporalType.DATE)
    @UpdateTimestamp
    private Date updateDate;

    @OneToMany(mappedBy = "mentoring", cascade = CascadeType.ALL)
    private List<Comment> commentList = new ArrayList<>();

    public void setUser(Users user) {
        this.user = user;
    }

    @Builder
    public Mentoring(String type, String title, String startDate, String startTime, String endDate,
                     String endTime, String content, String mentoringImageUrl, Integer currentPersonnel,
                     Integer maxPersonnel, String place, String address, String state) {
        this.type = type;
        this.title = title;
        this.startDate = startDate;
        this.startTime = startTime;
        this.endDate = endDate;
        this.endTime = endTime;
        this.content = content;
        this.mentoringImageUrl = mentoringImageUrl;
        this.currentPersonnel = currentPersonnel;
        this.maxPersonnel = maxPersonnel;
        this.place = place;
        this.address = address;
        this.state = state;
    }

    public Mentoring update(Mentoring mentoring) {
        this.type = mentoring.type;
        this.title = mentoring.title;
        this.startDate = mentoring.startDate;
        this.startTime = mentoring.startTime;
        this.endDate = mentoring.endDate;
        this.endTime = mentoring.endTime;
        this.content = mentoring.content;
        this.mentoringImageUrl = mentoring.mentoringImageUrl;
        this.currentPersonnel = mentoring.currentPersonnel;
        this.maxPersonnel = mentoring.maxPersonnel;
        this.place = mentoring.place;
        this.address = mentoring.address;
        this.state = mentoring.address;

        return this;
    }
}
