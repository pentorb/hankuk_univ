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

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kosta.hankuk.dto.AttendanceDto;
import com.kosta.hankuk.dto.ExamDto;
import com.kosta.hankuk.dto.ExamQuesDto;
import com.kosta.hankuk.dto.ExamResultDto;
import com.kosta.hankuk.dto.HomeworkDto;
import com.kosta.hankuk.dto.LectureByStdDto;
import com.kosta.hankuk.dto.LectureDto;
import com.kosta.hankuk.dto.LessonDataDto;
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
	
	@PostMapping("/lessonDataWrite")
	public ResponseEntity<String> lessonDataWrite(@RequestBody Map<String, Object> param) {
		try {
			System.out.println(param);
			Map<String, Object> lessonDataParam = (Map<String, Object>)param.get("lessonData");
			ObjectMapper objectMapper = new ObjectMapper();
			LessonDataDto lessonDataDto = objectMapper.convertValue(lessonDataParam, LessonDataDto.class);
			System.out.println(lessonDataDto);
			profService.lessonDataWrite(lessonDataDto);
			return new ResponseEntity<String>("강의자료가 등록되었습니다", HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping("/lessonDataDetail/{ldNo}")
	public ResponseEntity<LessonDataDto> lessonDataDetail(@PathVariable Integer ldNo){
		try {
			System.out.println(ldNo);
			LessonDataDto lessonDataDto = profService.lessonDataSelectOne(ldNo);
			return new ResponseEntity<LessonDataDto>(lessonDataDto, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<LessonDataDto>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@PostMapping("/lessonDataModify")
	public ResponseEntity<String> lessonDataModify(@RequestBody Map<String, Object> param){
		try {
			System.out.println(param);
			Map<String, Object> lessonDataParam = (Map<String, Object>)param.get("lessonData");
			ObjectMapper objectMapper = new ObjectMapper();
			LessonDataDto lessonDataDto = objectMapper.convertValue(lessonDataParam, LessonDataDto.class);
			profService.lessonDataModify(lessonDataDto);
			return new ResponseEntity<String>("과제가 수정되었습니다", HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping("/attendanceManageDetail")
	public ResponseEntity<Map<String, Object>> attendanceManageDetail(
			@RequestParam(name = "lecNo", required = false) String lecNo){
		try {
			Map<String, Object> attendanceDetail = new HashMap<String, Object>();
			attendanceDetail.put("attendanceList", profService.attendanceList(lecNo));
			return new ResponseEntity<Map<String, Object>>(attendanceDetail, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Map<String, Object>>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@PostMapping("/attendanceModify")
	public ResponseEntity<String> attendanceModify(@RequestBody Map<String, Object> param) {
		try {
			System.out.println(param);
			List<Map<String, Object>> attendanceListParam = (List<Map<String, Object>>) param.get("attendanceList");			ObjectMapper objectMapper = new ObjectMapper();
			List<AttendanceDto> attendanceDtoList = objectMapper.convertValue(attendanceListParam,
					new TypeReference<List<AttendanceDto>>() {
					});
			profService.attendanceModify(attendanceDtoList);
			return new ResponseEntity<String>("성적이 저장되었습니다", HttpStatus.OK);
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
	
	@GetMapping("/gradeManageDetail")
	public ResponseEntity<Map<String, Object>> gradeManageDetail(
			@RequestParam(name = "lecNo", required = false) String lecNo){
		try {
			Map<String, Object> gradeManageDetail = new HashMap<String, Object>();
			gradeManageDetail.put("studentList", profService.studentListByLecNo(lecNo));
			gradeManageDetail.put("attendanceList", profService.attendanceList(lecNo));
			gradeManageDetail.put("examResultList", profService.examResultListByLecNo(lecNo));
			gradeManageDetail.put("homeworkSubmitList", profService.homeworkSubmitListByLecNo(lecNo));
			gradeManageDetail.put("homeworkCount", profService.homeworkCount(lecNo));
			return new ResponseEntity<Map<String, Object>>(gradeManageDetail, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Map<String, Object>>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@PostMapping("/examResultModify")
	public ResponseEntity<String> examResultModify(@RequestBody Map<String, Object> param) {
		try {
			System.out.println(param);
			List<Map<String, Object>> examResultListParam = (List<Map<String, Object>>) param.get("examResultList");			ObjectMapper objectMapper = new ObjectMapper();
			List<ExamResultDto> examResultDtoList = objectMapper.convertValue(examResultListParam,
					new TypeReference<List<ExamResultDto>>() {
					});
			profService.examResultModify(examResultDtoList);
			return new ResponseEntity<String>("시험점수가 수정되었습니다", HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@PostMapping("/gradeWrite")
	public ResponseEntity<String> gradeWrite(@RequestBody Map<String, Object> param) {
		try {
			List<Map<String, Object>> lectureByStuListParam = (List<Map<String, Object>>) param.get("studentList");			
			ObjectMapper objectMapper = new ObjectMapper();
			List<LectureByStdDto> lectureByStuDtoList = objectMapper.convertValue(lectureByStuListParam,
					new TypeReference<List<LectureByStdDto>>() {
					});
			profService.gradeWrite(lectureByStuDtoList);
			return new ResponseEntity<String>("등급이 확정되었습니다", HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>(HttpStatus.BAD_REQUEST);
		}
	}
	
}
