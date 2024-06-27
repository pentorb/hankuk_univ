package com.kosta.hankuk.service;

import java.io.File;
import java.sql.Date;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.kosta.hankuk.dto.HuehakAndBokhakDto;
import com.kosta.hankuk.dto.HuehakDto;
import com.kosta.hankuk.dto.LectureByStdDto;
import com.kosta.hankuk.dto.StudentDto;
import com.kosta.hankuk.entity.Absence;
import com.kosta.hankuk.entity.Appeal;
import com.kosta.hankuk.entity.Attendance;
import com.kosta.hankuk.entity.Files;
import com.kosta.hankuk.entity.Homework;
import com.kosta.hankuk.entity.HomeworkSubmit;
import com.kosta.hankuk.entity.Huehak;
import com.kosta.hankuk.entity.HuehakAndBokhak;
import com.kosta.hankuk.entity.Lecture;
import com.kosta.hankuk.entity.LectureByStd;
import com.kosta.hankuk.entity.Lesson;
import com.kosta.hankuk.entity.LessonData;
import com.kosta.hankuk.entity.Score;
import com.kosta.hankuk.entity.Student;
import com.kosta.hankuk.repository.AbsenceRepository;
import com.kosta.hankuk.repository.AppealRepository;
import com.kosta.hankuk.repository.AttendanceRepository;
import com.kosta.hankuk.repository.FilesRepository;
import com.kosta.hankuk.repository.HomeworkRepository;
import com.kosta.hankuk.repository.HomeworkSubmitRepository;
import com.kosta.hankuk.repository.HueAndBokRepository;
import com.kosta.hankuk.repository.HuehakRepository;
import com.kosta.hankuk.repository.LectureByStdRepository;
import com.kosta.hankuk.repository.LectureRepository;
import com.kosta.hankuk.repository.LessonDataRepository;
import com.kosta.hankuk.repository.LessonRepository;
import com.kosta.hankuk.repository.MajorRepository;
import com.kosta.hankuk.repository.ScoreRepository;
import com.kosta.hankuk.repository.StudentRepository;
import com.kosta.hankuk.util.PageInfo;

@Service
public class StudentServiceImpl implements StudentService {

	@Autowired
	private HuehakRepository hueRes;
	@Autowired
	private HueAndBokRepository hbRes;
	@Autowired
	private MajorRepository mres;
	@Autowired
	private StudentRepository sres;
	@Autowired
	private LectureByStdRepository lectureByStdRepository;
	@Autowired
	private ScoreRepository scoreRepository;
	@Autowired
	private FilesRepository filesRepository;
	@Autowired
	private AppealRepository appealRepository;
	@Autowired
	private LectureRepository lectureRepository;
	@Autowired
	private HomeworkRepository homeworkRepository;
	@Autowired
	private HomeworkSubmitRepository homeworkSubmitRepository;
	@Autowired
	private AttendanceRepository attendanceRepository;
	@Autowired
	private AbsenceRepository absenceRepository;
	@Autowired
	private LessonRepository lessonRepository;
	@Autowired
	private LessonDataRepository lessonDataRepository;
	@Autowired
    PasswordEncoder passwordEncoder;

	@Value("${upload.path}")
	private String uploadPath;

	@Override // 비번 맞는지 확인
	public Boolean checkPassword(String stdNo, String inputPw) throws Exception {
		String encodePw = sres.findById(stdNo).get().getPassword();
		System.out.println("encodePW"+ encodePw);
		System.out.println("inpputPW"+inputPw);
		
		if(passwordEncoder.matches(inputPw, encodePw)){
        	return true;
        }else{
        	return false;
        }
	}
	
	@Override
	public void resetPW(String stdNo, String tel) throws Exception {
		Student std = sres.findById(stdNo).get(); 
		
		if (tel.equals(std.getTel())){
			std.setPassword(passwordEncoder.encode("0000"));
			sres.save(std);
		} else {
			System.out.println("비밀번호 틀림");
		}
	}
	
	@Override
	public void updatePw(String stdNo, String newPw) throws Exception {
		Student std = sres.findById(stdNo).get();
		std.setPassword(passwordEncoder.encode(newPw));
		sres.save(std);
	}
	
	@Override
	public void stdInfoModify(StudentDto stdDto) throws Exception{
		Student std = sres.findById(stdDto.getId()).get();
		
		System.out.println(stdDto);
		std.setAddr(stdDto.getAddr());
		std.setDetailAddr(stdDto.getDetailAddr());
		std.setTel(stdDto.getTel());
		std.setEmail(stdDto.getEmail());
		std.setEmail(stdDto.getEmailDo());
		std.setPostCode(stdDto.getPostCode());
		
		sres.save(std);
	}
	
