package com.plover.model.mentoring.request;

import com.plover.model.mentoring.Mentoring;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;

@NoArgsConstructor(access = AccessLevel.PUBLIC)
@Getter
@ApiModel(description = "멘토링 등록 모델")
public class MentoringRequest {
    @ApiModelProperty(value = "멘토링 유형")
    @NotBlank
    private String type;

    @ApiModelProperty(value = "제목")
    @NotBlank
    @Length(max = 50, message = "제목의 최대 길이는 50자 입니다.")
    private String title;

    @ApiModelProperty(value = "내용")
    @NotBlank
    @Length(max = 3000, message = "내용의 최대 길이는 3000자 입니다.")
    private String content;

    @ApiModelProperty(value = "멘토링 시작날짜")
    @NotBlank
    private String startDate;

    @ApiModelProperty(value = "멘토링 시작시간")
    @NotBlank
    private String startTime;

    @ApiModelProperty(value = "멘토링 종료날짜")
    @NotBlank
    private String endDate;

    @ApiModelProperty(value = "멘토링 시작시간")
    @NotBlank
    private String endTime;

    @Column(columnDefinition = "varchar(255) default 'images/mentoring/default-image.png'")
    private String mentoringImageUrl;

    // 라이브
    private String address;
    private String state;

    // 만남
    private Integer currentPersonnel;
    private Integer maxPersonnel;
    private String place;

    public void setMentoringImageUrl(String mentoringImageUrl){
        this.mentoringImageUrl = mentoringImageUrl;
    }

    public Mentoring toMentoring(){
        return Mentoring.builder()
                .type(type)
                .title(title)
                .content(content)
                .startDate(startDate)
                .startTime(startTime)
                .endDate(endDate)
                .endTime(endTime)
                .mentoringImageUrl(mentoringImageUrl)
                .address(address)
                .state(state)
                .currentPersonnel(currentPersonnel)
                .maxPersonnel(maxPersonnel)
                .place(place)
                .build();
    }
}
