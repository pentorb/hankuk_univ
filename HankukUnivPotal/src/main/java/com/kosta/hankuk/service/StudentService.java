package com.kosta.hankuk.service;

import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.kosta.hankuk.dto.HuehakAndBokhakDto;
import com.kosta.hankuk.dto.HuehakDto;
import com.kosta.hankuk.dto.LectureByStdDto;
import com.kosta.hankuk.dto.StudentDto;
import com.kosta.hankuk.entity.Homework;
import com.kosta.hankuk.util.PageInfo;

public interface StudentService {
	// 학생 개인정보 수정
	void stdInfoModify(StudentDto stdDto) throws Exception;
	// 비밀번호 검증
	Boolean checkPassword(String stdNo, String inputPw) throws Exception;
	// 비번 초기화
	void resetPW(String stdNo, String tel) throws Exception;
	// 비번 변경
	void updatePw(String stdNo, String newPw) throws Exception;
	// 휴학
	void hueInsert(HuehakDto hueDto) throws Exception;
	// 학번으로 휴학 내역 조회하기
	List<HuehakDto> hueListByStdNo(PageInfo pageInfo, String stdNo, String status, String type) throws Exception;
	// 학번으로 복학 내역 조회하기
	List<HuehakAndBokhakDto> HueBokList(PageInfo pageInfo, String stdNo, String type) throws Exception;
	List<LectureByStdDto> lecListByStdNo(String stdNo, Integer year, Integer semester) throws Exception;
	HuehakDto huehakDetail(Integer hueNo) throws Exception;
	void BokhakModify(HuehakAndBokhakDto habDto) throws Exception;
	
	List<Map<String, Object>> checkGrade(String stdNo, Integer year, Integer semester) throws Exception;
	Map<String, Object> checkScore(String stdNo, Integer year, Integer semester) throws Exception;
	Map<String, Object> loadLectureInformation(String stdNo, String lecNo) throws Exception;
	
	Integer makeAppeal(String stdNo, String lecNo, String content, MultipartFile file) throws Exception;
	List<Map<String, Object>> checkAppealList(String stdNo, Integer year, Integer semester) throws Exception;
	Map<String, Object> appealDetail(Integer appNo) throws Exception;
	void modifyAppeal(Integer appNo, String content, MultipartFile file) throws Exception;
	
	List<Map<String, Object>> showLectureList(String stdNo) throws Exception;
	List<Map<String, Object>> showLectureContent(String lecNo, String stdNo) throws Exception;
	
	List<Map<String, Object>> showHomeworkList(String lecNo, String stdNo) throws Exception;
	Map<String, Object> loadHomeworkInformation(Integer hwNo, String stdNo) throws Exception;
	void sumbitHomework(String stdNo, Integer hwNo, MultipartFile file) throws Exception;
	void modifyHomework(String stdNo, Integer hwNo, MultipartFile file) throws Exception;
	
	List<Map<String, Object>> checkAttendance(String lecNo, String stdNo) throws Exception;
	Map<String, Object> checkAttendanceCount(String lecNo, String stdNo) throws Exception;
	void reportAbsence(String stdNo, Integer lessonNo, String content, String type, MultipartFile file) throws Exception;
	Map<String, Object> loadAbsenceInformation(Integer lessonNo, String stdNo) throws Exception;
	void modifyAbsence(Integer absNo, String content, String type, MultipartFile file) throws Exception;
}
