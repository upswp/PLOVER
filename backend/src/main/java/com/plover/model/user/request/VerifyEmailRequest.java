package com.plover.model.user.request;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class VerifyEmailRequest {
	String email;
	
	public VerifyEmailRequest() {}
	public VerifyEmailRequest(String email) {this.email = email;}
}
