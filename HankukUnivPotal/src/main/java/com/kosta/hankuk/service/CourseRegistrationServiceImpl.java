package com.kosta.hankuk.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kosta.hankuk.dto.ColleageDto;
import com.kosta.hankuk.dto.MajorDto;
import com.kosta.hankuk.entity.Attendance;
import com.kosta.hankuk.entity.Colleage;
import com.kosta.hankuk.entity.Lecture;
import com.kosta.hankuk.entity.LectureBasket;
import com.kosta.hankuk.entity.LectureByStd;
import com.kosta.hankuk.entity.Major;
import com.kosta.hankuk.entity.Score;
import com.kosta.hankuk.entity.Student;
import com.kosta.hankuk.repository.AttendanceRepository;
import com.kosta.hankuk.repository.ColleageRepository;
import com.kosta.hankuk.repository.LectureBasketRepository;
import com.kosta.hankuk.repository.LectureByStdRepository;
import com.kosta.hankuk.repository.LectureRepository;
import com.kosta.hankuk.repository.MajorRepository;
import com.kosta.hankuk.repository.ScoreRepository;
import com.kosta.hankuk.repository.StudentRepository;

@Service
public class CourseRegistrationServiceImpl implements CourseRegistrationService {

	@Autowired
	private StudentRepository studentRepository;
	
	@Autowired
	private LectureByStdRepository lectureByStdRepository;
	
	@Autowired
	private LectureRepository lectureRepository;
	
	@Autowired
	private LectureBasketRepository lectureBasketRepository;
	
	@Autowired
	private ColleageRepository colleageRepository;
	
	@Autowired
	private MajorRepository majorRepository;
	
	@Autowired
	private ScoreRepository scoreRepository;
	
	@Autowired
	private AttendanceRepository attendanceRepository;

	@Override
	public Map<String, Object> loadStudentInformation(String stdNo) throws Exception {
		Student student = studentRepository.findById(stdNo).get();		
		String majorName = student.getMajor().getName();		
		Integer finSem = student.getFinSem();
		Integer finCredit = student.getFinCredit();
		Integer courYear = (finSem / 2) + 1;
		Integer semester = (finSem % 2) + 1;
		
		Map<String, Object> map = new HashMap<>();
		map.put("majorName", majorName);
		map.put("finCredit", finCredit);
		map.put("courYear", courYear);
		map.put("semester", semester);
		return map;
	}
	
	public List<Map<String, Object>> showCourseRegistration(String majCd, Integer targetGrd, Integer year, String stdNo) throws Exception {
		Integer finSem = studentRepository.findById(stdNo).get().getFinSem();
		Integer semester = (finSem % 2) + 1;
		List<Lecture> lectureList = lectureRepository.findBySubject_Major_majCdAndSubject_targetGrdAndYearAndSemester(majCd, targetGrd, year, semester);
		List<Map<String, Object>> mapList = new ArrayList<Map<String, Object>>();

		for (Lecture lecture : lectureList) {
			if(lecture.getStatus().equals("REQ") || lecture.getStatus().equals("REJ")) continue;
			String lectureName = lecture.getSubject().getName();
			String professorName = lecture.getProfessor().getName();
			String lectureNumber = lecture.getLecNo();
			Integer credit = lecture.getCredit();
			String firstTimeOfLecture = lecture.getTime1();
			String secondTimeOfLecture = lecture.getTime2();
			String LectureRoom = lecture.getLecRoom();
			Integer numOfStd = lecture.getNumOfStd();
			
			List<LectureByStd> lectureByStdList = lectureByStdRepository.findByLecture_lecNo(lectureNumber);
			Integer countOfStudent = lectureByStdList.size();	
			
			String type = "";
			String lectureType = lecture.getSubject().getType();
			String majorCode = lecture.getSubject().getMajor().getMajCd();
			if (majorCode == "BLS") {
				if (lectureType.equals("P")) {
					type = "교필";
				} else if (lectureType.equals("S")) {
					type = "교선";
				}
			} else {
				if (lectureType.equals("P")) {
					type = "전필";
				} else if (lectureType.equals("S")) {
					type = "전선";
				}
			}
			
			Boolean unvalidLecture = false;
			Optional<LectureByStd> optionalLectureByStd = lectureByStdRepository.findByStudent_stdNoAndLecture_lecNo(stdNo, lectureNumber);
			if(optionalLectureByStd.isPresent()) {
				unvalidLecture = true;
			}

			Map<String, Object> map = new HashMap<>();
			map.put("lectureName", lectureName);
			map.put("professorName", professorName);
			map.put("lectureNumber", lectureNumber);
			map.put("credit", credit);
			map.put("firstTimeOfLecture", firstTimeOfLecture);
			map.put("secondTimeOfLecture", secondTimeOfLecture);
			map.put("LectureRoom", LectureRoom);
			map.put("countOfStudent", countOfStudent);
			map.put("numOfStd", numOfStd);
			map.put("type", type);
			map.put("unvalidLecture", unvalidLecture);
			mapList.add(map);
		}
		return mapList;
	}
	