	@Override
	public void hueInsert(HuehakDto hueDto) throws Exception {
		Huehak huehak = hueDto.toHuehak();
		System.out.println(huehak);
		hueRes.save(huehak);
	}

	// 휴학 신청 상세보기
	@Override
	public HuehakDto huehakDetail(Integer hueNo) throws Exception {
		HuehakDto huehak = hueRes.findById(hueNo).get().toHuehakDto();
		System.out.println("serivce :" + huehak);

		String year = huehak.getHueSem().substring(0, 4); // "2024"
		String semester = huehak.getHueSem().substring(4); // "02"

		huehak.setYear(year);
		huehak.setSem(semester);

		return huehak;
	}
	
	@Override
	public void BokhakModify(HuehakAndBokhakDto habDto) throws Exception{
		HuehakAndBokhak huebok = hbRes.findById(habDto.getHabNo()).get();
		huebok.setStatus("B");
		hbRes.save(huebok);
	}

	@Override // 복학 내역 조회
	public List<HuehakAndBokhakDto> HueBokList(PageInfo pageInfo, String stdNo, String type) throws Exception {
		PageRequest pageRequest = PageRequest.of(pageInfo.getCurPage() - 1, 4, Sort.by(Sort.Direction.DESC, "habNo"));
		Page<HuehakAndBokhak> pages = null;

		if (type == null || type.trim().isEmpty()) {
			pages = hbRes.findByStudent_StdNo(stdNo, pageRequest);
		} else {
			pages = hbRes.findByStudent_StdNoAndType(stdNo, type, pageRequest);
		}

		pageInfo.setAllPage(pages.getTotalPages());

		int startPage = (pageInfo.getCurPage() - 1) / 1 * 10 + 1;
		int endPage = Math.min(startPage + 10 - 1, pageInfo.getAllPage());

		pageInfo.setStartPage(startPage);
		pageInfo.setEndPage(endPage);

		List<HuehakAndBokhakDto> hbDtoList = new ArrayList<HuehakAndBokhakDto>();
		for (HuehakAndBokhak hb : pages.getContent()) {
			hbDtoList.add(hb.toLeaveAndReturnDto());
		}

		return hbDtoList;
	}

	// 학번으로 휴학 신청 내역
	@Override
	public List<HuehakDto> hueListByStdNo(PageInfo pageInfo, String stdNo, String status, String type)
			throws Exception {

		PageRequest pageRequest = PageRequest.of(pageInfo.getCurPage() - 1, 4, Sort.by(Sort.Direction.DESC, "hueNo"));
		Page<Huehak> pages = null;

		if ((type == null || type.trim().isEmpty()) && (status == null || status.trim().isEmpty())) {
			pages = hueRes.findByStudent_StdNo(stdNo, pageRequest);
		} else if ((type == null || type.trim().isEmpty())) {
			pages = hueRes.findByStudent_StdNoAndStatus(stdNo, status, pageRequest);
		} else if ((status == null || status.trim().isEmpty())) {
			pages = hueRes.findByStudent_StdNoAndType(stdNo, type, pageRequest);
		} else {
			pages = hueRes.findByStudent_StdNoAndStatusAndType(stdNo, status, type, pageRequest);
		}

		pageInfo.setAllPage(pages.getTotalPages());

		int startPage = (pageInfo.getCurPage() - 1) / 1 * 10 + 1;
		int endPage = Math.min(startPage + 10 - 1, pageInfo.getAllPage());

		pageInfo.setStartPage(startPage);
		pageInfo.setEndPage(endPage);

		List<HuehakDto> hueDtoList = new ArrayList<HuehakDto>();
		for (Huehak hue : pages.getContent()) {
			hueDtoList.add(hue.toHuehakDto());
		}
		return hueDtoList;
	}

	@Override
	public List<Map<String, Object>> checkGrade(String stdNo, Integer year, Integer semester) throws Exception {
		List<LectureByStd> lectureByStdGroup = lectureByStdRepository
				.findByStudent_stdNoAndCourYearAndLecture_semester(stdNo, year, semester);
		List<Map<String, Object>> mapList = new ArrayList<Map<String, Object>>();

		for (LectureByStd lectureByStd : lectureByStdGroup) {
			String lectureName = lectureByStd.getLecture().getSubject().getName();
			String professorName = lectureByStd.getLecture().getProfessor().getName();
			String grade = lectureByStd.getGrade();
			String lectureNumber = lectureByStd.getLecture().getLecNo();
			Boolean isDrop = lectureByStd.getIsDrop();

			Map<String, Object> map = new HashMap<>();
			map.put("lectureName", lectureName);
			map.put("professorName", professorName);
			map.put("grade", grade);
			map.put("lectureNumber", lectureNumber);
			map.put("isDrop", isDrop);
			mapList.add(map);
		}
		return mapList;
	}

