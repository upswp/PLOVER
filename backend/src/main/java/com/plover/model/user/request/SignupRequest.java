package com.plover.model.user.request;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;



@Getter
@Setter
@Valid
@ToString
public class SignupRequest {
	
	@ApiModelProperty(required = true)
    @Email
    private String email;
	
    @ApiModelProperty(required = true)
    @NotNull
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d$@$!%*#?&]{8,}$")
    private String password; 
    
    @ApiModelProperty(required = true)
    @NotNull
    private String nickName;
   
    //기본크기가 255이므로 나중에 char나 boolean 또는 byte로 바꾸면 좋을거 같습니다.
    @NotNull
    private String gender;
    
    @NotNull
    private String city;
   
    
    public SignupRequest() {}
    
    @Builder
	public SignupRequest(@Email String email,
			@NotNull @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d$@$!%*#?&]{8,}$") String password,
			@NotNull String nickName, @NotNull String gender, @NotNull String city) {
		this.email = email;
		this.password = password;
		this.nickName = nickName;
		this.gender = gender;
		this.city = city;
	}
}