	public void registerForCourse(String stdNo, String lecNo) throws Exception {
		Integer finSem = studentRepository.findById(stdNo).get().getFinSem();
		Integer courYear = (finSem / 2) + 1;
		Optional<LectureByStd> optionalLectureByStd = lectureByStdRepository.findByStudent_stdNoAndLecture_lecNo(stdNo, lecNo);
		if(optionalLectureByStd.isEmpty()) {
			List<LectureByStd> lectureByStdGroup = lectureByStdRepository.findByLecture_lecNo(lecNo);
			Integer currentCount = lectureByStdGroup.size();
			Integer wholeCount = lectureRepository.findById(lecNo).get().getNumOfStd();
			if(wholeCount > currentCount) {
				LectureByStd lectureByStd = LectureByStd.builder()
						.courYear(courYear)
						.isDrop(false)
						.student(Student.builder().stdNo(stdNo).build())
						.lecture(Lecture.builder().lecNo(lecNo).build()).build();
				lectureByStdRepository.save(lectureByStd);
				Attendance attendance = Attendance.builder()
						.student(Student.builder().stdNo(stdNo).build())
						.lecture(Lecture.builder().lecNo(lecNo).build())
						.build();
				attendanceRepository.save(attendance);
			}
		}
	}
	
	public List<Map<String, Object>> showCourseRegistrationConfirmation(String stdNo) throws Exception {
		List<Map<String, Object>> mapList = new ArrayList<Map<String, Object>>();
		Integer finSem = studentRepository.findById(stdNo).get().getFinSem();
		Integer courYear = (finSem / 2) + 1;
		Integer semester = (finSem % 2) + 1;
		
		List<LectureByStd> lectureByStdGroup = lectureByStdRepository.findByStudent_stdNoAndCourYearAndLecture_semester(stdNo, courYear, semester);
		for(LectureByStd lectureByStd : lectureByStdGroup) {
			Lecture lecture = lectureByStd.getLecture();
			Integer lbsNumber = lectureByStd.getLbsNo();
			String lectureName = lecture.getSubject().getName();
			String professorName = lecture.getProfessor().getName();
			String lectureNumber = lecture.getLecNo();
			Integer credit = lecture.getCredit();
			String firstTimeOfLecture = lecture.getTime1();
			String secondTimeOfLecture = lecture.getTime2();
			String LectureRoom = lecture.getLecRoom();
			Integer numOfStd = lecture.getNumOfStd();
			
			List<LectureByStd> lectureByStdList = lectureByStdRepository.findByLecture_lecNo(lectureNumber);
			Integer countOfStudent = lectureByStdList.size();	
			
			String type = "";
			String lectureType = lecture.getSubject().getType();
			String majorCode = lecture.getSubject().getMajor().getMajCd();
			if (majorCode == "BLS") {
				if (lectureType.equals("P")) {
					type = "교필";
				} else if (lectureType.equals("S")) {
					type = "교선";
				}
			} else {
				if (lectureType.equals("P")) {
					type = "전필";
				} else if (lectureType.equals("S")) {
					type = "전선";
				}
			}
			
			Map<String, Object> map = new HashMap<>();
			map.put("lbsNumber", lbsNumber);
			map.put("lectureName", lectureName);
			map.put("professorName", professorName);
			map.put("lectureNumber", lectureNumber);
			map.put("credit", credit);
			map.put("firstTimeOfLecture", firstTimeOfLecture);
			map.put("secondTimeOfLecture", secondTimeOfLecture);
			map.put("LectureRoom", LectureRoom);
			map.put("countOfStudent", countOfStudent);
			map.put("numOfStd", numOfStd);
			map.put("type", type);
			mapList.add(map);
		}
		return mapList;
	}
	
