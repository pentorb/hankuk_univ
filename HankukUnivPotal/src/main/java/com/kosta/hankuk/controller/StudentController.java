package com.kosta.hankuk.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kosta.hankuk.dto.HuehakDto;
import com.kosta.hankuk.service.StudentService;

@RestController
public class StudentController {

	@Autowired
	private StudentService stdService;
	
	@PostMapping("/hueInsert")
	public ResponseEntity<String> huehakInsert(@ModelAttribute HuehakDto hueDto) {
		try {
			stdService.hueInsert(hueDto);
			return new ResponseEntity<String>("휴학 정상 신청", HttpStatus.OK);
		} catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>(HttpStatus.BAD_REQUEST);
		}
	}
	
}
