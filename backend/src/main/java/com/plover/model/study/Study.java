package com.plover.model.study;

import com.plover.converter.BooleanToYNConverter;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@ToString
@NoArgsConstructor
@Table(name="study")
public class Study {
    @Id
    @GeneratedValue
    private Long id;

    // 본인이 쓴 글인지 대조하려면 이메일 정보가 있어야할 것 같음
    @ApiModelProperty(required = true)
    @NotNull
    @Email
    private String email;

    @ApiModelProperty(required = true)
    @NotBlank
    private String nickName;

    @ApiModelProperty(required = true)
    @NotBlank
    private String title;

    @ApiModelProperty(required = true)
    @NotBlank
    private String content;

    // manytomany보다 연결테이블을 entity로 만들어 주는 것이 좋다
    @OneToMany(mappedBy = "study")
    private List<StudyHashtag> hashtags;

    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date createDate;

    @Temporal(TemporalType.TIMESTAMP)
    @UpdateTimestamp
    private Date updateDate;

    @NotNull
    @Convert(converter = BooleanToYNConverter.class)
    private boolean isNotice;

    @Builder
    public Study(@NotNull @Email String email, @NotBlank String nickName, @NotBlank String title, @NotBlank String content, @NotNull boolean isNotice) {
        this.email = email;
        this.nickName = nickName;
        this.title = title;
        this.content = content;
        this.isNotice = isNotice;
    }
}