	public void removeCourseRegistration(Integer lbsNo) throws Exception {
		lectureByStdRepository.deleteById(lbsNo);
	}
	
	public List<Map<String, Object>> showPreRegistration(String stdNo) throws Exception {
		List<Map<String, Object>> mapList = new ArrayList<Map<String, Object>>();
		List<LectureBasket> lectureBasketGroup = lectureBasketRepository.findByStudent_stdNo(stdNo);
		
		for(LectureBasket lectureBasket : lectureBasketGroup) {
			Lecture lecture = lectureRepository.findById(lectureBasket.getLecture().getLecNo()).get();
			Integer lbNumber = lectureBasket.getLbNo();
			String lectureName = lecture.getSubject().getName();
			String professorName = lecture.getProfessor().getName();
			String lectureNumber = lecture.getLecNo();
			Integer credit = lecture.getCredit();
			String firstTimeOfLecture = lecture.getTime1();
			String secondTimeOfLecture = lecture.getTime2();
			String LectureRoom = lecture.getLecRoom();
			Integer numOfStd = lecture.getNumOfStd();
			
			List<LectureByStd> lectureByStdList = lectureByStdRepository.findByLecture_lecNo(lectureNumber);
			Integer countOfStudent = lectureByStdList.size();	
			
			String type = "";
			String lectureType = lecture.getSubject().getType();
			String majorCode = lecture.getSubject().getMajor().getMajCd();
			if (majorCode == "BLS") {
				if (lectureType.equals("P")) {
					type = "교필";
				} else if (lectureType.equals("S")) {
					type = "교선";
				}
			} else {
				if (lectureType.equals("P")) {
					type = "전필";
				} else if (lectureType.equals("S")) {
					type = "전선";
				}
			}
			
			Map<String, Object> map = new HashMap<>();
			map.put("lbNumber", lbNumber);
			map.put("lectureName", lectureName);
			map.put("professorName", professorName);
			map.put("lectureNumber", lectureNumber);
			map.put("credit", credit);
			map.put("firstTimeOfLecture", firstTimeOfLecture);
			map.put("secondTimeOfLecture", secondTimeOfLecture);
			map.put("LectureRoom", LectureRoom);
			map.put("countOfStudent", countOfStudent);
			map.put("numOfStd", numOfStd);
			map.put("type", type);
			mapList.add(map);
		}
		return mapList;
	}
	
	public void preRegisterCourse(String stdNo, String lecNo) throws Exception {
		LectureBasket lectureBasket = LectureBasket.builder()
				.student(Student.builder().stdNo(stdNo).build())
				.lecture(Lecture.builder().lecNo(lecNo).build()).build();
		lectureBasketRepository.save(lectureBasket);
	}
	
	public void removePreRegistration(Integer lbNo) throws Exception {
		lectureBasketRepository.deleteById(lbNo);
	}
	
