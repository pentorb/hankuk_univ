package com.kosta.hankuk.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kosta.hankuk.dto.HuehakDto;
import com.kosta.hankuk.dto.StudentDto;
import com.kosta.hankuk.entity.Huehak;
import com.kosta.hankuk.repository.HuehakRepository;
import com.kosta.hankuk.repository.MajorRepository;
import com.kosta.hankuk.repository.StudentRepository;

@Service
public class StudentServiceImpl implements StudentService {

	// 휴학 
	@Autowired
	private HuehakRepository hueRes;
	
	@Autowired
	private MajorRepository mres;
	
	@Autowired
	private StudentRepository sres;
	
	@Override
	public void hueInsert(HuehakDto hueDto) throws Exception {
		Huehak huehak = hueDto.toHuehak();
		System.out.println(huehak);
		hueRes.save(huehak);
	}

	@Override
	public String stdByMajCd(StudentDto stdDto) throws Exception {
		return mres.findById(stdDto.getMajCd()).get().getName();
	}

	@Override
	public List<HuehakDto> hueListByStdNo(String stdNo) throws Exception {
		List<Huehak> hueList = hueRes.findByStudent_StdNo(stdNo);
		List<HuehakDto> hueDtoList = new ArrayList<HuehakDto>();
		for (Huehak hue : hueList) {
			hueDtoList.add(hue.toHuehakDto());
		}
		return hueDtoList;
	}


}
