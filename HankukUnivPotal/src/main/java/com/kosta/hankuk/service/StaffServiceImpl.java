package com.kosta.hankuk.service;

import java.io.InputStream;
import java.sql.Date;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;

import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.kosta.hankuk.dto.ColleageDto;
import com.kosta.hankuk.dto.HuehakDto;
import com.kosta.hankuk.dto.MajorDto;
import com.kosta.hankuk.dto.NoticeBoardDto;
import com.kosta.hankuk.dto.ProfessorDto;
import com.kosta.hankuk.dto.StudentDto;
import com.kosta.hankuk.dto.SubjectDto;
import com.kosta.hankuk.entity.Colleage;
import com.kosta.hankuk.entity.Huehak;
import com.kosta.hankuk.entity.HuehakAndBokhak;
import com.kosta.hankuk.entity.Lecture;
import com.kosta.hankuk.entity.Lesson;
import com.kosta.hankuk.entity.Major;
import com.kosta.hankuk.entity.NoticeBoard;
import com.kosta.hankuk.entity.Professor;
import com.kosta.hankuk.entity.Student;
import com.kosta.hankuk.entity.Subject;
import com.kosta.hankuk.repository.ColleageRepository;
import com.kosta.hankuk.repository.HueAndBokRepository;
import com.kosta.hankuk.repository.HuehakRepository;
import com.kosta.hankuk.repository.LectureRepository;
import com.kosta.hankuk.repository.MajorRepository;
import com.kosta.hankuk.repository.NoticeBoardRepository;
import com.kosta.hankuk.repository.ProfessorRepository;
import com.kosta.hankuk.repository.StudentRepository;
import com.kosta.hankuk.repository.SubjectRepository;
import com.kosta.hankuk.repository.LessonRepository;
import com.kosta.hankuk.util.PageInfo;

