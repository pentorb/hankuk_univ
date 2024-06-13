package com.kosta.hankuk.entity;

import javax.persistence.Id;

public interface User {
	@Id
	String getId();
	String getName();
	String getPassword();
	void setPassword(String enteredPassword);	
}
