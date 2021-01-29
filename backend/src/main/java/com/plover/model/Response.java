package com.plover.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Response {
	private String response;
	private String message;
	private Object data;

	public Response(String response, String message, Object data) {
	    this.response = response;
	    this.message = message;
	    this.data = data;
	}
}