@Service
public class StaffServiceImpl implements StaffService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private ProfessorRepository professorRepository;

    @Autowired
    private ColleageRepository colleageRepository;
    
    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private MajorRepository majorRepository;
    
    @Autowired
    private LectureRepository lectureRepository;
    
    @Autowired
    private LessonRepository lessonRepository;

    @Autowired
    private HuehakRepository hueres;
    
    @Autowired
    private HueAndBokRepository hbres;
    
    @Autowired
    private NoticeBoardRepository nbres;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    public String generateUniqueStudentId() {
        String studentId;
        do {
            studentId = "24" + String.format("%04d", new Random().nextInt(10000));
        } while (studentRepository.existsById(studentId));
        return studentId;
    }

    @Override
    public String generateUniqueProfessorId() {
        String professorId;
        do {
            professorId = "P24" + String.format("%04d", new Random().nextInt(10000));
        } while (professorRepository.existsById(professorId));
        return professorId;
    }

    @Override
    public void registerStudentByOne(String stdNo, String name, String tel, String password, String majorId, String profId) {
        Major major = majorRepository.findById(majorId).orElse(null);
        Professor porfessor = professorRepository.findById(profId).orElse(null);
        
        
        Student student = new Student();
        student.setStdNo(stdNo);
        student.setName(name);
        student.setTel(tel);
        student.setPassword(passwordEncoder.encode(password));
        student.setMajor(major);
        student.setProfessor(porfessor);

        studentRepository.save(student);
     }

    @Override
    public void registerProfessorByOne(String profNo, String name, String tel, String password, String majorId) {
        Major major = majorRepository.findById(majorId).orElse(null);
        
        Professor professor = new Professor();
        professor.setProfNo(profNo);
        professor.setName(name);
        professor.setTel(tel);
        professor.setPassword(passwordEncoder.encode(password));
        professor.setMajor(major);

        professorRepository.save(professor);
     }
    
    
    
    @Override
    public void registerStudent(Student student) {
		student.setPassword(passwordEncoder.encode(student.getPassword()));
        studentRepository.save(student);
    }

    @Override
    public void registerProfessor(Professor professor) {
		professor.setPassword(passwordEncoder.encode(professor.getPassword()));
        professorRepository.save(professor);
    }

    @Override
    public void deleteStudents(List<String> studentIds) {
        studentRepository.deleteAllById(studentIds);
    }

    @Override
    public void deleteProfessors(List<String> professorIds) {
        professorRepository.deleteAllById(professorIds);
    }

    @Override
    public void updateStudents(List<Map<String, Object>> students) {
        for (Map<String, Object> studentData : students) {
            String id = (String) studentData.get("id");
            Student existingStudent = studentRepository.findById(id).orElse(null);
            if (existingStudent != null) {
                if (studentData.containsKey("name")) {
                    existingStudent.setName((String) studentData.get("name"));
                }
                if (studentData.containsKey("tel")) {
                    existingStudent.setTel((String) studentData.get("tel"));
                }
                studentRepository.save(existingStudent);
            } else {
                throw new IllegalArgumentException("No student found with ID: " + id);
            }
        }
    }

    @Override
    public void updateProfessors(List<Map<String, Object>> professors) {
        for (Map<String, Object> professorData : professors) {
            String id = (String) professorData.get("id");
            Professor existingProfessor = professorRepository.findById(id).orElse(null);
            if (existingProfessor != null) {
                if (professorData.containsKey("name")) {
                    existingProfessor.setName((String) professorData.get("name"));
                }
                if (professorData.containsKey("tel")) {
                    existingProfessor.setTel((String) professorData.get("tel"));
                }
                professorRepository.save(existingProfessor);
            } else {
                throw new IllegalArgumentException("No professor found with ID: " + id);
            }
        }
    }

	@Override
	public List<StudentDto> searchStudents(String name, String colleage, String major) {
		if (name != null && !name.isEmpty()) {
			return studentRepository.findByNameContaining(name).stream()
					.map(student -> new StudentDto(student.getStdNo(), student.getPassword(), student.getName(),
							student.getTel(), student.getAddr(), student.getDetailAddr(), student.getPostCode(),
							student.getGender(), student.getBirthday(), student.getEmail(), student.getEmailDo(),
							student.getStatus(), student.getProfile(), student.getFinCredit(), student.getFinSem(),
							student.getProfessor() != null ? student.getProfessor().getProfNo() : null,
							student.getProfessor() != null ? student.getProfessor().getName() : null,
							student.getMajor()!= null ? student.getMajor().getName() : null,
							student.getMajor() != null ? student.getMajor().getMajCd() : null))
					.collect(Collectors.toList());
		} else if (colleage != null && major == null) {
			return studentRepository.findByMajor_Colleage_name(colleage).stream()
					.map(student -> new StudentDto(student.getStdNo(), student.getPassword(), student.getName(),
							student.getTel(), student.getAddr(), student.getDetailAddr(), student.getPostCode(),
							student.getGender(), student.getBirthday(), student.getEmail(), student.getEmailDo(),
							student.getStatus(), student.getProfile(), student.getFinCredit(), student.getFinSem(),
							student.getProfessor() != null ? student.getProfessor().getProfNo() : null,
							student.getProfessor() != null ? student.getProfessor().getName() : null,
							student.getMajor()!= null ? student.getMajor().getName() : null,
							student.getMajor() != null ? student.getMajor().getMajCd() : null))
					.collect(Collectors.toList());
		} else if (major != null) {
			Major majorEntity = majorRepository.findById(major).orElse(null);
			if (majorEntity != null) {
				return studentRepository.findByMajor_majCd(major).stream()
						.map(student -> new StudentDto(student.getStdNo(), student.getPassword(), student.getName(),
								student.getTel(), student.getAddr(), student.getDetailAddr(), student.getPostCode(),
								student.getGender(), student.getBirthday(), student.getEmail(), student.getEmailDo(),
								student.getStatus(), student.getProfile(), student.getFinCredit(), student.getFinSem(),
								student.getProfessor() != null ? student.getProfessor().getProfNo() : null,
								student.getProfessor() != null ? student.getProfessor().getName() : null,
								student.getMajor()!= null ? student.getMajor().getName() : null,
								student.getMajor() != null ? student.getMajor().getMajCd() : null))
						.collect(Collectors.toList());
			}
		}
		return studentRepository.findAll().stream()
				.map(student -> new StudentDto(student.getStdNo(), student.getPassword(), student.getName(),
						student.getTel(), student.getAddr(), student.getDetailAddr(), student.getPostCode(),
						student.getGender(), student.getBirthday(), student.getEmail(), student.getEmailDo(),
						student.getStatus(), student.getProfile(), student.getFinCredit(), student.getFinSem(),
						student.getProfessor() != null ? student.getProfessor().getProfNo() : null,
						student.getProfessor() != null ? student.getProfessor().getName() : null,
						student.getMajor()!= null ? student.getMajor().getName() : null,
						student.getMajor() != null ? student.getMajor().getMajCd() : null))
				.collect(Collectors.toList());
	}

	@Override
	public List<ProfessorDto> searchProfessors(String name, String colleage, String major) {
	    if (name != null && !name.isEmpty()) {
	        return professorRepository.findByNameContaining(name).stream()
	                .map(professor -> new ProfessorDto(
	                        professor.getProfNo(), 
	                        professor.getPassword(), 
	                        professor.getName(),
	                        professor.getGender(), 
	                        professor.getProfile(), 
	                        professor.getPosition(),
	                        professor.getAddr(), 
	                        professor.getDetailAddr(), 
	                        professor.getPostCode(),
	                        professor.getBirthday(), 
	                        professor.getTel(), 
	                        professor.getEmail(), 
	                        professor.getEmailDo(),
	                        professor.getJoinDt(), 
	                        professor.getMajor()!=null ? professor.getMajor().getName() : null,
	                        professor.getMajor() != null ? professor.getMajor().getMajCd() : null
	                ))
	                .collect(Collectors.toList());
	    } else if (colleage != null && !colleage.isEmpty() && (major == null || major.isEmpty())) {
	        return professorRepository.findByMajor_Colleage_name(colleage).stream()
	                .map(professor -> new ProfessorDto(
	                        professor.getProfNo(), 
	                        professor.getPassword(), 
	                        professor.getName(),
	                        professor.getGender(), 
	                        professor.getProfile(), 
	                        professor.getPosition(),
	                        professor.getAddr(), 
	                        professor.getDetailAddr(), 
	                        professor.getPostCode(),
	                        professor.getBirthday(), 
	                        professor.getTel(), 
	                        professor.getEmail(), 
	                        professor.getEmailDo(),
	                        professor.getJoinDt(), 
	                        professor.getMajor()!=null ? professor.getMajor().getName() : null,
	                        professor.getMajor() != null ? professor.getMajor().getMajCd() : null
	                ))
	                .collect(Collectors.toList());
	    } else if (major != null && !major.isEmpty()) {
	        Major majorEntity = majorRepository.findById(major).orElse(null);
	        if (majorEntity != null) {
	            return professorRepository.findByMajor_majCd(major).stream()
	                    .map(professor -> new ProfessorDto(
	                            professor.getProfNo(), 
	                            professor.getPassword(), 
	                            professor.getName(),
	                            professor.getGender(), 
	                            professor.getProfile(), 
	                            professor.getPosition(),
	                            professor.getAddr(), 
	                            professor.getDetailAddr(), 
	                            professor.getPostCode(),
	                            professor.getBirthday(), 
	                            professor.getTel(), 
	                            professor.getEmail(), 
	                            professor.getEmailDo(),
	                            professor.getJoinDt(), 
	                            professor.getMajor()!=null ? professor.getMajor().getName() : null,
	                            professor.getMajor() != null ? professor.getMajor().getMajCd() : null
	                    ))
	                    .collect(Collectors.toList());
	        }
	    }
	    return professorRepository.findAll().stream()
	            .map(professor -> new ProfessorDto(
	                    professor.getProfNo(), 
	                    professor.getPassword(), 
	                    professor.getName(),
	                    professor.getGender(), 
	                    professor.getProfile(), 
	                    professor.getPosition(),
	                    professor.getAddr(), 
	                    professor.getDetailAddr(), 
	                    professor.getPostCode(),
	                    professor.getBirthday(), 
	                    professor.getTel(), 
	                    professor.getEmail(), 
	                    professor.getEmailDo(),
	                    professor.getJoinDt(), 
	                    professor.getMajor()!=null ? professor.getMajor().getName() : null,
	                    professor.getMajor() != null ? professor.getMajor().getMajCd() : null
	            ))
	            .collect(Collectors.toList());
	}


    @Override
    public List<ColleageDto> getAllColleages() {
        return colleageRepository.findAll().stream()
                                 .map(colleage -> new ColleageDto(colleage.getColCd(), colleage.getName()))
                                 .collect(Collectors.toList());
    }

    @Override
    public List<MajorDto> getMajorsByColleage(String colCd) {
        return majorRepository.findByColleageColCd(colCd).stream()
                              .map(major -> new MajorDto(major.getMajCd(), major.getName(), major.getTel(), major.getReqGenCredit(), major.getReqMajCredit(), major.getGradCredit(), major.getColleage().getColCd()))
                              .collect(Collectors.toList());
    }

    @Override
    public List<Map<String, String>> getProfessorsByMajor(String majCd) {
        List<Professor> professors = professorRepository.findByMajor_MajCd(majCd);
        return professors.stream()
                         .map(professor -> {
                             Map<String, String> map = new HashMap<>();
                             map.put("profNo", professor.getProfNo());
                             map.put("name", professor.getName());
                             map.put("position", professor.getPosition());
                             return map;
                         })
                         .collect(Collectors.toList());
    }
    
    @Override
    public MajorDto getMajorByCode(String majCd) {
        return majorRepository.findByMajCd(majCd).map(Major::toMajorDto).orElse(null);
    }
    
    
    
    @Override
    public void saveDataFromExcel(String category, MultipartFile file) throws Exception {
		List<Student> students = new ArrayList<>();
		List<Professor> professors = new ArrayList<>();

		try (InputStream inputStream = file.getInputStream()) {
			Workbook workbook = WorkbookFactory.create(inputStream);
			Sheet sheet = workbook.getSheetAt(0);

			int nameIdx = -1, birthdayIdx = -1, emailIdx = -1, address1Idx = -1, address2Idx = -1, postcodeIdx = -1,
					telIdx = -1, genderIdx = -1, majorIdx = -1, professorIdx = -1;
			for (Row row : sheet) {
				if (row.getRowNum() == 0) {
					for (int i = 0; i < 10; i++) {
						String colName = row.getCell(i).getStringCellValue();
						if (colName.equals("name"))
							nameIdx = i;
						else if (colName.equals("birthday"))
							birthdayIdx = i;
						else if (colName.equals("email"))
							emailIdx = i;
						else if (colName.equals("address1"))
							address1Idx = i;
						else if (colName.equals("address2"))
							address2Idx = i;
						else if (colName.equals("postcode"))
							postcodeIdx = i;
						else if (colName.equals("tel"))
							telIdx = i;
						else if (colName.equals("gender"))
							genderIdx = i;
						else if (colName.equals("major"))
							majorIdx = i;
						else if (colName.equals("professor"))
							professorIdx = i;
					}
					continue;
				}
				
				String name = nameIdx==-1 || row.getCell(nameIdx)==null? "" :row.getCell(nameIdx).getStringCellValue();
				Date birthday = birthdayIdx==-1 || row.getCell(birthdayIdx)==null? null :new Date(row.getCell(birthdayIdx).getDateCellValue().getTime());
				String email = emailIdx==-1 || row.getCell(emailIdx)==null? "" :row.getCell(emailIdx).getStringCellValue();
				String address1 = address1Idx==-1 || row.getCell(address1Idx)==null? "" :row.getCell(address1Idx).getStringCellValue();
				String address2 = address2Idx==-1 || row.getCell(address2Idx)==null? "" :row.getCell(address2Idx).getStringCellValue();
				String postcode = postcodeIdx == -1 || row.getCell(postcodeIdx) == null ? "" : String.valueOf((int) row.getCell(postcodeIdx).getNumericCellValue());
				String tel = telIdx==-1 || row.getCell(telIdx)==null? "" :row.getCell(telIdx).getStringCellValue();
				String gender = genderIdx==-1 || row.getCell(genderIdx)==null? "": row.getCell(genderIdx).getStringCellValue();
				String majorName = majorIdx==-1 || row.getCell(majorIdx)==null? "" :row.getCell(majorIdx).getStringCellValue();
				String majCd = majorRepository.findByName(majorName).map(Major::getMajCd).orElse(null);
				String professorName = professorIdx==-1 || row.getCell(professorIdx)==null? "" : row.getCell(professorIdx).getStringCellValue();
				String profCd = null;
				Major opmajor = majCd != null ? majorRepository.findById(majCd).orElse(null) : null;

				if (opmajor != null && !professorName.isEmpty()) {
				    Optional<Professor> oprofessor = professorRepository.findByMajorAndName(opmajor, professorName);
				    
				    if (oprofessor.isPresent()) {
				        profCd = oprofessor.get().getProfNo();
				    }
				}
				if ("student".equalsIgnoreCase(category)) {
					Student student = Student.builder().stdNo(generateUniqueStudentId()).name(name).password("1234")
							.birthday(birthday).email(email).addr(address1).detailAddr(address2)
							.postCode(postcode).tel(tel).gender(gender)
							.major(majCd != null ? Major.builder().majCd(majCd).build() : null)
							.professor(profCd != null ? Professor.builder().profNo(profCd).build() : null).build();
					students.add(student);
				} else if ("professor".equalsIgnoreCase(category)) {
					Professor professor = Professor.builder().profNo(generateUniqueProfessorId()).name(name).password("1234")
							.birthday(birthday).email(email).addr(address1).detailAddr(address2)
							.postCode(postcode).tel(tel).gender(gender)
							.major(majCd != null ? Major.builder().majCd(majCd).build() : null).build();

					professors.add(professor);
				}
			}

			if ("student".equalsIgnoreCase(category)) {
				students.forEach(this::registerStudent);
			} else if ("professor".equalsIgnoreCase(category)) {
				professors.forEach(this::registerProfessor);
			}
		}
    }
    
    
    
    @Override
    public List<Map<String, Object>> searchMajors(String name, String colleage) {
        List<Major> majors;

        if (name != null && !name.isEmpty()) {
            majors = majorRepository.findByNameContaining(name);
        } else if (colleage != null && !colleage.isEmpty()) {
            majors = majorRepository.findByColleageColCd(colleage);
        } else {
            majors = majorRepository.findAll();
        }

        return majors.stream().map(major -> {
            Map<String, Object> resultMap = new HashMap<>();
            resultMap.put("majCd", major.getMajCd());
            resultMap.put("colleage", major.getColleage().getName());
            resultMap.put("name", major.getName());

            Professor headProfessor = professorRepository.findByMajor_majCdAndPosition(major.getMajCd(), "0").stream().findFirst().orElse(null);
            resultMap.put("professor", headProfessor != null ? headProfessor.getName() : "");

            return resultMap;
        }).collect(Collectors.toList());
    }
    
    @Override
    public boolean checkMajorCode(String majCd) {
        return majorRepository.existsByMajCd(majCd);
    }
    
    @Override
    public void createMajor(Map<String, Object> majorData) throws Exception {
        try {
            String majCd = (String) majorData.get("majorCode");
            String name = (String) majorData.get("majorName");
            String tel = (String) majorData.get("majorNumber");
            Integer reqGenCredit = majorData.get("generalEducationCredits") != null ? Integer.parseInt(majorData.get("generalEducationCredits").toString()) : 0;
            Integer reqMajCredit = majorData.get("majorCredits") != null ? Integer.parseInt(majorData.get("majorCredits").toString()) : 0;
            Integer gradCredit = majorData.get("totalCredits") != null ? Integer.parseInt(majorData.get("totalCredits").toString()) : 0;
            String colCd = (String) majorData.get("colleage");

            Colleage colleage = colleageRepository.findById(colCd).orElseThrow(() -> new Exception("Invalid colleage code"));

            Major major = Major.builder()
                    .majCd(majCd)
                    .name(name)
                    .tel(tel)
                    .reqGenCredit(reqGenCredit)
                    .reqMajCredit(reqMajCredit)
                    .gradCredit(gradCredit)
                    .colleage(colleage)
                    .build();

            majorRepository.save(major);
        } catch (Exception e) {
            throw new Exception("Error while creating major: " + e.getMessage(), e);
        }
    }
    
    
    @Override
    public List<SubjectDto> findSubjectsByMajor(String majCd) {
        List<Subject> subjects = subjectRepository.findByMajorMajCd(majCd);
        return subjects.stream()
                       .map(subject -> new SubjectDto(
                               subject.getSubCd(),
                               subject.getName(),
                               subject.getType(),
                               subject.getTargetGrd(),
                               subject.getMajor().getMajCd()
                       ))
                       .collect(Collectors.toList());
    }
    
    @Override
    public void updateMajor(String majCd, MajorDto majorDto) {
        Optional<Major> majorOptional = majorRepository.findById(majCd);

        if (majorOptional.isPresent()) {
            Major major = majorOptional.get();
            major.setName(majorDto.getName());
            major.setTel(majorDto.getTel());
            major.setReqGenCredit(majorDto.getReqGenCredit());
            major.setReqMajCredit(majorDto.getReqMajCredit());
            major.setGradCredit(majorDto.getGradCredit());
            
            majorRepository.save(major);
        } else {
            throw new RuntimeException("학과를 찾을 수 없습니다.");
        }
    }
    
    @Override
    public void updateSubjects(List<SubjectDto> updatedSubjects) throws Exception {
        for (SubjectDto subjectDto : updatedSubjects) {
            Optional<Subject> optionalSubject = subjectRepository.findById(subjectDto.getSubCd());

            if (optionalSubject.isPresent()) {
                Subject subject = optionalSubject.get();
                subject.setName(subjectDto.getName());
                subject.setType(subjectDto.getType());
                subject.setTargetGrd(subjectDto.getTargetGrd());
                
                subjectRepository.save(subject);
            } else {
                throw new Exception("Subject with code " + subjectDto.getSubCd() + " not found");
            }
        }
    }
    
    @Override
    public void updateHeadProfessor(String majCd, String profNo) throws Exception {
        List<Professor> professorsByMajor = professorRepository.findByMajor_MajCd(majCd);
        for (Professor professor : professorsByMajor) {
            professor.setPosition("1");
            professorRepository.save(professor);
        }

        Professor headProfessor = professorRepository.findById(profNo)
                .orElseThrow(() -> new Exception("Professor with profNo " + profNo + " not found"));
        headProfessor.setPosition("0");
        professorRepository.save(headProfessor);
    }
    
    public void deleteSubjects(List<String> subjectCodes) {
        subjectRepository.deleteAllById(subjectCodes);
    }
    
    
    @Override
    public Optional<Major> getMajorByCodeop(String majCd) {
        return majorRepository.findById(majCd);
    }
    
    @Override
    public void saveSubjectFromExcel(String majCd, MultipartFile file) throws Exception{
        List<Subject> subjects = new ArrayList<>();

        try (InputStream inputStream = file.getInputStream()) {
            Workbook workbook = WorkbookFactory.create(inputStream);
            Sheet sheet = workbook.getSheetAt(0);

            int nameIdx = -1, typeIdx = -1, targetGrdIdx = -1, majorIdx = -1;
            for (Row row : sheet) {
                if (row.getRowNum() == 0) {
                    for (int i = 0; i < 3; i++) {
                        String colName = row.getCell(i).getStringCellValue();
                        if (colName.equals("name"))
                            nameIdx = i;
                        else if (colName.equals("type"))
                            typeIdx = i;
                        else if (colName.equals("targetGrd"))
                            targetGrdIdx = i;

                    }
                    continue;
                }

                String name = nameIdx == -1 || row.getCell(nameIdx) == null ? "" : row.getCell(nameIdx).getStringCellValue();
                String type = typeIdx == -1 || row.getCell(typeIdx) == null ? "" : row.getCell(typeIdx).getStringCellValue();
                String targetGrd = targetGrdIdx == -1 || row.getCell(targetGrdIdx) == null ? "" : String.valueOf((int) row.getCell(targetGrdIdx).getNumericCellValue());

                String baseSubCd = majCd + targetGrd;
                String subCd = baseSubCd + "00";
                
                int suffix = 0;
                
                while (subjectRepository.existsBySubCd(subCd)) {
                    suffix++;
                    subCd = baseSubCd + String.format("%02d", suffix);
                }

                Subject subject = Subject.builder()
                        .subCd(subCd)
                        .name(name)
                        .type(type)
                        .targetGrd(Integer.parseInt(targetGrd))
                        .major(Major.builder().majCd(majCd).build())
                        .build();

                subjects.add(subject);
                subjectRepository.saveAll(subjects);
            }
        }
    }
    @Override
    public Subject addSubject(Map<String, Object> subjectData) throws Exception {

        String majCd = (String) subjectData.get("majCd");
        String name = (String) subjectData.get("name");
        String type = (String) subjectData.get("type");
        String targetGrd = (String) subjectData.get("targetGrd");
        
        
        String baseSubCd = majCd.toUpperCase() + targetGrd;
        String subCd = baseSubCd + "00";
        
        int suffix = 0;
        
        while (subjectRepository.existsBySubCd(subCd)) {
            suffix++;
            subCd = baseSubCd + String.format("%02d", suffix);
        }

        Major major = majorRepository.findById(majCd)
                .orElseThrow(() -> new IllegalArgumentException("Invalid majCd: " + majCd));

        Subject subject = Subject.builder()
                .subCd(subCd)
                .name(name)
                .type(type)
                .targetGrd(Integer.parseInt(targetGrd))
                .major(major)
                .build();
        
        Subject savedSubject = subjectRepository.save(subject);
        
        System.out.println("Saved subject: " + savedSubject);

        return savedSubject;
    }
    
    
    public void changeHeadProf(String majorName, String profName) {
    	Optional<Major> majorOpt = majorRepository.findByName(majorName);
        
        Major major = majorOpt.get();
            
        List<Professor> professors = professorRepository.findByMajor(major);
        
        for (Professor professor : professors) {
            if (professor.getPosition() == "0") {
                professor.setPosition("1");
                professorRepository.save(professor);
            }
        }
        
        Optional<Professor> newHeadProfessorOpt = professorRepository.findByMajorAndName(major, profName);
        Professor newHeadProfessor = newHeadProfessorOpt.get();
        newHeadProfessor.setPosition("0");
        professorRepository.save(newHeadProfessor);
    }

    //강의허락

    public List<Map<String, Object>> searchREQLecture(String name, String colleage, String major) {
        List<Lecture> lectures = new ArrayList<>();

        if (name != null) {
            List<Subject> subjects = subjectRepository.findByNameContaining(name);
            for (Subject subject : subjects) {
                lectures.addAll(lectureRepository.findBySubjectSubCdAndStatus(subject.getSubCd(), "req"));
            }
        } else if (major != null) {
            List<Subject> subjects = subjectRepository.findByMajorMajCd(major);
            for (Subject subject : subjects) {
                lectures.addAll(lectureRepository.findBySubjectSubCdAndStatus(subject.getSubCd(), "req"));
            }
        } else if (colleage != null) {
            List<Major> majors = majorRepository.findByColleageColCd(colleage);
            for (Major maj : majors) {
                List<Subject> subjects = subjectRepository.findByMajorMajCd(maj.getMajCd());
                System.out.println("Subjects found by major for colleage: " + subjects);
                for (Subject subject : subjects) {
                    lectures.addAll(lectureRepository.findBySubjectSubCdAndStatus(subject.getSubCd(), "req"));
                }
            }
        }

        List<Map<String, Object>> result = new ArrayList<>();
        for (Lecture lecture : lectures) {
            Map<String, Object> map = new HashMap<>();
            map.put("lecNo", lecture.getLecNo());
            map.put("time1", lecture.getTime1());
            map.put("time2", lecture.getTime2());
            map.put("lecRoom", lecture.getLecRoom());
            map.put("numOfStd", lecture.getNumOfStd());
            map.put("credit", lecture.getCredit());
            map.put("file", lecture.getFiles());

            Subject subject = subjectRepository.findById(lecture.getSubject().getSubCd()).orElse(null);
            if (subject != null) {
                map.put("subCd", subject.getSubCd());
                map.put("subName", subject.getName());
                map.put("grade", subject.getTargetGrd());
            }

            Professor professor = professorRepository.findById(lecture.getProfessor().getProfNo()).orElse(null);
            if (professor != null) {
                map.put("prof", professor.getName());
            }

            result.add(map);
        }

        return result;
    }

	@Override
    public void updateLectureStatus(String lecNo, String status) {
        Lecture lecture = lectureRepository.findById(lecNo).orElseThrow(() -> new RuntimeException("Lecture not found"));
        lecture.setStatus(status);
        lectureRepository.save(lecture);
        
        if ("APPR".equals(status)) {
            createLessonsForLecture(lecture);
        }
    }
	
    private void createLessonsForLecture(Lecture lecture) {
        for (int week = 1; week <= 15; week++) {
            for (int lessonCnt = 1; lessonCnt <= 2; lessonCnt++) {
                Lesson lesson = Lesson.builder()
                    .week(week)
                    .lessonCnt(lessonCnt)
                    .lecture(lecture)
                    .build();
                lessonRepository.save(lesson);
            }
        }
    }
    
    
    
    // 휴학 신청 내역 리스트 (페이징)
	@Override
	public List<HuehakDto> hbListByPage(PageInfo pageInfo, String type) throws Exception {
		
		PageRequest pageRequest = PageRequest.of(pageInfo.getCurPage()-1, 10, Sort.by(Sort.Direction.DESC, "hueNo"));
		Page<Huehak> pages = null;
		
		if (type==null || type.trim().equals("")) {
			pages = hueres.findAll(pageRequest);
		} else {
			pages = hueres.findByType(type, pageRequest);
		}
		
		pageInfo.setAllPage(pages.getTotalPages()); // 전체 페이지의 수
		
		int startPage = (pageInfo.getCurPage()-1)/1*10+1;
		int endPage = Math.min(startPage+10-1, pageInfo.getAllPage());

		pageInfo.setStartPage(startPage);
		pageInfo.setEndPage(endPage);
		
		List<HuehakDto> hueDtoList = new ArrayList<HuehakDto>();
		for (Huehak hue : pages.getContent()) {
			HuehakDto hbDto = hue.toHuehakDto();
			
			String stdNm = hue.getStudent().getName(); // 학생 이름
			String colNm = hue.getStudent().getMajor().getColleage().getName(); // 단과 이름
			String majNm = hue.getStudent().getMajor().getName(); // 학과 이름
			
			hbDto.setStdNm (stdNm);
			hbDto.setColNm(colNm);
			hbDto.setMajNm(majNm);
			
			hueDtoList.add(hbDto);
		}
		
		return hueDtoList;
	}

	// 휴복학 내역 저장
