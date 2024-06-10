package com.kosta.hankuk.service;

import java.util.List;

import com.kosta.hankuk.dto.HuehakDto;
import com.kosta.hankuk.dto.MajorDto;
import com.kosta.hankuk.dto.StudentDto;

public interface StudentService {
	// 휴학
	void hueInsert(HuehakDto hueDto) throws Exception;
	
	String stdByMajCd(StudentDto stdDto) throws Exception;
	
	
	// 학번으로 휴/복학 내역 조회하기
	List<HuehakDto> hueListByStdNo(String stdNo) throws Exception;
}
