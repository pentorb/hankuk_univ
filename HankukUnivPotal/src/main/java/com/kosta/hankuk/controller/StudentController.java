package com.kosta.hankuk.controller;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.kosta.hankuk.dto.HuehakDto;
import com.kosta.hankuk.dto.LectureByStdDto;
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
	
	@PostMapping("/grade")
	public ResponseEntity<Map<String, Object>> checkGrade(@RequestParam(name="stdNo")String stdNo,
			@RequestParam(name="year") Integer year, @RequestParam(name="semester") Integer semester){		
		try {
			Map<String, Object> res = new HashMap<>();
			List<Map<String, Object>> gradeList = stdService.checkGrade(stdNo, year, semester);
			Map<String, Object> semesterScore = stdService.checkScore(stdNo, year, semester);
			res.put("semesterScore", semesterScore);
			res.put("gradeList", gradeList);
			return new ResponseEntity<Map<String, Object>> (res, HttpStatus.OK);
		}	catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Map<String, Object>> (HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping("/allGrades") // 학번으로 학생 수강 리스트 
	public ResponseEntity<Map<String, Object>> lbsListByStdNo(@RequestParam("stdNo") String stdNo, @RequestParam("courYear") Integer courYear, @RequestParam("semester") Integer semester){
		try {
			Map<String, Object> res = new HashMap<>();
			List<LectureByStdDto> lbsDtoList = stdService.lecListByStdNo(stdNo, courYear, semester);
			System.out.println(lbsDtoList);
			res.put("lecList", lbsDtoList);
			return new ResponseEntity<Map<String, Object>>(res, HttpStatus.OK);
		} catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Map<String, Object>>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@PostMapping("/load-appeal-information")
	public ResponseEntity<Map<String, Object>> loadAppealInformation(@RequestParam(name="stdNo")String stdNo,
			@RequestParam(name="lectureNumber") String lectureNumber){		
		try {
			Map<String, Object> res = new HashMap<>();
			Map<String, Object> appealInformation = stdService.loadLectureInformation(stdNo, lectureNumber);
			res.put("appealInformation", appealInformation);
			return new ResponseEntity<Map<String, Object>> (res, HttpStatus.OK);
		}	catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Map<String, Object>> (HttpStatus.BAD_REQUEST);
		}
	}
	
	@PostMapping("/make-appeal")
	public ResponseEntity<Integer> makeAppeal(@RequestParam("stdNo") String stdNo,
			@RequestParam("lecNo") String lecNo,
			@RequestParam("content") String content,
			@RequestParam(name="files", required=false) MultipartFile files){
		try {
			Integer appNo = stdService.makeAppeal(stdNo, lecNo, content, files);
			return new ResponseEntity<Integer>(appNo, HttpStatus.OK);
		} catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Integer>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@PostMapping("/appeal")
	public ResponseEntity<Map<String, Object>> checkAppealList(@RequestParam(name="stdNo")String stdNo,
			@RequestParam(name="year") Integer year, @RequestParam(name="semester") Integer semester){		
		try {
			Map<String, Object> res = new HashMap<>();
			List<Map<String, Object>> appealList = stdService.checkAppealList(stdNo, year, semester);
			res.put("appealList", appealList);
			return new ResponseEntity<Map<String, Object>> (res, HttpStatus.OK);
		}	catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Map<String, Object>> (HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping({"/appeal-detail/{appNo}"})
	public ResponseEntity<Map<String, Object>> appealDetail(@PathVariable Integer appNo){
		try {
			Map<String, Object> res = new HashMap<>();
			Map<String, Object> appeal = stdService.appealDetail(appNo);
			res.put("appeal", appeal);
			return new ResponseEntity<Map<String, Object>> (res, HttpStatus.OK);
		} catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Map<String, Object>>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@PostMapping("/modify-appeal")
	public void modifyAppeal(@RequestParam("appNo") Integer appNo,
			@RequestParam("content") String content,
			@RequestParam(name="files", required=false) MultipartFile files){
		try {
			stdService.modifyAppeal(appNo, content, files);
		} catch(Exception e) {
			e.printStackTrace();
		}
	}
}
