package com.kosta.hankuk.service;

import com.kosta.hankuk.dto.HuehakDto;

public interface StudentService {
	// 휴학
	void hueInsert(HuehakDto hueDto) throws Exception;
}
