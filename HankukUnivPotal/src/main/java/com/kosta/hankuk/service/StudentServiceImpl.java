package com.kosta.hankuk.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kosta.hankuk.dto.HuehakDto;
import com.kosta.hankuk.entity.Huehak;
import com.kosta.hankuk.repository.HuehakRepository;

@Service
public class StudentServiceImpl implements StudentService {

	// 휴학 
	@Autowired
	private HuehakRepository hueRes;
	
	@Override
	public void hueInsert(HuehakDto hueDto) throws Exception {
		Huehak huehak = hueDto.toHuehak();
		System.out.println(huehak);
		hueRes.save(huehak);
	}
	
}