	@Override
	public Map<String, Object> checkScore(String stdNo, Integer year, Integer semester) throws Exception {
		Map<String, Object> map = new HashMap<>();
		List<LectureByStd> lectureByStdGroup = lectureByStdRepository
				.findByStudent_stdNoAndCourYearAndLecture_semester(stdNo, year, semester);
		
		String majCd = sres.findById(stdNo).get().getMajor().getMajCd();
		Integer finSem = sres.findById(stdNo).get().getFinSem();
		Integer semesterCredit = 0;
		Integer majorCredit = 0;
		for (LectureByStd lectureByStd : lectureByStdGroup) {
			semesterCredit += lectureByStd.getLecture().getCredit();
			if (lectureByStd.getLecture().getSubject().getSubCd().substring(0, 2) != "BLS") {
				majorCredit += lectureByStd.getLecture().getCredit();
			}
		}
		
		List<Student> studentList = sres.findByMajor_majCdAndFinSem(majCd, finSem);
		Integer studentCount = studentList.size();
		Map<String, Double> scoreMap = new HashMap<>();
		List<Double> scoreList = new ArrayList<>();
		
		for(Student student : studentList) {
			List<LectureByStd> lectureByStdGroupForOne = lectureByStdRepository
					.findByStudent_stdNoAndCourYearAndLecture_semester(student.getStdNo(), year, semester);
			Double wholeScore = 0.0;
			
			for(LectureByStd lectureByStd : lectureByStdGroupForOne) {
				if(lectureByStd.getGrade() != null){
					if(lectureByStd.getGrade().equals("A+")) {
						wholeScore += 4.5 * lectureByStd.getLecture().getCredit();
					} else if(lectureByStd.getGrade().equals("A")) {
						wholeScore += 4.0 * lectureByStd.getLecture().getCredit();
					} else if(lectureByStd.getGrade().equals("B+")) {
						wholeScore += 3.5 * lectureByStd.getLecture().getCredit();
					} else if(lectureByStd.getGrade().equals("B")) {
						wholeScore += 3.0 * lectureByStd.getLecture().getCredit();
					} else if(lectureByStd.getGrade().equals("C+")) {
						wholeScore += 2.5 * lectureByStd.getLecture().getCredit();
					}
				}				
			}
			
			Double score = Math.round((wholeScore / semesterCredit) * 100) / 100.0;
			scoreMap.put(student.getStdNo(), score);
			scoreList.add(score);
		}
		
		Collections.sort(scoreList, Collections.reverseOrder());
		Double point = scoreMap.get(stdNo);
		Integer rank = scoreList.indexOf(point) + 1;
		
		if(!Double.isNaN(point)) {
			Optional<Score> optionalScore = scoreRepository.findByStudent_stdNoAndYearAndSemester(stdNo, year, semester);
			if(optionalScore.isEmpty()) {
				Score newScore = Score.builder()
						.getCredit(semesterCredit)
						.rank(rank)
						.score(point)
						.year(year)
						.semester(semester)
						.student(Student.builder().stdNo(stdNo).build()).build();
				scoreRepository.save(newScore);
			} else {
				Score outdatedScore = optionalScore.get();
				outdatedScore.setGetCredit(semesterCredit);
				outdatedScore.setRank(rank);
				outdatedScore.setScore(point);
				scoreRepository.save(outdatedScore);
			}
		}
		
		map.put("majorCredit", majorCredit);
		map.put("semesterCredit", semesterCredit);
		map.put("rank", rank);
		map.put("studentCount", studentCount);
		map.put("point", point);
		return map;
	}

	@Override // 학생이 수강하는 강의 리스트 (학기별)
	public List<LectureByStdDto> lecListByStdNo(String stdNo, Integer courYear, Integer semester) throws Exception {
		List<LectureByStd> lbsList = lectureByStdRepository.findByStudent_stdNoAndCourYearAndLecture_semester(stdNo,courYear, semester);
		List<LectureByStdDto> lbsDtoList = new ArrayList<>();
		for (LectureByStd lbs : lbsList) {
			LectureByStdDto lbsDto = lbs.toLectureByStdDto();
			String subName = lbs.getLecture().getSubject().getName();
			
			lbsDto.setSubName(subName);
			
			lbsDtoList.add(lbsDto);
		}
		return lbsDtoList;
	}

