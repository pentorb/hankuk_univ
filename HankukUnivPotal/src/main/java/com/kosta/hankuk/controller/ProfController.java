package com.kosta.hankuk.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kosta.hankuk.dto.ExamDto;
import com.kosta.hankuk.dto.ExamQuesDto;
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
	
	@PostMapping("/lectureModify")
	public ResponseEntity<String> lectureModify(@ModelAttribute LectureDto lectureDto) {
		try {
			System.out.println(lectureDto);
			String lecNo = profService.lectureModify(lectureDto);
			return new ResponseEntity<String>(lecNo, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping("/lectureDashboard")
	public ResponseEntity<List<LectureDto>> lectureList(
			@RequestParam(name = "profNo", required = false) String profNo,
			@RequestParam(name = "year", required = false) String year) {
		try {
			System.out.println(profNo);
			System.out.println(year);
			List<LectureDto> lectureList = profService.lectureDashboard(profNo, Integer.parseInt(year));
			System.out.println(lectureList);
			return new ResponseEntity<List<LectureDto>>(lectureList, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<List<LectureDto>>(HttpStatus.BAD_REQUEST);
		}
	}
	
	
	
	@GetMapping("/contents")
	public ResponseEntity<Map<String, Object>> contents(
			@RequestParam(name = "lecNo", required = false) String lecNo){
		try {
			Map<String, Object> contents = new HashMap<String, Object>();
			contents.put("lessonDataList", profService.lessonDataList(lecNo));
			contents.put("homeworkList", profService.homeworkList(lecNo));
			return new ResponseEntity<Map<String, Object>>(contents, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Map<String, Object>>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@PostMapping("/homeworkWrite")
	public ResponseEntity<String> homeworkWrite(@RequestBody Map<String, Object> param) {
		try {
			System.out.println(param);
			Map<String, Object> homeworkParam = (Map<String, Object>)param.get("homework");
			ObjectMapper objectMapper = new ObjectMapper();
			HomeworkDto homeworkDto = objectMapper.convertValue(homeworkParam, HomeworkDto.class);
			System.out.println(homeworkDto);
			profService.homeworkWrite(homeworkDto);
			return new ResponseEntity<String>("과제가 등록되었습니다", HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping("/homeworkDetail/{hwNo}")
	public ResponseEntity<HomeworkDto> homeworkModifyForm(@PathVariable Integer hwNo){
		try {
			System.out.println(hwNo);
			HomeworkDto homeworkDto = profService.homeworkSelectOne(hwNo);
			return new ResponseEntity<HomeworkDto>(homeworkDto, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<HomeworkDto>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@PostMapping("/homeworkModify")
	public ResponseEntity<String> homeworkModify(@RequestBody Map<String, Object> param){
		try {
			System.out.println(param);
			Map<String, Object> homeworkParam = (Map<String, Object>)param.get("homework");
			ObjectMapper objectMapper = new ObjectMapper();
			HomeworkDto homeworkDto = objectMapper.convertValue(homeworkParam, HomeworkDto.class);
			profService.homeworkModify(homeworkDto);
			return new ResponseEntity<String>("과제가 수정되었습니다", HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@PostMapping("/examQuestionWrite")
	public ResponseEntity<String> examQuestionWrite(@RequestBody Map<String, Object> param) {
		System.out.println(param);
		Map<String, Object> examParam = (Map<String, Object>)param.get("exam");
		List<Map<String, Object>> questionMapList = (List<Map<String, Object>>)param.get("questionList");
		ObjectMapper objectMapper = new ObjectMapper();
		ExamDto examDto = objectMapper.convertValue(examParam, ExamDto.class);
		
		List<ExamQuesDto> questionList = new ArrayList<>();
		for (Map<String, Object> questionMap : questionMapList) {
			ExamQuesDto questionDto = objectMapper.convertValue(questionMap, ExamQuesDto.class);
			questionList.add(questionDto);
		}
		
		
		try {
			profService.examAndQuestionWrite(examDto,questionList);
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
