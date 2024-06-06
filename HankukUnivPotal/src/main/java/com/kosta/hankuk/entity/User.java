package com.kosta.hankuk.entity;

import javax.persistence.Id;

import com.kosta.hankuk.dto.UserDto;

public interface User {
	@Id
	String getId();
	String getName();
	String getPassword();
	void setPassword(String enteredPassword);	
}
