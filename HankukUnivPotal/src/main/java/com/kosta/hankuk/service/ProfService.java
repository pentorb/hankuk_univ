package com.kosta.hankuk.service;

import java.util.List;

import com.kosta.hankuk.dto.ExamDto;
import com.kosta.hankuk.dto.ExamQuesDto;
import com.kosta.hankuk.dto.HomeworkDto;
import com.kosta.hankuk.dto.LectureDto;

public interface ProfService {
	
	List<LectureDto> lectureList(String profNo, Integer year, String div) throws Exception;
	
	String lectureWrite(LectureDto lectureDto) throws Exception;

	LectureDto lectureDetail(String lecNo) throws Exception;
	
	String lectureModify(LectureDto lectureDto) throws Exception;
	
	List<LectureDto> lectureDashboard(String profNo, Integer year) throws Exception;

	void homeworkWrite(HomeworkDto homeworkDto) throws Exception;

	HomeworkDto homeworkSelectOne(Integer homeworkNo) throws Exception;

	void homeworkModify(HomeworkDto homeworkDto) throws Exception;

	void examAndQuestionWrite(ExamDto examDto, List<ExamQuesDto> questionDtoList) throws Exception;


	

	

	
	
}
