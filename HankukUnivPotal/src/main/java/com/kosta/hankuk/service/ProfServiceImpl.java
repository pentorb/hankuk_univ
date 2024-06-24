package com.kosta.hankuk.service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.apache.commons.collections4.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.kosta.hankuk.dto.AbsenceDto;
import com.kosta.hankuk.dto.AppealDto;
import com.kosta.hankuk.dto.AttendanceDto;
import com.kosta.hankuk.dto.ExamDto;
import com.kosta.hankuk.dto.ExamQuesDto;
import com.kosta.hankuk.dto.ExamResultDto;
import com.kosta.hankuk.dto.HomeworkDto;
import com.kosta.hankuk.dto.HomeworkSubmitDto;
import com.kosta.hankuk.dto.LectureByStdDto;
import com.kosta.hankuk.dto.LectureDto;
import com.kosta.hankuk.dto.LessonDataDto;
import com.kosta.hankuk.dto.ProfessorDto;
import com.kosta.hankuk.dto.StudentDto;
import com.kosta.hankuk.dto.SubjectDto;
import com.kosta.hankuk.entity.Absence;
import com.kosta.hankuk.entity.Appeal;
import com.kosta.hankuk.entity.Attendance;
import com.kosta.hankuk.entity.Exam;
import com.kosta.hankuk.entity.ExamResult;
import com.kosta.hankuk.entity.Homework;
import com.kosta.hankuk.entity.HomeworkSubmit;
import com.kosta.hankuk.entity.Lecture;
import com.kosta.hankuk.entity.LectureByStd;
import com.kosta.hankuk.entity.LessonData;
import com.kosta.hankuk.entity.Professor;
import com.kosta.hankuk.entity.Student;
import com.kosta.hankuk.entity.Subject;
import com.kosta.hankuk.repository.AbsenceRepository;
import com.kosta.hankuk.repository.AppealRepository;
import com.kosta.hankuk.repository.AttendanceRepository;
import com.kosta.hankuk.repository.ExamQuesRepository;
import com.kosta.hankuk.repository.ExamRepository;
import com.kosta.hankuk.repository.ExamResultRepository;
import com.kosta.hankuk.repository.HomeworkRepository;
import com.kosta.hankuk.repository.HomeworkSubmitRepository;
import com.kosta.hankuk.repository.LectureByStdRepository;
import com.kosta.hankuk.repository.LectureRepository;
import com.kosta.hankuk.repository.LessonDataRepository;
import com.kosta.hankuk.repository.LessonRepository;
import com.kosta.hankuk.repository.ProfessorRepository;
import com.kosta.hankuk.repository.StudentRepository;
import com.kosta.hankuk.repository.SubjectRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProfServiceImpl implements ProfService{
	@Autowired
    PasswordEncoder passwordEncoder;
	
	private final ProfessorRepository professorRepository;
	private final LectureRepository lectureRepository;
	private final ExamRepository examRepository;
	private final ExamQuesRepository examQuesRepository;
	private final LessonDataRepository lessonDataRepository;
	private final HomeworkRepository homeworkRepository;
	private final LessonRepository lessonRepository;
	private final LectureByStdRepository lectureByStdRepository;
	private final AttendanceRepository attendanceRepository;
	private final ExamResultRepository examResultRepository;
	private final HomeworkSubmitRepository homeworkSubmitRepository;
	private final AppealRepository appealRepository;
	private final AbsenceRepository absenceRepository;
	private final StudentRepository studentRepository;
	private final SubjectRepository subjectRepository;
	
	@Override
	public Boolean checkPassword(String profNo, String inputPw) throws Exception {
		String encodePw = professorRepository.findById(profNo).get().getPassword();
		System.out.println("encodePW"+ encodePw);
		System.out.println("inpputPW"+inputPw);
		
		if(passwordEncoder.matches(inputPw, encodePw)){
        	return true;
        }else{
        	return false;
        }
	}
	
	@Override
	public void updateProfPw(String profNo, String newPw) throws Exception {
		Professor professor = professorRepository.findById(profNo).get();
		professor.setPassword(passwordEncoder.encode(newPw));
		professorRepository.save(professor);
	}
	
	@Override
	public void profInfoModify(ProfessorDto professorDto) throws Exception {
		Professor professor = professorRepository.findById(professorDto.getId()).get();

		professor.setAddr(professorDto.getAddr());
		professor.setDetailAddr(professorDto.getDetailAddr());
		professor.setTel(professorDto.getTel());
		professor.setEmail(professorDto.getEmail());
		professor.setEmailDo(professorDto.getEmailDo());
		professor.setPostCode(professorDto.getPostCode());

		professorRepository.save(professor);
	}
	
	@Override
	public List<LectureDto> lectureList(String profNo, Integer year, String status) throws Exception {
		List<Lecture> lectureList=null;
		if(status.equals("ALL")) {
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
	public List<SubjectDto> subjectList(String majCd) throws Exception {
		List<Subject> subjectList = subjectRepository.findByMajor_majCd(majCd);
		List<SubjectDto> subjectDtoList = new ArrayList<SubjectDto>();
		for (Subject subject : subjectList) {
			subjectDtoList.add(subject.toSubjectDto());
		}
		return subjectDtoList;
	}
	
	@Override
	public String lectureWrite(LectureDto lectureDto) throws Exception {
		String year = String.valueOf(lectureDto.getYear()).substring(2);
		List<Lecture> lectureList = lectureRepository.findByLecNoStartsWith(lectureDto.getSubCd()+year);
		System.out.println(lectureList);
		System.out.println(lectureList.size());
		String lectureCnt = lectureList==null ? "01" : lectureList.size()+1 < 10 ? "0"+String.valueOf(lectureList.size()+1) : String.valueOf(lectureList.size()+1);
		
		lectureDto.setLecNo(lectureDto.getSubCd()+year+lectureCnt);
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
	public List<LectureDto> lectureDashboard(String profNo, Integer year, Integer semester) throws Exception {
		
		List<Lecture> lectureList = lectureRepository.findByProfessor_profNoAndYearAndStatusAndSemester(profNo, year, "APPR", semester);
		
		List<LectureDto> lectureDtoList = new ArrayList<LectureDto>();
		for (Lecture lecture : lectureList) {
			lectureDtoList.add(lecture.toLectureDto());
		}
		return lectureDtoList;
	}
	
	@Override
	public Map<String, Object> studentListAndLectureByStdList(String profNo, Integer year, String stdName)
			throws Exception {
		Map<String, Object> param = new HashedMap<String, Object>();
		String strYear = String.valueOf(year).substring(2);
		System.out.println(strYear+"학번");
		List<Student> stdList = new ArrayList<Student>();
		if(stdName=="") {
			stdList = studentRepository.findByProfessor_profNoAndStdNoStartsWith(profNo, strYear);
		} else { 
			stdList = studentRepository.findByProfessor_profNoAndStdNoStartsWithAndNameContaining(profNo, strYear, stdName);
		}
		
		List<StudentDto> studentList = new ArrayList<StudentDto>();
		
		for (Student std : stdList) {
			studentList.add(std.toStudentDto());
			List<LectureByStd> lectureByStdList= lectureByStdRepository.findByStudent_stdNo(std.getStdNo());
			List<LectureByStdDto> lectureByStdDtoList = new ArrayList<LectureByStdDto>();
			for (LectureByStd lectureByStd : lectureByStdList) {
				lectureByStdDtoList.add(lectureByStd.toLectureByStdDto());
			}
			param.put(std.getStdNo(), lectureByStdDtoList);
		}
		param.put("studentList", studentList);
		return param;
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
		List<Homework> homeworkList = homeworkRepository.findByLecture_lecNo(lecNo);
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
	public List<HomeworkSubmitDto> homeworkSubmitList(Integer hwNo) throws Exception {
		List<HomeworkSubmit> homeworkSubmitList = homeworkSubmitRepository.findByHomework_hwNo(hwNo);
		List<HomeworkSubmitDto> homeworkSubmitDtoList = new ArrayList<HomeworkSubmitDto>();
		for (HomeworkSubmit homeworkSubmit : homeworkSubmitList) {
			homeworkSubmitDtoList.add(homeworkSubmit.toHomeworkSubmitDto());
		}
		return homeworkSubmitDtoList;
	}
	
	@Override
	public void homeworkSubmitModify(List<HomeworkSubmitDto> homeworkSubmitDtoList) {
		for (HomeworkSubmitDto homeworkSubmitDto : homeworkSubmitDtoList) {
			homeworkSubmitRepository.save(homeworkSubmitDto.toHomeworkSubmit());
		}
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
	public List<AttendanceDto> attendanceList(String lecNo) throws Exception {
		List<Attendance> attendanceList = attendanceRepository.findByLecture_lecNo(lecNo);
		List<AttendanceDto> attendanceDtoList = new ArrayList<AttendanceDto>();
		for (Attendance attendance : attendanceList) {
			attendanceDtoList.add(attendance.toAttendanceDto());
		}
		return attendanceDtoList;
	}
	
	@Override
	public void attendanceModify(List<AttendanceDto> attendanceDtoList) throws Exception {
		for (AttendanceDto attendanceDto : attendanceDtoList) {
			attendanceRepository.save(attendanceDto.toAttendacne());
		}
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

	@Override
	public List<LectureByStdDto> studentListByLecNo(String lecNo) throws Exception {
		List<LectureByStd> lectureByStdList = lectureByStdRepository.findByLecture_lecNo(lecNo);
		List<LectureByStdDto> lectureByStdDtoList = new ArrayList<LectureByStdDto>();
		for (LectureByStd lectureByStd : lectureByStdList) {
			lectureByStdDtoList.add(lectureByStd.toLectureByStdDto());
		}
		return lectureByStdDtoList;
	}

	@Override
	public List<ExamResultDto> examResultListByLecNo(String lecNo) throws Exception {
		List<ExamResult> examResultList = examResultRepository.findByExam_Lecture_lecNo(lecNo);
		System.out.println(examResultList);
		List<ExamResultDto> examResultDtoList = new ArrayList<ExamResultDto>();
		for (ExamResult examResult : examResultList) {
			examResultDtoList.add(examResult.toExamResultDto());
		}
		return examResultDtoList;
	}

	@Override
	public List<HomeworkSubmitDto> homeworkSubmitListByLecNo(String lecNo) throws Exception {
		List<HomeworkSubmit> homeworkSubmitList = homeworkSubmitRepository.findByHomework_Lecture_lecNo(lecNo);
		List<HomeworkSubmitDto> homeworkSubmitDtoList = new ArrayList<HomeworkSubmitDto>();
		for (HomeworkSubmit homeworkSubmit : homeworkSubmitList) {
			homeworkSubmitDtoList.add(homeworkSubmit.toHomeworkSubmitDto());
		}
		return homeworkSubmitDtoList;
	}

	@Override
	public Integer homeworkCount(String lecNo) throws Exception {
		return homeworkRepository.countByLecture_lecNo(lecNo);
	}

	@Override
	public void examResultModify(List<ExamResultDto> examResultDtoList) throws Exception {
		for (ExamResultDto examResultDto : examResultDtoList) {
			if(examResultDto.getExamNo()==0) {
				examResultDto.setExamNo(examRepository.findByLecture_lecNoAndSect(examResultDto.getLecNo(), examResultDto.getSect()).get().getExamNo());
			}
			examResultRepository.save(examResultDto.toExamResult());
		}
	}

	@Override
	public List<LectureByStdDto> gradeWrite(List<LectureByStdDto> lectureByStuDtoList) throws Exception {
		Integer aplus = (int)Math.round(lectureByStuDtoList.size()*0.1);
		Integer a = (int)Math.round(lectureByStuDtoList.size()*0.2);
		Integer bplus = (int)Math.round(lectureByStuDtoList.size()*0.4);
		lectureByStuDtoList.sort(Comparator.comparingDouble(lectureByStdDto -> Float.parseFloat(((LectureByStdDto) lectureByStdDto).getGrade())).reversed());

        // 정렬 후 출력
        lectureByStuDtoList.forEach(System.out::println);
		
        for (int i = 0; i < lectureByStuDtoList.size(); i++) {
			if(i<aplus) {
				lectureByStuDtoList.get(i).setGrade("A+");
			}else if(aplus<=i && i<a+aplus) {
				lectureByStuDtoList.get(i).setGrade("A");
			}else if(a+aplus<=i && i<a+aplus+bplus) {
				lectureByStuDtoList.get(i).setGrade("B+");
			}else if(a+aplus+bplus<=i && i<a+aplus+bplus+aplus) {
				lectureByStuDtoList.get(i).setGrade("B");
			}else {
				lectureByStuDtoList.get(i).setGrade("C+");
			}
		}
        List<LectureByStdDto> newLectureByStdDtoList = new ArrayList<LectureByStdDto>();
        for (LectureByStdDto lectureByStdDto2 : lectureByStuDtoList) {
			lectureByStdRepository.save(lectureByStdDto2.toLectureByStd());
			newLectureByStdDtoList.add(lectureByStdRepository.findById(lectureByStdDto2.getLbsNo()).get().toLectureByStdDto());
		}
        return newLectureByStdDtoList;
	}

	@Override
	public List<AppealDto> appealList(String lecNo) throws Exception {
		List<Appeal> appealList = appealRepository.findByLecture_lecNo(lecNo);
		List<AppealDto> appealDtoList = new ArrayList<AppealDto>();
		for (Appeal appeal : appealList) {
			appealDtoList.add(appeal.toAppealDto());
		}
		return appealDtoList;
	}

	@Override
	public void appealModify(AppealDto appealDto) throws Exception {
		appealRepository.save(appealDto.toAppeal());
	}

	@Override
	public List<AbsenceDto> absenceList(String lecNo) throws Exception {
		List<Absence> absenceList = absenceRepository.findByLesson_Lecture_lecNo(lecNo);
		List<AbsenceDto> absenceDtoList = new ArrayList<AbsenceDto>();
		for (Absence absence : absenceList) {
			absenceDtoList.add(absence.toAbsencDto());
		}
		return absenceDtoList;
	}

	@Override
	public void absenceModify(AbsenceDto absenceDto) throws Exception {
		absenceRepository.save(absenceDto.toAbsence());
	}

	

	

	

	

	

	

	

	

	
}
