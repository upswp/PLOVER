package com.plover.model.user.request;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Column;
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

    @NotNull
    private String campus;

    @Column(columnDefinition = "varchar(255) default 'images/default-image.png'")
    private String profileImageUrl;

    @NotNull
    private String generation;
   
    
    public SignupRequest() {}
    
    @Builder

    public SignupRequest(@Email String email, @NotNull @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d$@$!%*#?&]{8,}$") String password, @NotNull String nickName, @NotNull String campus, String profileImageUrl, @NotNull String generation) {
        this.email = email;
        this.password = password;
        this.nickName = nickName;
        this.campus = campus;
        this.profileImageUrl = profileImageUrl;
        this.generation = generation;
    }
}