	@Override
	public Map<String, Object> loadLectureInformation(String stdNo, String lecNo) throws Exception {
		Map<String, Object> map = new HashMap<>();
		LectureByStd lectureByStd = lectureByStdRepository.findByStudent_stdNoAndLecture_lecNo(stdNo, lecNo).get();

		String lectureName = lectureByStd.getLecture().getSubject().getName();
		String professorName = lectureByStd.getLecture().getProfessor().getName();
		map.put("lectureName", lectureName);
		map.put("professorName", professorName);
		return map;
	}

	@Override
	public Integer makeAppeal(String stdNo, String lecNo, String content, MultipartFile file) throws Exception {
		String fileNo = "";
		if (file != null && !file.isEmpty()) {
			Files attachedFile = Files.builder().name(file.getOriginalFilename()).directory(uploadPath)
					.size(file.getSize()).contenttype(file.getContentType()).build();
			filesRepository.save(attachedFile);
			File upFile = new File(uploadPath, attachedFile.getFileNo() + "");
			file.transferTo(upFile);
			fileNo = attachedFile.getFileNo() + "";
		}
		Appeal appeal = Appeal.builder().content(content).files(fileNo).lecture(Lecture.builder().lecNo(lecNo).build())
				.student(Student.builder().stdNo(stdNo).build()).build();
		appealRepository.save(appeal);
		return appeal.getAppNo();
	}

	public List<Map<String, Object>> checkAppealList(String stdNo, Integer year, Integer semester) throws Exception {
		List<LectureByStd> lectureByStdGroup = lectureByStdRepository
				.findByStudent_stdNoAndCourYearAndLecture_semester(stdNo, year, semester);
		List<Appeal> appealList = new ArrayList<>();

		for (LectureByStd lectureByStd : lectureByStdGroup) {
			String lecNo = lectureByStd.getLecture().getLecNo();
			List<Appeal> appealByOneLecture = appealRepository.findByStudent_stdNoAndLecture_lecNo(stdNo, lecNo);
			if (appealByOneLecture != null) {
				for (Appeal appeal : appealByOneLecture)
					appealList.add(appeal);
			}
		}

		List<Map<String, Object>> mapList = new ArrayList<Map<String, Object>>();

		for (Appeal selectedAppeal : appealList) {
			Integer appNo = selectedAppeal.getAppNo();
			String lectureName = selectedAppeal.getLecture().getSubject().getName();
			String professorName = selectedAppeal.getLecture().getProfessor().getName();
			String grade = lectureByStdRepository.findByStudent_stdNoAndLecture_lecNo(
					selectedAppeal.getStudent().getStdNo(), selectedAppeal.getLecture().getLecNo()).get().getGrade();
			Integer credit = selectedAppeal.getLecture().getCredit();
			Date reqDt = selectedAppeal.getReqDt();
			String status = selectedAppeal.getStatus();

			Map<String, Object> map = new HashMap<>();
			map.put("appNo", appNo);
			map.put("lectureName", lectureName);
			map.put("professorName", professorName);
			map.put("grade", grade);
			map.put("credit", credit);
			map.put("reqDt", reqDt);
			map.put("status", status);
			mapList.add(map);
		}
		return mapList;
	}

	@Override
	public Map<String, Object> appealDetail(Integer appNo) throws Exception {
		Optional<Appeal> oappeal = appealRepository.findById(appNo);
		if (oappeal.isEmpty())
			throw new Exception("글번호 오류");
		Appeal appeal = oappeal.get();

		String lectureNumber = appeal.getLecture().getLecNo();
		String lectureName = appeal.getLecture().getSubject().getName();
		String professorName = appeal.getLecture().getProfessor().getName();
		String grade = lectureByStdRepository
				.findByStudent_stdNoAndLecture_lecNo(appeal.getStudent().getStdNo(), appeal.getLecture().getLecNo()).get()
				.getGrade();
		appealRepository.save(appeal);

		String fileName = "";
		if (appeal.getFiles() != null && !appeal.getFiles().trim().equals("")) {
			Files files = filesRepository.findById(Integer.parseInt(appeal.getFiles())).get();
			fileName = files.getName();
		}

		String status = appeal.getStatus();
		String content = appeal.getContent();
		String answer = appeal.getAnswer();
		Date reqDt = appeal.getReqDt();

		Map<String, Object> map = new HashMap<>();
		map.put("lectureNumber", lectureNumber);
		map.put("fileName", fileName);
		map.put("lectureName", lectureName);
		map.put("professorName", professorName);
		map.put("grade", grade);
		map.put("status", status);
		map.put("content", content);
		map.put("answer", answer);
		map.put("reqDt", reqDt);

		return map;
	}

