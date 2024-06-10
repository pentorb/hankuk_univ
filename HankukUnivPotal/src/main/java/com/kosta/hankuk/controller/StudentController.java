package com.kosta.hankuk.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
			System.out.println(hueDto);
			return new ResponseEntity<String>("휴학 정상 신청", HttpStatus.OK);
		} catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping("/hueListByStdNo") // 학번으로 휴학 리스트 조회 
	public ResponseEntity<List<HuehakDto>> hueListByStdNo(@RequestParam("stdNo") String stdNo){
		try {
			List<HuehakDto> hueDtoList = stdService.hueListByStdNo(stdNo);
			return new ResponseEntity<List<HuehakDto>>(hueDtoList, HttpStatus.OK);
		}
		catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<List<HuehakDto>>(HttpStatus.BAD_REQUEST);
		}
	}
}
