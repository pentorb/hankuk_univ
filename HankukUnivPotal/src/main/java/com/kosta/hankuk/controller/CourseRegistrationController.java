package com.kosta.hankuk.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kosta.hankuk.service.CourseRegistrationService;

@RestController
public class CourseRegistrationController {
	
	@Autowired
	private CourseRegistrationService courseRegistrationService;
	
	@PostMapping("/load-student-information")
	public ResponseEntity<Map<String, Object>> loadStudentInformation(@RequestParam String stdNo){		
		try {
			Map<String, Object> res = new HashMap<>();
			Map<String, Object> studentInformation = courseRegistrationService.loadStudentInformation(stdNo);
			res.put("studentInformation", studentInformation);
			return new ResponseEntity<Map<String, Object>> (res, HttpStatus.OK);
		}	catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Map<String, Object>> (HttpStatus.BAD_REQUEST);
		}
	}
	
	@PostMapping("/course-registration")
	public ResponseEntity<Map<String, Object>> showCourseRegistration(@RequestParam String majCd, @RequestParam Integer targetGrd){		
		try {
			Map<String, Object> res = new HashMap<>();
			List<Map<String, Object>> courseList = courseRegistrationService.showCourseRegistration(majCd, targetGrd);
			res.put("courseList", courseList);
			return new ResponseEntity<Map<String, Object>> (res, HttpStatus.OK);
		}	catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Map<String, Object>> (HttpStatus.BAD_REQUEST);
		}
	}
	
	@PostMapping("/register-for-course")
	public ResponseEntity<Boolean> registerForCourse(@RequestParam String stdNo, @RequestParam String lecNo){		
		try {
			courseRegistrationService.registerForCourse(stdNo, lecNo);
			return new ResponseEntity<Boolean> (true, HttpStatus.OK);
		}	catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Boolean> (HttpStatus.BAD_REQUEST);
		}
	}
	
	@PostMapping("/course-registration-confirmation")
	public ResponseEntity<Map<String, Object>> showCourseRegistrationConfirmation(@RequestParam String stdNo){		
		try {
			Map<String, Object> res = new HashMap<>();
			List<Map<String, Object>> confirmationList = courseRegistrationService.showCourseRegistrationConfirmation(stdNo);
			res.put("confirmationList", confirmationList);
			return new ResponseEntity<Map<String, Object>> (res, HttpStatus.OK);
		}	catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Map<String, Object>> (HttpStatus.BAD_REQUEST);
		}
	}
	
	@PostMapping("/remove-course-registration")
	public ResponseEntity<Boolean> removeCourseRegistration(@RequestParam Integer lbsNo){		
		try {
			courseRegistrationService.removeCourseRegistration(lbsNo);
			return new ResponseEntity<Boolean> (true, HttpStatus.OK);
		}	catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Boolean> (HttpStatus.BAD_REQUEST);
		}
	}
	
	@PostMapping("/pre-registration")
	public ResponseEntity<Map<String, Object>> showPreRegistration(@RequestParam String stdNo){		
		try {
			Map<String, Object> res = new HashMap<>();
			List<Map<String, Object>> preRegistrationList = courseRegistrationService.showPreRegistration(stdNo);
			res.put("preRegistrationList", preRegistrationList);
			return new ResponseEntity<Map<String, Object>> (res, HttpStatus.OK);
		}	catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Map<String, Object>> (HttpStatus.BAD_REQUEST);
		}
	}
	
	@PostMapping("/pre-register")
	public ResponseEntity<Boolean> preRegisterCourse(@RequestParam String stdNo, @RequestParam String lecNo){		
		try {
			courseRegistrationService.preRegisterCourse(stdNo, lecNo);
			return new ResponseEntity<Boolean> (true, HttpStatus.OK);
		}	catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Boolean> (HttpStatus.BAD_REQUEST);
		}
	}
	
	@PostMapping("/remove-pre-registration")
	public ResponseEntity<Boolean> removePreRegistration(@RequestParam Integer lbNo){		
		try {
			courseRegistrationService.removePreRegistration(lbNo);
			return new ResponseEntity<Boolean> (true, HttpStatus.OK);
		}	catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Boolean> (HttpStatus.BAD_REQUEST);
		}
	}
}