	@Override
	public void modifyAppeal(Integer appNo, String content, MultipartFile file) throws Exception {
		Appeal appeal = appealRepository.findById(appNo).get();
		if (file != null && !file.isEmpty()) {
			Files attachedFile = Files.builder().name(file.getOriginalFilename()).directory(uploadPath)
					.size(file.getSize()).contenttype(file.getContentType()).build();
			filesRepository.save(attachedFile);
			File upFile = new File(uploadPath, attachedFile.getFileNo() + "");
			file.transferTo(upFile);
			String fileNo = attachedFile.getFileNo() + "";
			appeal.setFiles(fileNo);
		}
		if (content != null && !content.isEmpty()) {
			appeal.setContent(content);
		}
		appealRepository.save(appeal);
	}

	public List<Map<String, Object>> showLectureList(String stdNo) throws Exception {
		Integer finSem = sres.findById(stdNo).get().getFinSem();
		Integer courYear = (finSem / 2) + 1;
		Integer semester = (finSem % 2) + 1;
		List<LectureByStd> lectureByStdGroup = lectureByStdRepository
				.findByStudent_stdNoAndCourYearAndLecture_semester(stdNo, courYear, semester);
		List<Map<String, Object>> mapList = new ArrayList<Map<String, Object>>();

		for (LectureByStd lectureByStd : lectureByStdGroup) {
			String lecNo = lectureByStd.getLecture().getLecNo();
			String lectureName = lectureByStd.getLecture().getSubject().getName();
			String lectureRoom = lectureByStd.getLecture().getLecRoom();
			String professorName = lectureByStd.getLecture().getProfessor().getName();
			String time1 = lectureByStd.getLecture().getTime1();
			String time2 = lectureByStd.getLecture().getTime2();
			String now = String.format("%d-0%d", lectureByStd.getLecture().getYear(), lectureByStd.getLecture().getSemester());
			
			Map<String, Object> map = new HashMap<>();
			map.put("lecNo", lecNo);
			map.put("lectureName", lectureName);
			map.put("lectureRoom", lectureRoom);
			map.put("professorName", professorName);
			map.put("time1", time1);
			map.put("time2", time2);
			map.put("now", now);
			mapList.add(map);
		}
		return mapList;
	}

