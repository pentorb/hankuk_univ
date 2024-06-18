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
import com.kosta.hankuk.dto.ProfessorDto;
import com.kosta.hankuk.dto.StudentDto;
import com.kosta.hankuk.entity.Huehak;
import com.kosta.hankuk.entity.HuehakAndBokhak;
import com.kosta.hankuk.entity.Major;
import com.kosta.hankuk.entity.Professor;
import com.kosta.hankuk.entity.Student;
import com.kosta.hankuk.repository.ColleageRepository;
import com.kosta.hankuk.repository.HueAndBokRepository;
import com.kosta.hankuk.repository.HuehakRepository;
import com.kosta.hankuk.repository.MajorRepository;
import com.kosta.hankuk.repository.ProfessorRepository;
import com.kosta.hankuk.repository.StudentRepository;
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
    private MajorRepository majorRepository;
    
    @Autowired
    private HuehakRepository hueres;
    
    @Autowired
    private HueAndBokRepository hbres;

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
    public void registerStudentByOne(String stdNo, String name, String tel, String password, String majorId) {
        Major major = majorRepository.findById(majorId).orElse(null);
        
        Student student = new Student();
        student.setStdNo(stdNo);
        student.setName(name);
        student.setTel(tel);
        student.setPassword(passwordEncoder.encode(password));
        student.setMajor(major);

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
							student.getMajor() != null ? student.getMajor().getName() : null,
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
							student.getMajor() != null ? student.getMajor().getName() : null,
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
								student.getMajor() != null ? student.getMajor().getName() : null,
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
						student.getMajor() != null ? student.getMajor().getName() : null,
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
				System.out.println(majorName);
				String majCd = majorRepository.findByName(majorName).map(Major::getMajCd).orElse(null);
				System.out.println(majCd);
				String professorName = professorIdx==-1 || row.getCell(professorIdx)==null? "" : row.getCell(professorIdx).getStringCellValue();
				String profCd = null;
				if(!professorName.equals("")) {
					Optional<Professor> oprofessor = professorRepository.findByName(professorName);
					if(oprofessor.isPresent()) {
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
					Professor professor = Professor.builder().profNo(generateUniqueProfessorId()).name(name).password(passwordEncoder.encode("1234"))
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

            // 학과장 찾기
            Professor headProfessor = professorRepository.findByMajor_majCdAndPosition(major.getMajCd(), "0").stream().findFirst().orElse(null);
            resultMap.put("professor", headProfessor != null ? headProfessor.getName() : "");

            return resultMap;
        }).collect(Collectors.toList());
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
	
}