	public List<ColleageDto> showCollege() throws Exception {
		List<Colleage> originCollegeList = colleageRepository.findAll();
		List<ColleageDto> collegeList = new ArrayList<>();
		for(Colleage college : originCollegeList) {
			ColleageDto collegeDto = college.toColleageDto();
			collegeList.add(collegeDto);
		}
		return collegeList;
	}
	
	public List<MajorDto> showMajor(String colCd) throws Exception {
		List<Major> originMajorList = majorRepository.findByColleageColCd(colCd);
		List<MajorDto> majorList = new ArrayList<>();
		for(Major major : originMajorList) {
			MajorDto majorDto = major.toMajorDto();
			majorList.add(majorDto);
		}
		return majorList;
	}
	
	public List<Map<String, Object>> showWholeCourses(String stdNo, Integer year) throws Exception {
		Integer finSem = studentRepository.findById(stdNo).get().getFinSem();
		Integer semester = (finSem % 2) + 1;
		List<Lecture> lectureList = lectureRepository.findByYearAndSemester(year, semester);
		List<Map<String, Object>> mapList = new ArrayList<Map<String, Object>>();

		for (Lecture lecture : lectureList) {
			if(lecture.getStatus().equals("REQ") || lecture.getStatus().equals("REJ")) continue;			
			String lectureName = lecture.getSubject().getName();
			String professorName = lecture.getProfessor().getName();
			String lectureNumber = lecture.getLecNo();
			Integer credit = lecture.getCredit();
			String firstTimeOfLecture = lecture.getTime1();
			String secondTimeOfLecture = lecture.getTime2();
			String LectureRoom = lecture.getLecRoom();
			Integer numOfStd = lecture.getNumOfStd();
			
			List<LectureByStd> lectureByStdList = lectureByStdRepository.findByLecture_lecNo(lectureNumber);
			Integer countOfStudent = lectureByStdList.size();	
			
			String type = "";
			String lectureType = lecture.getSubject().getType();
			String majorCode = lecture.getSubject().getMajor().getMajCd();
			if (majorCode == "BLS") {
				if (lectureType.equals("P")) {
					type = "교필";
				} else if (lectureType.equals("S")) {
					type = "교선";
				}
			} else {
				if (lectureType.equals("P")) {
					type = "전필";
				} else if (lectureType.equals("S")) {
					type = "전선";
				}
			}
			
			Boolean unvaildLecture = false;
			Optional<LectureByStd> optionalLectureByStd = lectureByStdRepository.findByStudent_stdNoAndLecture_lecNo(stdNo, lectureNumber);
			if(optionalLectureByStd.isPresent()) {
				unvaildLecture = true;
			}

			Map<String, Object> map = new HashMap<>();
			map.put("lectureName", lectureName);
			map.put("professorName", professorName);
			map.put("lectureNumber", lectureNumber);
			map.put("credit", credit);
			map.put("firstTimeOfLecture", firstTimeOfLecture);
			map.put("secondTimeOfLecture", secondTimeOfLecture);
			map.put("LectureRoom", LectureRoom);
			map.put("countOfStudent", countOfStudent);
			map.put("numOfStd", numOfStd);
			map.put("type", type);
			map.put("unvaildLecture", unvaildLecture);
			mapList.add(map);
		}
		return mapList;
	}
	