	@Override
	public List<Map<String, Object>> showLectureContent(String lecNo, String stdNo) throws Exception {
		List<Map<String, Object>> mapList = new ArrayList<Map<String, Object>>();
		Attendance attendance = attendanceRepository.findByLecture_lecNoAndStudent_stdNo(lecNo, stdNo);
		String wholeStatus = attendance.getStatus();
		List<Lesson> lessonList = attendance.getLecture().getLessonList();

		for (int i = 0; i < lessonList.size() - 2; i += 2) {
			Integer lessonNo = lessonList.get(i).getLessonNo();
			Integer week = lessonList.get(i).getWeek();
			String twoCharacterWeek = String.valueOf(lessonList.get(i).getWeek());
			if(twoCharacterWeek.length() == 1) {
				twoCharacterWeek = '0' + twoCharacterWeek;
			}
			
			Integer count = lessonList.get(i).getLessonCnt();
			String videoFile = "";
			String videoName = "";
			
			Integer lessonNo2 = lessonList.get(i + 1).getLessonNo();
			Integer count2 = lessonList.get(i + 1).getLessonCnt();
			String videoFile2 = "";
			String videoName2 = "";
			
			if(lessonList.get(i).getVideoFile() != null) {
				videoFile = lessonList.get(i).getVideoFile();
				videoName = filesRepository.findById(Integer.parseInt(videoFile)).get().getName();
			}
			
			if(lessonList.get(i + 1).getVideoFile() != null) {
				videoFile2 = lessonList.get(i + 1).getVideoFile();
				videoName2 = filesRepository.findById(Integer.parseInt(videoFile2)).get().getName();
			}
			
			String status = "";
			if(wholeStatus.substring(i, i + 1).equals("1")) {
				status = "출석";
			} else if(wholeStatus.substring(i, i + 1).equals("2")) {
				status = "지각";
			} else if(wholeStatus.substring(i, i + 1).equals("3")) {
				status = "결석";
			} else if(wholeStatus.substring(i, i + 1).equals("4")) {
				status = "공결";
			}
			
			String status2 = "";
			if(wholeStatus.substring(i + 1, i + 2).equals("1")) {
				status2 = "출석";
			} else if(wholeStatus.substring(i + 1, i + 2).equals("2")) {
				status2 = "지각";
			} else if(wholeStatus.substring(i + 1, i + 2).equals("3")) {
				status2 = "결석";
			} else if(wholeStatus.substring(i + 1, i + 2).equals("4")) {
				status2 = "공결";
			}
			
			String homeworkTitle = "";
			String homeworkFile = "";
			String materialTitle = "";
			String materialFile = "";
			Integer homeworkNumber = 0;
			
			Optional<Homework> optionalHomework = homeworkRepository.findByLesson_lessonNo(lessonNo);
			if(optionalHomework.isPresent()) {
				homeworkTitle = optionalHomework.get().getTitle();
				homeworkFile = optionalHomework.get().getFiles();
				homeworkNumber = optionalHomework.get().getHwNo();
			}
			
			Optional<LessonData> optionalLessonData = lessonDataRepository.findByLesson_lessonNo(lessonNo);
			if(optionalLessonData.isPresent()) {
				materialTitle = optionalLessonData.get().getTitle();
				materialFile = optionalLessonData.get().getFile();
			}
			
			String homeworkTitle2 = "";
			String homeworkFile2 = "";
			String materialTitle2 = "";
			String materialFile2 = "";
			Integer homeworkNumber2 = 0;
			
			Optional<Homework> optionalHomework2 = homeworkRepository.findByLesson_lessonNo(lessonNo2);
			if(optionalHomework2.isPresent()) {
				homeworkTitle2 = optionalHomework2.get().getTitle();
				homeworkFile2 = optionalHomework2.get().getFiles();
				homeworkNumber2 = optionalHomework2.get().getHwNo();
			}
			
			Optional<LessonData> optionalLessonData2 = lessonDataRepository.findByLesson_lessonNo(lessonNo2);
			if(optionalLessonData2.isPresent()) {
				materialTitle2 = optionalLessonData2.get().getTitle();
				materialFile2 = optionalLessonData2.get().getFile();
			}
			
			
			

			Map<String, Object> map = new HashMap<>();			
			map.put("week", week);
			map.put("twoCharacterWeek", twoCharacterWeek);
			
			map.put("lessonNo", lessonNo);
			map.put("count", count);
			map.put("videoFile",videoFile);
			map.put("videoName",videoName);
			map.put("status", status);
			map.put("homeworkTitle", homeworkTitle);
			map.put("homeworkFile", homeworkFile);
			map.put("homeworkNumber", homeworkNumber);
			map.put("materialTitle", materialTitle);
			map.put("materialFile", materialFile);
			
			map.put("lessonNo2", lessonNo2);
			map.put("count2", count2);
			map.put("videoFile2",videoFile2);
			map.put("videoName2",videoName2);
			map.put("status2", status2);
			map.put("homeworkTitle2", homeworkTitle2);
			map.put("homeworkFile2", homeworkFile2);
			map.put("homeworkNumber2", homeworkNumber2);
			map.put("materialTitle2", materialTitle2);
			map.put("materialFile2", materialFile2);
			mapList.add(map);
		}
		return mapList;
	}

	@Override
	public List<Map<String, Object>> showHomeworkList(String lecNo, String stdNo) throws Exception {
		List<Homework> homeworkList = homeworkRepository.findByLecture_lecNo(lecNo);
		List<Map<String, Object>> mapList = new ArrayList<Map<String, Object>>();

		for (Homework selectedHomework : homeworkList) {
			Integer hwNo = selectedHomework.getHwNo();
			String title = selectedHomework.getTitle();
			Date startDate = selectedHomework.getStartDt();
			Date endDate = selectedHomework.getEndDt();
			Integer week = selectedHomework.getLesson().getWeek();
			Integer count = selectedHomework.getLesson().getLessonCnt();

			Integer score = null;
			Boolean submission = false;
			Optional<HomeworkSubmit> optionalHomeworkSubmit = homeworkSubmitRepository.findByStudent_stdNoAndHomework_hwNo(stdNo, hwNo);
			if (optionalHomeworkSubmit.isPresent()) {
				score = optionalHomeworkSubmit.get().getScore();
				submission = true;
			}

			Map<String, Object> map = new HashMap<>();
			map.put("number", hwNo);
			map.put("title", title);
			map.put("startDate", startDate);
			map.put("endDate", endDate);
			map.put("week", week);
			map.put("count", count);
			map.put("score", score);
			map.put("submission", submission);
			mapList.add(map);
		}
		return mapList;
	}
	