//	public void huebokInsert(HuehakAndBokhakDto hbDto) throws Exception{
//		HuehakAndBokhak hb = hbDto.toLeaveAndReturn();
//		System.out.println();
//		hbres.save(hb);
//	}
	
	// 휴학 신청 내역 수정 
	public void huebokModify(HuehakDto hueDto) throws Exception{
		Huehak huehak = hueres.findById(hueDto.getHueNo()).get();

		huehak.setRejResult(hueDto.getRejResult());
		huehak.setStatus(hueDto.getStatus());
		
		if (hueDto.getStatus().equals("APP")) { // 승인이면 
			huehak.setRejResult(null);
			
			Student std = studentRepository.findById(hueDto.getStdNo()).get();
			std.setStatus("S2"); // 휴학으로 상태 변경
			studentRepository.save(std);
			
			HuehakAndBokhak hb = new HuehakAndBokhak();
			hb.setStudent(std);
			hb.setType(hueDto.getType());
			hb.setAppSem(hueDto.getHueSem());
			hb.setStatus("H");
			hbres.save(hb);

		}
		
		hueres.save(huehak);
	}
	
	@Override // 학사 공지 게시판 전체 출력 (페이징)
    public List<NoticeBoardDto> noticeBrdList(PageInfo pageInfo, String type, String word) {
    	PageRequest pageRequest = PageRequest.of(pageInfo.getCurPage()-1, 7, Sort.by(Sort.Direction.DESC, "nbNo"));
		Page<NoticeBoard> pages = null;

		if (word==null || word.trim().equals("")) { // 목록 조회
			pages = nbres.findAll(pageRequest);
		} else { // 검색
			if (type.equals("title")) {
				pages = nbres.findByTitleContains(word, pageRequest);
			} else if (type.equals("content")) {
				pages = nbres.findByContentContains(word, pageRequest);
			} else if (type.equals("writer")) {
				pages = nbres.findByStaffStfNo(word, pageRequest);
			}
		}
		pageInfo.setAllPage(pages.getTotalPages()); // 전체 페이지의 수

		int startPage = (pageInfo.getCurPage()-1)/10*10+1;
		int endPage = Math.min(startPage+10-1, pageInfo.getAllPage());

		pageInfo.setStartPage(startPage);
		pageInfo.setEndPage(endPage);

		List<NoticeBoardDto> brdDtoList = new ArrayList<>();
		for (NoticeBoard brd : pages.getContent()) {
			brdDtoList.add(brd.toNoticeBoardDto()); // 반복문으로 객체에 데이터 넣어주기..
		}

		return brdDtoList;
    	
    }
	
	@Override // 필독 게시물
	public List<NoticeBoardDto> requiredBrdLsit() {
		List<NoticeBoard> rbrdList = nbres.findTop3ByIsRequiredOrderByWriteDtDesc(true);
		List<NoticeBoardDto> rbrdDtoList = new ArrayList<>();
		for (NoticeBoard rbrd : rbrdList) {
			NoticeBoardDto rbrdDto = rbrd.toNoticeBoardDto();
			rbrdDtoList.add(rbrdDto);
		}
		
		return rbrdDtoList;
	}
	
	@Override // 게시물 작성
	public void noticeWrite(NoticeBoardDto nbrdDto) {
		NoticeBoard nbrd = nbrdDto.toNoticeBoard();
		nbrd.setViewCount(0);
		nbres.save(nbrd);
	}

    

	
}
