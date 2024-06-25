package com.kosta.hankuk.service;

import java.util.List;
import java.util.Map;

import com.kosta.hankuk.dto.ColleageDto;
import com.kosta.hankuk.dto.MajorDto;

public interface CourseRegistrationService {
	Map<String, Object> loadStudentInformation(String stdNo) throws Exception;
	List<Map<String, Object>> showCourseRegistration(String majCd, Integer targetGrd, Integer year, String stdNo) throws Exception;
	void registerForCourse(String stdNo, String lecNo) throws Exception;
	List<Map<String, Object>> showCourseRegistrationConfirmation(String stdNo) throws Exception;
	void removeCourseRegistration(Integer lbsNo) throws Exception;
	List<Map<String, Object>> showPreRegistration(String stdNo) throws Exception;
	void preRegisterCourse(String stdNo, String lecNo) throws Exception;
	void removePreRegistration(Integer lbNo) throws Exception;
	List<ColleageDto> showCollege() throws Exception;
	List<MajorDto> showMajor(String colCd) throws Exception;
	List<Map<String, Object>> showWholeCourses(String stdNo, Integer year) throws Exception;
	List<Map<String, Object>> searhCourses(String majCd, Integer targetGrd, String searchType, String searchWord, String stdNo, Integer year) throws Exception;
	Map<String, Object> checkConfirmationCount(String stdNo) throws Exception;
}
