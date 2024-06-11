package com.kosta.hankuk.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.kosta.hankuk.dto.ExamDto;
import com.kosta.hankuk.dto.ExamQuesDto;
import com.kosta.hankuk.dto.HomeworkDto;
import com.kosta.hankuk.dto.LectureDto;
import com.kosta.hankuk.dto.LessonDataDto;
import com.kosta.hankuk.entity.Exam;
import com.kosta.hankuk.entity.Homework;
import com.kosta.hankuk.entity.Lecture;
import com.kosta.hankuk.entity.LessonData;
import com.kosta.hankuk.repository.ExamQuesRepository;
import com.kosta.hankuk.repository.ExamRepository;
import com.kosta.hankuk.repository.HomeworkRepository;
import com.kosta.hankuk.repository.LectureRepository;
import com.kosta.hankuk.repository.LessonDataRepository;
import com.kosta.hankuk.repository.LessonRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProfServiceImpl implements ProfService{
	
	private final LectureRepository lectureRepository;
	private final ExamRepository examRepository;
	private final ExamQuesRepository examQuesRepository;
	private final LessonDataRepository lessonDataRepository;
	private final HomeworkRepository homeworkRepository;
	private final LessonRepository lessonRepository;
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
	public String lectureModify(LectureDto lectureDto) throws Exception {
		Lecture lecture = lectureRepository.findById(lectureDto.getLecNo()).get();
		System.out.println(lecture);
		lecture.setSemester(lectureDto.getSemester());
		lecture.setCredit(lectureDto.getCredit());
		lecture.setSect(lectureDto.getSect());
		lecture.setTime1(lectureDto.getTime1());
		lecture.setTime2(lectureDto.getTime2());
		System.out.println(lecture);
		lectureRepository.save(lecture);
		return null;
	}
	
	@Override
	public List<LectureDto> lectureDashboard(String profNo, Integer year) throws Exception {
		
		List<Lecture> lectureList = lectureRepository.findByProfessor_profNoAndYearAndStatus(profNo, year, "REQ");
		
		List<LectureDto> lectureDtoList = new ArrayList<LectureDto>();
		for (Lecture lecture : lectureList) {
			lectureDtoList.add(lecture.toLectureDto());
		}
		return lectureDtoList;
	}
	
	@Override
	public List<LessonDataDto> lessonDataList(String lecNo) throws Exception {
		List<LessonData> lessonDataList = lessonDataRepository.findByLesson_Lecture_lecNo(lecNo);
		List<LessonDataDto> lessonDataDtoList = new ArrayList<LessonDataDto>();
		for (LessonData lessonData : lessonDataList) {
			lessonDataDtoList.add(lessonData.toLessonDataDto());
		}
		return lessonDataDtoList;
	}

	@Override
	public List<HomeworkDto> homeworkList(String lecNo) throws Exception {
		List<Homework> homeworkList = homeworkRepository.findByLesson_Lecture_lecNo(lecNo);
		List<HomeworkDto> homeworkDtoList = new ArrayList<HomeworkDto>();
		for (Homework Homework : homeworkList) {
			homeworkDtoList.add(Homework.toHomeworkDto());
		}
		return homeworkDtoList;
	}
	
	@Override
	public void homeworkWrite(HomeworkDto homeworkDto) throws Exception {
		homeworkDto.setLessonNo(lessonRepository.findByLecture_lecNoAndWeekAndLessonCnt(
				homeworkDto.getLecNo(), homeworkDto.getWeek(), homeworkDto.getLessonCnt()).get().getLessonNo());
		homeworkRepository.save(homeworkDto.toHomework());
	}

	@Override
	public HomeworkDto homeworkSelectOne(Integer hwNo) throws Exception {
		return homeworkRepository.findById(hwNo).get().toHomeworkDto();
	}

	@Override
	public void homeworkModify(HomeworkDto homeworkDto) throws Exception {
		homeworkRepository.save(homeworkDto.toHomework());
	}
	
	@Override
	public void lessonDataWrite(LessonDataDto lessonDataDto) throws Exception {
		lessonDataDto.setLessonNo(lessonRepository.findByLecture_lecNoAndWeekAndLessonCnt(
				lessonDataDto.getLecNo(), lessonDataDto.getWeek(), lessonDataDto.getLessonCnt()).get().getLessonNo());
		lessonDataRepository.save(lessonDataDto.toLessonData());
	}

	@Override
	public LessonDataDto lessonDataSelectOne(Integer ldNo) throws Exception {
		return lessonDataRepository.findById(ldNo).get().toLessonDataDto();
	}

	@Override
	public void lessonDataModify(LessonDataDto lessonDataDto) throws Exception {
		lessonDataRepository.save(lessonDataDto.toLessonData());
	}

	@Override
	public void examAndQuestionWrite(ExamDto examDto, List<ExamQuesDto> questionDtoList) throws Exception {
		examRepository.save(examDto.toExam());
		
		Optional<Exam> oExam = examRepository.findByLecture_lecNoAndSect(examDto.getLecNo(), examDto.getSect());
		
		for (ExamQuesDto examQuesDto : questionDtoList) {
			examQuesDto.setExamNo(oExam.get().getExamNo());
			examQuesRepository.save(examQuesDto.toExamQues());
		}
		
	}

	

	

	

	

	

	

	

	
}
