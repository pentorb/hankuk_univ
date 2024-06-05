package com.kosta.hankuk.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kosta.hankuk.dto.HomeworkDto;
import com.kosta.hankuk.dto.LectureDto;
import com.kosta.hankuk.service.ProfService;


@RestController
public class ProfController {
	@Autowired
	private ProfService profService;
	
	@GetMapping("/lectureList")
	public ResponseEntity<List<LectureDto>> lectureList(
			@RequestParam(name = "profNo", required = false) String profNo,
			@RequestParam(name = "year", required = false) Integer year,
			@RequestParam(name = "div", required = false) String status) {
		try {
			System.out.println(profNo);
			List<LectureDto> lectureList = profService.lectureList(profNo, year, status);
			System.out.println(lectureList);
			return new ResponseEntity<List<LectureDto>>(lectureList, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<List<LectureDto>>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@PostMapping("/lectureWrite")
	public ResponseEntity<String> lectureWrite(@ModelAttribute LectureDto lectureDto) {
		try {
			System.out.println(lectureDto);
			String lecNo = profService.lectureWrite(lectureDto);
			return new ResponseEntity<String>(lecNo, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping("/lectureDetail/{lecNo}")
	public ResponseEntity<LectureDto> lectureDetail(
			@PathVariable String lecNo) {
		try {
			LectureDto lecture = profService.lectureDetail(lecNo);
			System.out.println(lecture);
			return new ResponseEntity<LectureDto>(lecture,HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<LectureDto>(HttpStatus.BAD_REQUEST);
		}
	}
	@PostMapping("/homeworkWrite")
	public ResponseEntity<String> homeworkWrite(@RequestBody HomeworkDto homeworkDto) {
		try {
			profService.homeworkWrite(homeworkDto);
			return new ResponseEntity<String>("과제가 등록되었습니다", HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping("/homeworkModifyForm/{homeworkNo}")
	public ResponseEntity<HomeworkDto> homeworkModifyForm(@PathVariable Integer homeworkNo){
		try {
			HomeworkDto homeworkDto = profService.homeworkSelectOne(homeworkNo);
			return new ResponseEntity<HomeworkDto>(homeworkDto, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<HomeworkDto>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@PostMapping("/homeworkModify")
	public ResponseEntity<String> homeworkModify(@RequestBody HomeworkDto homeworkDto){
		try {
			profService.homeworkModify(homeworkDto);
			return new ResponseEntity<String>("과제가 수정되었습니다", HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@PostMapping("/examWrite")
	public ResponseEntity<String> examWrite(@RequestParam("startDt") String startDt,
			@RequestParam("endDt") String endDt,
			@RequestParam("sect") String sect,
			@RequestParam("type") String type,
			@RequestParam("qNum") Integer qNum,
			@RequestParam("lecNo") String lecNo
			) {
		try {
			
			return new ResponseEntity<String>("true",HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@PostMapping("/questionWrite")
	public ResponseEntity<String> questionWrite(){
		try {
			
			return new ResponseEntity<String>("",HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>(HttpStatus.BAD_REQUEST);
		}
	}
	
	
}