	public List<Map<String, Object>> searhCourses(String majCd, Integer targetGrd, String searchType, String searchWord, String stdNo, Integer year) throws Exception {
		List<Map<String, Object>> mapList = new ArrayList<Map<String, Object>>();
		Integer finSem = studentRepository.findById(stdNo).get().getFinSem();
		Integer semester = (finSem % 2) + 1;
		List<Lecture> lectureList = new ArrayList<>();
		if(majCd.equals("") && targetGrd == 0) {
			lectureList = lectureRepository.findByYearAndSemester(year, semester);
		} else {
			lectureList = lectureRepository.findBySubject_Major_majCdAndSubject_targetGrdAndYearAndSemester(majCd, targetGrd, year, semester);
		}		
		
		for (Lecture lecture : lectureList) {
			if(searchType.equals("name")) {
				if(!(lecture.getSubject().getName().contains(searchWord))) continue;
			} else if(searchType.equals("type")) {
				if(!(lecture.getSubject().getType().contains(searchWord))) continue;
			} else if(searchType.equals("code")) {
				if(!(lecture.getLecNo().contains(searchWord))) continue;
			} else if(searchType.equals("professorName")) {
				if(!(lecture.getProfessor().getName().contains(searchWord))) continue;
			}
			
			String lectureName = lecture.getSubject().getName();
			String professorName = lecture.getProfessor().getName();
			String lectureNumber = lecture.getLecNo();
			Integer credit = lecture.getCredit();
			String firstTimeOfLecture = lecture.getTime1();
			String secondTimeOfLecture = lecture.getTime2();
			String LectureRoom = lecture.getLecRoom();
			Integer numOfStd = lecture.getNumOfStd();
			
			List<LectureByStd> lectureByStdList = lectureByStdRepository.findByLecture_lecNo(lectureNumber);
			Integer countOfStudent = lectureByStdList.size();	
			
			String type = "";
			String lectureType = lecture.getSubject().getType();
			String majorCode = lecture.getSubject().getMajor().getMajCd();
			if (majorCode == "BLS") {
				if (lectureType.equals("P")) {
					type = "교필";
				} else if (lectureType.equals("S")) {
					type = "교선";
				}
			} else {
				if (lectureType.equals("P")) {
					type = "전필";
				} else if (lectureType.equals("S")) {
					type = "전선";
				}
			}

			Map<String, Object> map = new HashMap<>();
			map.put("lectureName", lectureName);
			map.put("professorName", professorName);
			map.put("lectureNumber", lectureNumber);
			map.put("credit", credit);
			map.put("firstTimeOfLecture", firstTimeOfLecture);
			map.put("secondTimeOfLecture", secondTimeOfLecture);
			map.put("LectureRoom", LectureRoom);
			map.put("countOfStudent", countOfStudent);
			map.put("numOfStd", numOfStd);
			map.put("type", type);
			mapList.add(map);
		}
		return mapList;
	}
	
	public Map<String, Object> checkConfirmationCount(String stdNo) throws Exception {
		Student student = studentRepository.findById(stdNo).get();
		Integer finSem = student.getFinSem();
		Integer year = (finSem / 2) + 1;
		Integer semester = (finSem % 2) + 1;
		List<LectureByStd> lectureByStdGroup = lectureByStdRepository
				.findByStudent_stdNoAndCourYearAndLecture_semester(stdNo, year, semester);
		
		Integer countOfLecture = 0;
		Integer maximumOfCredit = 0;
		Integer wholeCredit = 0;		
		countOfLecture = lectureByStdGroup.size();
		
		Integer previousFinSem = student.getFinSem() - 1;
		Integer previousYear = (previousFinSem / 2) + 1;
		Integer previousSemester = (previousFinSem % 2) + 1;
		
		Optional<Score> optionalScore = scoreRepository.findByStudent_stdNoAndYearAndSemester(stdNo, previousYear, previousSemester);
		if(optionalScore.isPresent()) {
			if(optionalScore.get().getScore() >= 3.75) {
				maximumOfCredit = 24;
			}
		} else {
			maximumOfCredit = 21;
		}

		for (LectureByStd lectureByStd : lectureByStdGroup) {
			wholeCredit += lectureByStd.getLecture().getCredit();
		}
		
		Map<String, Object> map = new HashMap<>();
		map.put("countOfLecture", countOfLecture);
		map.put("maximumOfCredit", maximumOfCredit);
		map.put("wholeCredit", wholeCredit);
		return map;
	}
}
