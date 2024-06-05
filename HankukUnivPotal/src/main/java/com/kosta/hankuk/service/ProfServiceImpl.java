package com.kosta.hankuk.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.kosta.hankuk.dto.HomeworkDto;
import com.kosta.hankuk.dto.LectureDto;
import com.kosta.hankuk.entity.Lecture;
import com.kosta.hankuk.repository.LectureRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProfServiceImpl implements ProfService{
	
	private final LectureRepository lectureRepository;
	
	@Override
	public List<LectureDto> lectureList(String profNo, Integer year, String status) throws Exception {
		List<Lecture> lectureList=null;
		if(status.equals("")) {
			lectureList = lectureRepository.findByProfessor_profNoAndYear(profNo, year);
		} else {
			lectureList = lectureRepository.findByProfessor_profNoAndYearAndStatus(profNo, year, status);
		}
		List<LectureDto> lectureDtoList = new ArrayList<LectureDto>();
		for (Lecture lecture : lectureList) {
			lectureDtoList.add(lecture.toLectureDto());
		}
		return lectureDtoList;
	}
	
	@Override
	public String lectureWrite(LectureDto lectureDto) throws Exception {
		
		lectureRepository.save(lectureDto.toLecture());
		
		
		return lectureDto.getLecNo();
	}
	
	@Override
	public LectureDto lectureDetail(String lecNo) throws Exception {
		return lectureRepository.findById(lecNo).get().toLectureDto();
	}

	@Override
	public void homeworkWrite(HomeworkDto homeworkDto) throws Exception {
		// TODO Auto-generated method stub
		
	}

	@Override
	public HomeworkDto homeworkSelectOne(Integer homeworkNo) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void homeworkModify(HomeworkDto homeworkDto) throws Exception {
		// TODO Auto-generated method stub
		
	}

	

	

	
}