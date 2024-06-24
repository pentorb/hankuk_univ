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
import com.kosta.hankuk.dto.AbsenceDto;
import com.kosta.hankuk.dto.AppealDto;
import com.kosta.hankuk.dto.AttendanceDto;
import com.kosta.hankuk.dto.ExamDto;
import com.kosta.hankuk.dto.ExamQuesDto;
import com.kosta.hankuk.dto.ExamResultDto;
import com.kosta.hankuk.dto.HomeworkDto;
import com.kosta.hankuk.dto.HomeworkSubmitDto;
import com.kosta.hankuk.dto.LectureByStdDto;
import com.kosta.hankuk.dto.LectureDto;
import com.kosta.hankuk.dto.LessonDataDto;
import com.kosta.hankuk.dto.ProfessorDto;
import com.kosta.hankuk.dto.StudentDto;
import com.kosta.hankuk.dto.SubjectDto;
import com.kosta.hankuk.service.ProfService;


@RestController
public class ProfController {
	@Autowired
	private ProfService profService;
	
	@GetMapping("/checkProfPw")
	public ResponseEntity<String> checkProfPw(@RequestParam String profNo, @RequestParam(name="password") String inputPw) {
		try { 
			Boolean isCorrect = profService.checkPassword(profNo, inputPw);
			if (!isCorrect) {
				return new ResponseEntity<String>("비번 찾기 실패", HttpStatus.BAD_REQUEST);
			} else {
				return new ResponseEntity<String>("비번 찾기 성공", HttpStatus.OK);
			}
		} catch (Exception e) {
			return new ResponseEntity<String>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping("/updateProfPw") // 비번 재설정
	public ResponseEntity<String> updateProfPw(@RequestParam String profNo, @RequestParam(name="newPw") String newPw) {
		try {
			profService.updateProfPw(profNo, newPw);
			return new ResponseEntity<String>("비밀번호 변경 성공", HttpStatus.OK);
		} catch(Exception e) {
			return new ResponseEntity<String>("비밀번호 변경 실패", HttpStatus.BAD_REQUEST);
		}
	}
	
	@PostMapping("/profInfoModify")
	public ResponseEntity<String> profInfoModify(@ModelAttribute ProfessorDto professorDto){
		try {
			profService.profInfoModify(professorDto);
			return new ResponseEntity<String>("정보 변경 완료", HttpStatus.OK);
		} catch(Exception e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping("/lectureList")
	public ResponseEntity<List<LectureDto>> lectureList(
			@RequestParam(name = "profNo", required = false) String profNo,
			@RequestParam(name = "year", required = false) Integer year,
			@RequestParam(name = "status", required = false) String status) {
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
	
	@GetMapping("/subjectList")
	public ResponseEntity<List<SubjectDto>> subjectList(
			@RequestParam(name = "majCd", required = false) String majCd) {
		try {
			System.out.println(majCd);
			List<SubjectDto> subjectList = profService.subjectList(majCd);
			System.out.println(subjectList);
			return new ResponseEntity<List<SubjectDto>>(subjectList, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<List<SubjectDto>>(HttpStatus.BAD_REQUEST);
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
			@RequestParam(name = "year", required = false) String year,
			@RequestParam(name = "semester", required = false) String semester) {
		try {
			List<LectureDto> lectureList = profService.lectureDashboard(profNo, Integer.parseInt(year), Integer.parseInt(semester));
			return new ResponseEntity<List<LectureDto>>(lectureList, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<List<LectureDto>>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping("/studentListAndLectureByStdList")
	public ResponseEntity<Map<String, Object>> studentListAndLectureByStdList(
			@RequestParam(name = "profNo", required = false) String profNo,
			@RequestParam(name = "year", required = false) Integer year,
			@RequestParam(name = "stdName", required = false) String stdName) {
		try {
			System.out.println(profNo);
			Map<String, Object> studentListAndLectureByStdList = profService.studentListAndLectureByStdList(profNo, year, stdName);
			System.out.println(studentListAndLectureByStdList);
			return new ResponseEntity<Map<String, Object>>(studentListAndLectureByStdList, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Map<String, Object>>(HttpStatus.BAD_REQUEST);
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
	
	@GetMapping("/homeworkSubmitList")
	public ResponseEntity<List<HomeworkSubmitDto>> homeworkSubmitList(
			@RequestParam(name = "hwNo", required = false) Integer hwNo) {
		try {
			System.out.println(hwNo);
			List<HomeworkSubmitDto> homeworkSubmitList = profService.homeworkSubmitList(hwNo);
			System.out.println(homeworkSubmitList);
			return new ResponseEntity<List<HomeworkSubmitDto>>(homeworkSubmitList, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<List<HomeworkSubmitDto>>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@PostMapping("/homeworkSubmitModify")
	public ResponseEntity<String> homeworkSubmitModify(@RequestBody Map<String, Object> param) {
		try {
			System.out.println(param);
			List<Map<String, Object>> homeworkSubmitListParam = (List<Map<String, Object>>) param.get("homeworkSubmitList");			ObjectMapper objectMapper = new ObjectMapper();
			List<HomeworkSubmitDto> homeworkSubmitDtoList = objectMapper.convertValue(homeworkSubmitListParam,
					new TypeReference<List<HomeworkSubmitDto>>() {
					});
			profService.homeworkSubmitModify(homeworkSubmitDtoList);
			return new ResponseEntity<String>("과제점수가 저장되었습니다", HttpStatus.OK);
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
			System.out.println(examResultDtoList);
			profService.examResultModify(examResultDtoList);
			return new ResponseEntity<String>("시험점수가 수정되었습니다", HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@PostMapping("/gradeWrite")
	public ResponseEntity<List<LectureByStdDto>> gradeWrite(@RequestBody Map<String, Object> param) {
		try {
			List<Map<String, Object>> lectureByStuListParam = (List<Map<String, Object>>) param.get("studentList");			
			ObjectMapper objectMapper = new ObjectMapper();
			List<LectureByStdDto> lectureByStuDtoList = objectMapper.convertValue(lectureByStuListParam,
					new TypeReference<List<LectureByStdDto>>() {
					});
			List<LectureByStdDto> newlectureByStuDtoList = profService.gradeWrite(lectureByStuDtoList);
			return new ResponseEntity<List<LectureByStdDto>>(newlectureByStuDtoList, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<List<LectureByStdDto>>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping("/appealList")
	public ResponseEntity<List<AppealDto>> appealList(
			@RequestParam(name = "lecNo", required = false) String lecNo) {
		try {
			System.out.println(lecNo);
			List<AppealDto> appealList = profService.appealList(lecNo);
			System.out.println(appealList);
			return new ResponseEntity<List<AppealDto>>(appealList, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<List<AppealDto>>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@PostMapping("/appealConfirm")
	public ResponseEntity<String> appealConfirm(@RequestBody Map<String, Object> param) {
		try {
			System.out.println(param);
			Map<String, Object> appealParam = (Map<String, Object>) param.get("appeal");
			ObjectMapper objectMapper = new ObjectMapper();
			AppealDto appealDto = objectMapper.convertValue(appealParam, AppealDto.class);
			profService.appealModify(appealDto);
			return new ResponseEntity<String>("이의신청에 응답되었습니다", HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping("/absenceList")
	public ResponseEntity<List<AbsenceDto>> absenceList(
			@RequestParam(name = "lecNo", required = false) String lecNo) {
		try {
			System.out.println(lecNo);
			List<AbsenceDto> absenceList = profService.absenceList(lecNo);
			System.out.println(absenceList);
			return new ResponseEntity<List<AbsenceDto>>(absenceList, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<List<AbsenceDto>>(HttpStatus.BAD_REQUEST);
		}
	}
	
	@PostMapping("/absenceConfirm")
	public ResponseEntity<String> absenceConfirm(@RequestBody Map<String, Object> param) {
		try {
			System.out.println(param);
			Map<String, Object> absenceParam = (Map<String, Object>) param.get("absence");
			ObjectMapper objectMapper = new ObjectMapper();
			AbsenceDto absenceDto = objectMapper.convertValue(absenceParam, AbsenceDto.class);
			profService.absenceModify(absenceDto);
			return new ResponseEntity<String>("공결신청에 응답되었습니다", HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>(HttpStatus.BAD_REQUEST);
		}
	}
	
	
	
}
