package com.plover.model.user.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChangePasswordRequest {
	private String email;
	private String password;
}
