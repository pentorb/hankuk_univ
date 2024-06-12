package com.kosta.hankuk.service;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.kosta.hankuk.dto.AppealDto;
import com.kosta.hankuk.dto.HuehakDto;
import com.kosta.hankuk.dto.LectureByStdDto;
import com.kosta.hankuk.entity.Appeal;
import com.kosta.hankuk.entity.Files;
import com.kosta.hankuk.entity.Huehak;
import com.kosta.hankuk.entity.Lecture;
import com.kosta.hankuk.entity.LectureByStd;
import com.kosta.hankuk.entity.Score;
import com.kosta.hankuk.entity.Student;
import com.kosta.hankuk.repository.AppealRepository;
import com.kosta.hankuk.repository.FilesRepository;
import com.kosta.hankuk.repository.HuehakRepository;
import com.kosta.hankuk.repository.LectureByStdRepository;
import com.kosta.hankuk.repository.MajorRepository;
import com.kosta.hankuk.repository.ScoreRepository;
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

	@Autowired
	private LectureByStdRepository lectureByStdRepository;
	@Autowired
	private ScoreRepository scoreRepository;
	@Autowired
	private FilesRepository filesRepository;
	@Autowired
	private AppealRepository appealRepository;

	@Value("${upload.path}")
	private String uploadPath;

	@Override
	public void hueInsert(HuehakDto hueDto) throws Exception {
		Huehak huehak = hueDto.toHuehak();
		System.out.println(huehak);
		hueRes.save(huehak);
	}

//	@Override
//	public String stdByMajCd(StudentDto stdDto) throws Exception {
//		return mres.findById(stdDto.getMajCd()).get().getName();
//	}

	// 학번으로 휴학 신청 내역
	@Override
	public List<HuehakDto> hueListByStdNo(String stdNo) throws Exception {
		List<Huehak> hueList = hueRes.findByStudent_StdNo(stdNo);
		List<HuehakDto> hueDtoList = new ArrayList<HuehakDto>();
		for (Huehak hue : hueList) {
			hueDtoList.add(hue.toHuehakDto());
		}
		return hueDtoList;
	}

	@Override
	public List<Map<String, Object>> checkGrade(String stdNo, Integer year, Integer semester) throws Exception {
		List<LectureByStd> lectureByStdGroup = lectureByStdRepository
				.findByStudent_stdNoAndLecture_yearAndLecture_semester(stdNo, year, semester);
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
				.findByStudent_stdNoAndLecture_yearAndLecture_semester(stdNo, year, semester);

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

	@Override
	public AppealDto appealDetail(Integer appNo) throws Exception {
		Optional<Appeal> oappeal = appealRepository.findById(appNo);
		if (oappeal.isEmpty())
			throw new Exception("글번호 오류");
		Appeal appeal = oappeal.get();
		appealRepository.save(appeal);
		return appeal.toAppealDto();
	}

}
