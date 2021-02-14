// 하단 DB 설정 부분은 Sub PJT II에서 데이터베이스를 구성한 이후에 주석을 해제하여 사용.

package com.plover.model.user;

import com.plover.config.UserRole;
import com.plover.model.Salt;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.CreationTimestamp;

import io.swagger.annotations.ApiModelProperty;

import java.util.Date;


/**
 * @author KiHyeonYun
 * mybatis -> Dto == DB
**/
@Entity
@Getter
@Setter
@ToString
@Table(name="user")
public class UserDto {
    @Id
    @GeneratedValue
    private Long no;

    @NotNull
    @Email
    private String email;

    private String password;

    @NotNull
    private String nickName;
    
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date createDate;
    
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date updateDate;

    @NotNull
    private String campus;

    @Column(columnDefinition = "varchar(255) default 'images/default-image.png'")
    private String profileImageUrl;

    @NotNull
    private String generation;
    
    @Column(name = "role")
    @Enumerated(EnumType.STRING)
    private UserRole role = UserRole.ROLE_NOT_PERMITTED;
    
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "salt_id")
    private Salt salt;
    
    //기본 생성자
    public UserDto() {}

    @Builder
    public UserDto(@NotNull @Email String email, @NotNull String nickName, @NotNull String campus, String profileImageUrl, @NotNull String generation) {
        this.email = email;
        this.nickName = nickName;
        this.campus = campus;
        this.profileImageUrl = profileImageUrl;
        this.generation = generation;
    }
    @Builder
    public UserDto(@NotNull @Email String email, @NotNull String nickName, @NotNull String campus, @NotNull String generation) {
        this.email = email;
        this.nickName = nickName;
        this.campus = campus;
        this.generation = generation;
    }
}
