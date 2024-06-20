package com.kosta.hankuk.service;

import java.util.List;
import java.util.Map;

public interface CourseRegistrationService {
	Map<String, Object> loadStudentInformation(String stdNo) throws Exception;
	List<Map<String, Object>> showCourseRegistration(String majCd, Integer targetGrd) throws Exception;
	void registerForCourse(String stdNo, String lecNo) throws Exception;
	List<Map<String, Object>> showCourseRegistrationConfirmation(String stdNo) throws Exception;
	void removeCourseRegistration(Integer lbsNo) throws Exception;
	List<Map<String, Object>> showPreRegistration(String stdNo) throws Exception;
	void preRegisterCourse(String stdNo, String lecNo) throws Exception;
	void removePreRegistration(Integer lbNo) throws Exception;
}
