package com.kosta.hankuk.service;

import java.io.File;
import java.sql.Date;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.kosta.hankuk.dto.HuehakAndBokhakDto;
import com.kosta.hankuk.dto.HuehakDto;
import com.kosta.hankuk.dto.LectureByStdDto;
import com.kosta.hankuk.entity.Appeal;
import com.kosta.hankuk.entity.Files;
import com.kosta.hankuk.entity.Homework;
import com.kosta.hankuk.entity.HomeworkSubmit;
import com.kosta.hankuk.entity.Huehak;
import com.kosta.hankuk.entity.HuehakAndBokhak;
import com.kosta.hankuk.entity.Lecture;
import com.kosta.hankuk.entity.LectureByStd;
import com.kosta.hankuk.entity.Lesson;
import com.kosta.hankuk.entity.Score;
import com.kosta.hankuk.entity.Student;
import com.kosta.hankuk.repository.AppealRepository;
import com.kosta.hankuk.repository.FilesRepository;
import com.kosta.hankuk.repository.HomeworkRepository;
import com.kosta.hankuk.repository.HomeworkSubmitRepository;
import com.kosta.hankuk.repository.HueAndBokRepository;
import com.kosta.hankuk.repository.HuehakRepository;
import com.kosta.hankuk.repository.LectureByStdRepository;
import com.kosta.hankuk.repository.LectureRepository;
import com.kosta.hankuk.repository.MajorRepository;
import com.kosta.hankuk.repository.ScoreRepository;
import com.kosta.hankuk.repository.StudentRepository;
import com.kosta.hankuk.util.PageInfo;

@Service
public class StudentServiceImpl implements StudentService {

	// 휴학
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

	@Value("${upload.path}")
	private String uploadPath;

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

	@Override // 복학 내역 조회
	public List<HuehakAndBokhakDto> bokListByStdNo(PageInfo pageInfo, String stdNo, String type) throws Exception {
		PageRequest pageRequest = PageRequest.of(pageInfo.getCurPage() - 1, 4, Sort.by(Sort.Direction.DESC, "hueNo"));
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
		Score score = scoreRepository.findByStudent_stdNoAndYearAndSemester(stdNo, year, semester);
		Map<String, Object> map = new HashMap<>();
		List<LectureByStd> lectureByStdGroup = lectureByStdRepository
				.findByStudent_stdNoAndCourYearAndLecture_semester(stdNo, year, semester);

		Integer semesterCredit = 0;
		Integer majorCredit = 0;
		for (LectureByStd lectureByStd : lectureByStdGroup) {
			semesterCredit += lectureByStd.getLecture().getCredit();
			if (lectureByStd.getLecture().getSubject().getSubCd().substring(0, 2) != "BLS") {
				majorCredit += lectureByStd.getLecture().getCredit();
			}
		}

		String majCd = sres.findById(stdNo).get().getMajor().getMajCd();
		Integer finSem = sres.findById(stdNo).get().getFinSem();
		List<Student> studentList = sres.findByMajor_majCdAndFinSem(majCd, finSem);

		Integer studentCount = studentList.size();
		Integer rank = score.getRank();
		Double point = score.getScore();
		map.put("majorCredit", majorCredit);
		map.put("semesterCredit", semesterCredit);
		map.put("rank", rank);
		map.put("studentCount", studentCount);
		map.put("point", point);
		return map;
	}

	@Override // 학생이 수강하는 강의 리스트 (학기별)
	public List<LectureByStdDto> lecListByStdNo(String stdNo, Integer courYear, Integer semester) throws Exception {
		List<LectureByStd> lbsList = lectureByStdRepository.findByStudent_stdNoAndCourYearAndLecture_semester(stdNo,
				courYear, semester);
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
		LectureByStd lectureByStd = lectureByStdRepository.findByStudent_stdNoAndLecture_lecNo(stdNo, lecNo);

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
					selectedAppeal.getStudent().getStdNo(), selectedAppeal.getLecture().getLecNo()).getGrade();
			Integer credit = selectedAppeal.getLecture().getCredit();
			String reqDt = selectedAppeal.getReqDt();
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
				.findByStudent_stdNoAndLecture_lecNo(appeal.getStudent().getStdNo(), appeal.getLecture().getLecNo())
				.getGrade();
		appealRepository.save(appeal);

		String formerFileName = "";
		if (appeal.getFiles() != null && !appeal.getFiles().trim().equals("")) {
			Files files = filesRepository.findById(Integer.parseInt(appeal.getFiles())).get();
			formerFileName = files.getName();
		}

		String status = appeal.getStatus();
		String content = appeal.getContent();
		String answer = appeal.getAnswer();
		String reqDt = appeal.getReqDt();

		Map<String, Object> map = new HashMap<>();
		map.put("lectureNumber", lectureNumber);
		map.put("formerFileName", formerFileName);
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

			Map<String, Object> map = new HashMap<>();
			map.put("lecNo", lecNo);
			map.put("lectureName", lectureName);
			map.put("lectureRoom", lectureRoom);
			map.put("professorName", professorName);
			mapList.add(map);
		}
		return mapList;
	}

	@Override
	public Map<String, Object> showLectureContent(String lecNo) throws Exception {
		Optional<Lecture> olecture = lectureRepository.findById(lecNo);
		if (olecture.isEmpty())
			throw new Exception("강의번호 오류");
		Lecture lecture = olecture.get();

		String lectureNumber = lecture.getLecNo();
		String lectureName = lecture.getSubject().getName();
		List<Lesson> lessonList = lecture.getLessonList();

		Map<String, Object> map = new HashMap<>();
		map.put("lectureNumber", lectureNumber);
		map.put("lectureName", lectureName);
		map.put("lessonList", lessonList);

		return map;
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
			HomeworkSubmit homeworkSubmit = homeworkSubmitRepository.findByStudent_stdNoAndHomework_hwNo(stdNo, hwNo);
			if (homeworkSubmit != null) {
				score = homeworkSubmit.getScore();
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
	public Map<String, Object> loadHomeworkInformation(Integer hwNo) throws Exception {
		Map<String, Object> map = new HashMap<>();
		Homework homework = homeworkRepository.findById(hwNo).get();

		String lectureName = homework.getLecture().getSubject().getName();
		String professorName = homework.getLecture().getProfessor().getName();
		String title = homework.getTitle();
		String content = homework.getContent();
		
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
	
}
