package com.kosta.hankuk.service;

import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.kosta.hankuk.dto.HuehakDto;
import com.kosta.hankuk.dto.LectureByStdDto;

public interface StudentService {
	// 휴학
	void hueInsert(HuehakDto hueDto) throws Exception;
	// 학번으로 휴/복학 내역 조회하기
	List<HuehakDto> hueListByStdNo(String stdNo) throws Exception;
	// 학번으로 수강하는 강의리스트 가져오기
	List<LectureByStdDto> lecListByStdNo(String stdNo, Integer year, Integer semester) throws Exception;
	
	List<Map<String, Object>> checkGrade(String stdNo, Integer year, Integer semester) throws Exception;
	Map<String, Object> checkScore(String stdNo, Integer year, Integer semester) throws Exception;
	Map<String, Object> loadLectureInformation(String stdNo, String lecNo) throws Exception;
	Integer makeAppeal(String stdNo, String lecNo, String content, MultipartFile file) throws Exception;
	List<Map<String, Object>> checkAppealList(String stdNo, Integer year, Integer semester) throws Exception;
	Map<String, Object> appealDetail(Integer appNo) throws Exception;
	void modifyAppeal(Integer appNo, String content, MultipartFile file) throws Exception;
}
