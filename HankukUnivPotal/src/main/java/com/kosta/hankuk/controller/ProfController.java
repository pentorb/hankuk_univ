package com.kosta.hankuk.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kosta.hankuk.dto.LectureDto;
import com.kosta.hankuk.service.ProfService;


@RestController
public class ProfController {
	@Autowired
	private ProfService profService;
	
	@GetMapping("/lectureList")
	public ResponseEntity<List<LectureDto>> lectureList(
			@RequestParam(name = "profNo", required = false) String profNo,
			@RequestParam(name = "year", required = false) String year,
			@RequestParam(name = "div", required = false) String div) {
		try {
			List<LectureDto> lectureList = profService.lectureList(profNo, year, div);
			return new ResponseEntity<List<LectureDto>>(lectureList, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<List<LectureDto>>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@PostMapping("/lectureWrite")
	public ResponseEntity<Integer> lectureWrite(@RequestBody LectureDto lectureDto) {
		try {
			Integer lecNo = profService.lectureWrite(lectureDto);
			return new ResponseEntity<Integer>(lecNo, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Integer>(HttpStatus.BAD_REQUEST);
		}
	}
	
	
}
