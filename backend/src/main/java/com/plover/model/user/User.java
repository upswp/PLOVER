// 하단 DB 설정 부분은 Sub PJT II에서 데이터베이스를 구성한 이후에 주석을 해제하여 사용.

package com.plover.model.user;

import com.plover.config.UserRole;
import com.plover.model.Salt;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
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
public class User {
    @Id
    @GeneratedValue
    private Long uid;

    @ApiModelProperty(required = true)
    @NotNull
    @Email
    private String email;
    
    @ApiModelProperty(required = true)
    private String password;
    
    @ApiModelProperty(required = true)
    @NotNull
    private String nickName;
    
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date createDate;
    
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date updateDate;
    
    //기본크기가 255이므로 나중에 char나 boolean 또는 byte로 바꾸면 좋을거 같습니다.
    @ApiModelProperty(required = true)
    @NotNull
    private String gender;
    
    @ApiModelProperty(required = true)
    @NotNull
    private String city;
    
    @Column(name = "role")
    @Enumerated(EnumType.STRING)
    private UserRole role = UserRole.ROLE_NOT_PERMITTED;
    
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "salt_id")
    private Salt salt;
    
    //기본 생성자
    public User() {}

    @Builder
	public User(@NotNull @Email String email, String password, @NotNull String nickName, @NotNull String gender,
                @NotNull String city) {
    	
		this.email = email;
		this.password = password;
		this.nickName = nickName;
		this.gender = gender;
		this.city = city;
	}
}
