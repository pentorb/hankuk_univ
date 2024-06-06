package com.kosta.hankuk.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kosta.hankuk.config.auth.PrincipalDetails;
import com.kosta.hankuk.dto.UserDto;
import com.kosta.hankuk.entity.Professor;
import com.kosta.hankuk.entity.Staff;
import com.kosta.hankuk.entity.Student;
import com.kosta.hankuk.entity.User;
import com.kosta.hankuk.util.Utils;

@RestController
public class IndexController {
	
	@GetMapping("/user")
	public ResponseEntity<UserDto> user(Authentication authentication) {
		PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
		User userOrigin = principalDetails.getUser();
		System.out.println(userOrigin);
		if(Utils.isNumber(userOrigin.getId().substring(0, 1))) {
			UserDto user = ((Student) userOrigin).toStudentDto();
			return new ResponseEntity<UserDto>(user, HttpStatus.OK);
		} else if(userOrigin.getId().substring(0, 1).equals("S")){
			UserDto user = ((Staff) userOrigin).toStaffDto();
			return new ResponseEntity<UserDto>(user, HttpStatus.OK);
		} else if(userOrigin.getId().substring(0, 1).equals("P")) {
			UserDto user = ((Professor) userOrigin).toProfessorDto();
			return new ResponseEntity<UserDto>(user, HttpStatus.OK);
		}
		return null;
	}	
}