	@Override
	public Map<String, Object> loadHomeworkInformation(Integer hwNo, String stdNo) throws Exception {
		Map<String, Object> map = new HashMap<>();
		Homework homework = homeworkRepository.findById(hwNo).get();
		Optional<HomeworkSubmit> optionalHomeworkSubmit = homeworkSubmitRepository.findByStudent_stdNoAndHomework_hwNo(stdNo, hwNo);
		String fileName = "";
		
		if(optionalHomeworkSubmit.isPresent()) {
			HomeworkSubmit homeworkSubmit = optionalHomeworkSubmit.get();
			if (!homeworkSubmit.getFiles().trim().equals("")) {
				Files files = filesRepository.findById(Integer.parseInt(homeworkSubmit.getFiles())).get();
				fileName = files.getName();
			}
		}

		String lectureName = homework.getLecture().getSubject().getName();
		String professorName = homework.getLecture().getProfessor().getName();
		String title = homework.getTitle();
		String content = homework.getContent();
		
		map.put("fileName", fileName);
		map.put("lectureName", lectureName);
		map.put("professorName", professorName);
		map.put("title", title);
		map.put("content", content);
		return map;
	}
	
	@Override
	public void sumbitHomework(String stdNo, Integer hwNo, MultipartFile file) throws Exception {
		String fileNo = "";
		if (file != null && !file.isEmpty()) {
			Files attachedFile = Files.builder().name(file.getOriginalFilename()).directory(uploadPath)
					.size(file.getSize()).contenttype(file.getContentType()).build();
			filesRepository.save(attachedFile);
			File upFile = new File(uploadPath, attachedFile.getFileNo() + "");
			file.transferTo(upFile);
			fileNo = attachedFile.getFileNo() + "";
		}
		
		HomeworkSubmit homeworkSubmit = HomeworkSubmit.builder()
				.homework(Homework.builder().hwNo(hwNo).build())
				.student(Student.builder().stdNo(stdNo).build())
				.files(fileNo)
				.build();
		homeworkSubmitRepository.save(homeworkSubmit);
	}
	
	@Override
	public void modifyHomework(String stdNo, Integer hwNo, MultipartFile file) throws Exception {
		HomeworkSubmit homeworkSubmit = homeworkSubmitRepository.findByStudent_stdNoAndHomework_hwNo(stdNo, hwNo).get();
		if (file != null && !file.isEmpty()) {
			Files attachedFile = Files.builder().name(file.getOriginalFilename()).directory(uploadPath)
					.size(file.getSize()).contenttype(file.getContentType()).build();
			filesRepository.save(attachedFile);
			File upFile = new File(uploadPath, attachedFile.getFileNo() + "");
			file.transferTo(upFile);
			String fileNo = attachedFile.getFileNo() + "";
			homeworkSubmit.setFiles(fileNo);
		}
		homeworkSubmitRepository.save(homeworkSubmit);
	}
	
	@Override
	public List<Map<String, Object>> checkAttendance(String lecNo, String stdNo) throws Exception {
		List<Map<String, Object>> mapList = new ArrayList<Map<String, Object>>();
		Attendance attendance = attendanceRepository.findByLecture_lecNoAndStudent_stdNo(lecNo, stdNo);
		String wholeStatus = attendance.getStatus();
		List<Lesson> lessonList = attendance.getLecture().getLessonList();

		for (int i = 0; i < lessonList.size() - 2; i++) {
			Integer lessonNo = lessonList.get(i).getLessonNo();
			Integer week = lessonList.get(i).getWeek();
			Integer count = lessonList.get(i).getLessonCnt();
			
			String status = "";
			if(wholeStatus.substring(i, i + 1).equals("1")) {
				status = "출석";
			} else if(wholeStatus.substring(i, i + 1).equals("2")) {
				status = "지각";
			} else if(wholeStatus.substring(i, i + 1).equals("3")) {
				status = "결석";
			} else if(wholeStatus.substring(i, i + 1).equals("4")) {
				status = "공결";
			}
			
			Boolean report = false;
			Boolean possibilityOfReport = false;
			Integer absNo = -1;
			Optional<Absence> optionalAbsence = absenceRepository.findByLesson_lessonNoAndStudent_stdNo(lessonNo, stdNo);
			if(optionalAbsence.isPresent()) {
				absNo = optionalAbsence.get().getAbsNo();
				report = true;
			}
			
			if(status.equals("결석")) {
				possibilityOfReport = true;
			}

			Map<String, Object> map = new HashMap<>();
			map.put("lessonNo", lessonNo);
			map.put("absNo", absNo);
			map.put("week", week);
			map.put("count", count);
			map.put("status", status);
			map.put("report", report);
			map.put("possibilityOfReport", possibilityOfReport);
			mapList.add(map);
		}
		return mapList;
	}
	
