package com.plover.model.metoring;

import com.plover.model.metoring.common.BaseTimeEntity;
import com.plover.model.user.UserDto;
import io.swagger.annotations.ApiModel;
import lombok.*;

import javax.persistence.*;

/**
 * @author Park Sangwoo
 */
@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ApiModel(description = "멘토링 Entity")
@Table(name="mentoring")
public class MentoringEntity extends BaseTimeEntity {
    @Id
    @GeneratedValue
    private Long id;

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

    public void setUser(UserDto user){this.user = user;}

    @Builder
    public MentoringEntity(String type, String title, String startDate, String startTime, String endDate, String endTime, String content, Integer currentPersonnel,
                           Integer maxPersonnel, String place, String address, String state) {
        this.type = type;
        this.title = title;
        this.startDate = startDate;
        this.startTime = startTime;
        this.endDate = endDate;
        this.endTime = endTime;
        this.content = content;
        this.currentPersonnel = currentPersonnel;
        this.maxPersonnel = maxPersonnel;
        this.place = place;
        this.address = address;
        this.state = state;
    }

    public MentoringEntity updateChatMentoring(MentoringEntity updateMentoringEntity){
        this.title = updateMentoringEntity.title;
        this.startDate = updateMentoringEntity.startDate;
        this.startTime = updateMentoringEntity.startTime;
        this.endDate = updateMentoringEntity.endDate;
        this.endTime = updateMentoringEntity.endTime;
        this.content = updateMentoringEntity.content;

        return this;
    }

    public MentoringEntity updateLiveMentoring(MentoringEntity updateMentoringEntity){
        this.title = updateMentoringEntity.title;
        this.startDate = updateMentoringEntity.startDate;
        this.startTime = updateMentoringEntity.startTime;
        this.endDate = updateMentoringEntity.endDate;
        this.endTime = updateMentoringEntity.endTime;
        this.content = updateMentoringEntity.content;
        this.address = updateMentoringEntity.content;
        this.state = updateMentoringEntity.state;

        return this;
    }

    public MentoringEntity updateMeetMentoring(MentoringEntity updateMentoringEntity){
        this.title = updateMentoringEntity.title;
        this.startDate = updateMentoringEntity.startDate;
        this.startTime = updateMentoringEntity.startTime;
        this.endDate = updateMentoringEntity.endDate;
        this.endTime = updateMentoringEntity.endTime;
        this.content = updateMentoringEntity.content;
        this.place = updateMentoringEntity.place;
        this.currentPersonnel = updateMentoringEntity.currentPersonnel;
        this.maxPersonnel = updateMentoringEntity.maxPersonnel;

        return this;
    }


}
