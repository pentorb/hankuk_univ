package com.kosta.hankuk.service;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.kosta.hankuk.dto.ColleageDto;
import com.kosta.hankuk.dto.MajorDto;
import com.kosta.hankuk.dto.ProfessorDto;
import com.kosta.hankuk.dto.StudentDto;
import com.kosta.hankuk.entity.Major;
import com.kosta.hankuk.entity.Professor;
import com.kosta.hankuk.entity.Student;
import com.kosta.hankuk.repository.ColleageRepository;
import com.kosta.hankuk.repository.MajorRepository;
import com.kosta.hankuk.repository.ProfessorRepository;
import com.kosta.hankuk.repository.StudentRepository;

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
    public void updateStudents(List<Student> students) {
        for (Student student : students) {
            Student existingStudent = studentRepository.findById(student.getId()).orElse(null);
            if (existingStudent != null) {
                existingStudent.setName(student.getName());
                existingStudent.setTel(student.getTel());
                studentRepository.save(existingStudent);
            }
        }
    }

    @Override
    public void updateProfessors(List<Professor> professors) {
        for (Professor professor : professors) {
            Professor existingProfessor = professorRepository.findById(professor.getId()).orElse(null);
            if (existingProfessor != null) {
                existingProfessor.setName(professor.getName());
                existingProfessor.setTel(professor.getTel());
                professorRepository.save(existingProfessor);
            }
        }
    }

    @Override
    public List<StudentDto> searchStudents(String name, String colleage, String major) {
        if (name != null && !name.isEmpty()) {
            return studentRepository.findByNameContaining(name).stream()
                    .map(student -> new StudentDto(
                            student.getStdNo(),
                            student.getPassword(),
                            student.getName(),
                            student.getTel(),
                            student.getAddr(),
                            student.getDetailAddr(),
                            student.getPostCode(),
                            student.getGender(),
                            student.getBirthday(),
                            student.getEmail(),
                            student.getEmailDo(),
                            student.getStatus(),
                            student.getProfile(),
                            student.getFinCredit(),
                            student.getFinSem(),
                            student.getProfessor().getProfNo(),
                            student.getProfessor().getName(),
                            student.getMajor().getName(),
                            student.getMajor().getMajCd()
                    ))
                    .collect(Collectors.toList());
        } else if (colleage != null && major == null) {
            return studentRepository.findByMajor_Colleage_name(colleage).stream()
                    .map(student -> new StudentDto(
                            student.getStdNo(),
                            student.getPassword(),
                            student.getName(),
                            student.getTel(),
                            student.getAddr(),
                            student.getDetailAddr(),
                            student.getPostCode(),
                            student.getGender(),
                            student.getBirthday(),
                            student.getEmail(),
                            student.getEmailDo(),
                            student.getStatus(),
                            student.getProfile(),
                            student.getFinCredit(),
                            student.getFinSem(),
                            student.getProfessor().getProfNo(),
                            student.getProfessor().getName(),
                            student.getMajor().getName(),
                            student.getMajor().getMajCd()
                    ))
                    .collect(Collectors.toList());
        } else if (major != null) {
            return studentRepository.findByMajor(major).stream()
                    .map(student -> new StudentDto(
                            student.getStdNo(),
                            student.getPassword(),
                            student.getName(),
                            student.getTel(),
                            student.getAddr(),
                            student.getDetailAddr(),
                            student.getPostCode(),
                            student.getGender(),
                            student.getBirthday(),
                            student.getEmail(),
                            student.getEmailDo(),
                            student.getStatus(),
                            student.getProfile(),
                            student.getFinCredit(),
                            student.getFinSem(),
                            student.getProfessor().getProfNo(),
                            student.getProfessor().getName(),
                            student.getMajor().getName(),
                            student.getMajor().getMajCd()
                    ))
                    .collect(Collectors.toList());
        }
        return studentRepository.findAll().stream()
                .map(student -> new StudentDto(
                        student.getStdNo(),
                        student.getPassword(),
                        student.getName(),
                        student.getTel(),
                        student.getAddr(),
                        student.getDetailAddr(),
                        student.getPostCode(),
                        student.getGender(),
                        student.getBirthday(),
                        student.getEmail(),
                        student.getEmailDo(),
                        student.getStatus(),
                        student.getProfile(),
                        student.getFinCredit(),
                        student.getFinSem(),
                        student.getProfessor().getProfNo(),
                        student.getProfessor().getName(),
                        student.getMajor().getName(),
                        student.getMajor().getMajCd()
                ))
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
                            professor.getMajor().getMajCd()
                    ))
                    .collect(Collectors.toList());
        } else if (colleage != null && major != null) {
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
                            professor.getMajor().getMajCd()
                    ))
                    .collect(Collectors.toList());
        } else if (major != null) {
            return professorRepository.findByMajor(major).stream()
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
                            professor.getMajor().getMajCd()
                    ))
                    .collect(Collectors.toList());
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
                        professor.getMajor().getMajCd()
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

            for (Row row : sheet) {
                if (row.getRowNum() == 0) continue; 

                String name = row.getCell(0).getStringCellValue();
                String majorName = row.getCell(1).getStringCellValue();
                String tel = row.getCell(2).getStringCellValue();
                String gender = row.getCell(3).getStringCellValue();
                
                Major major = majorRepository.findByName(majorName).orElse(null);

                if ("student".equalsIgnoreCase(category)) {
                    Student student = new Student();
                    student.setStdNo(generateUniqueStudentId());
                    student.setName(name);
                    student.setTel(tel);
                    student.setGender(gender);
                    student.setMajor(major);
                    student.setPassword(passwordEncoder.encode("1234"));
                    students.add(student);
                } else if ("professor".equalsIgnoreCase(category)) {
                    Professor professor = new Professor();
                    professor.setProfNo(generateUniqueProfessorId());
                    professor.setName(name);
                    professor.setTel(tel);
                    professor.setGender(gender);
                    professor.setMajor(major); 
                    professor.setPassword(passwordEncoder.encode("1234")); 
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

}