	@Override
	public Map<String, Object> checkAttendanceCount(String lecNo, String stdNo) throws Exception {
		Attendance attendance = attendanceRepository.findByLecture_lecNoAndStudent_stdNo(lecNo, stdNo);
		String wholeStatus = attendance.getStatus();
		List<Lesson> lessonList = attendance.getLecture().getLessonList();
		
		Integer presence = 0;
		Integer lateness = 0;
		Integer absence = 0;
		Integer approvedAbsence = 0;

		for (int i = 0; i < lessonList.size() - 2; i++) {
			if(wholeStatus.substring(i, i + 1).equals("1")) {
				presence++;
			} else if(wholeStatus.substring(i, i + 1).equals("2")) {
				lateness++;
			} else if(wholeStatus.substring(i, i + 1).equals("3")) {
				absence++;
			} else if(wholeStatus.substring(i, i + 1).equals("4")) {
				approvedAbsence++;
			}
		}
		
		Map<String, Object> map = new HashMap<>();
		map.put("presence", presence);
		map.put("lateness", lateness);
		map.put("absence", absence);
		map.put("approvedAbsence", approvedAbsence);
		return map;
	}
	
	@Override
	public void reportAbsence(String stdNo, Integer lessonNo, String content, String type, MultipartFile file) throws Exception {
		String fileNo = "";
		if (file != null && !file.isEmpty()) {
			Files attachedFile = Files.builder().name(file.getOriginalFilename()).directory(uploadPath)
					.size(file.getSize()).contenttype(file.getContentType()).build();
			filesRepository.save(attachedFile);
			File upFile = new File(uploadPath, attachedFile.getFileNo() + "");
			file.transferTo(upFile);
			fileNo = attachedFile.getFileNo() + "";
		}
		Absence absence = Absence.builder()
				.content(content)
				.files(fileNo)
				.type(type)
				.lesson(Lesson.builder().lessonNo(lessonNo).build())
				.student(Student.builder().stdNo(stdNo).build())
				.build();
		absenceRepository.save(absence);
	}
	
	@Override
	public Map<String, Object> loadAbsenceInformation(Integer lessonNo, String stdNo) throws Exception {
		Lesson lesson = lessonRepository.findById(lessonNo).get();
		
		String lectureName = lesson.getLecture().getSubject().getName();
		String professorName = lesson.getLecture().getProfessor().getName();		
		Integer week = lesson.getWeek();
		Integer count = lesson.getLessonCnt();
		
		String type = "";
		String content = "";
		String fileName = "";
		String status = "";
		
		Optional<Absence> optionalAbsence = absenceRepository.findByLesson_lessonNoAndStudent_stdNo(lessonNo, stdNo);
		if(optionalAbsence.isPresent()) {
			Absence absence = optionalAbsence.get();
			type = absence.getType();
			content = absence.getContent();
			status = absence.getStatus();
			if (!absence.getFiles().trim().equals("")) {
				Files files = filesRepository.findById(Integer.parseInt(absence.getFiles())).get();
				fileName = files.getName();
			}
		}
		
		Map<String, Object> map = new HashMap<>();
		map.put("fileName", fileName);
		map.put("lectureName", lectureName);
		map.put("professorName", professorName);
		map.put("type", type);
		map.put("content", content);
		map.put("status", status);
		map.put("week", week);
		map.put("count", count);
		return map;
	}
	
	@Override
	public void modifyAbsence(Integer absNo, String content, String type, MultipartFile file) throws Exception {
		Absence absence = absenceRepository.findById(absNo).get();
		if (file != null && !file.isEmpty()) {
			Files attachedFile = Files.builder().name(file.getOriginalFilename()).directory(uploadPath)
					.size(file.getSize()).contenttype(file.getContentType()).build();
			filesRepository.save(attachedFile);
			File upFile = new File(uploadPath, attachedFile.getFileNo() + "");
			file.transferTo(upFile);
			String fileNo = attachedFile.getFileNo() + "";
			absence.setFiles(fileNo);
		}
		
		absence.setType(type);
		
		if (content != null && !content.isEmpty()) {
			absence.setContent(content);
		}
		absenceRepository.save(absence);
	}
}
