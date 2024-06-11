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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.kosta.hankuk.entity.Colleage;
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
    private ColleageRepository collegeRepository;

    @Autowired
    private MajorRepository majorRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

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
    public List<Student> searchStudents(String name, String colleage, String major) {
        if (name != null && !name.isEmpty()) {
            return studentRepository.findByNameContaining(name);
        } else if (colleage != null && major != null) {
//            return studentRepository.findByColleageAndMajor(colleage, major);
        	return null;
        } else if (major != null) {
            return studentRepository.findByMajor(major);
        }
        return studentRepository.findAll();
    }

    @Override
    public List<Professor> searchProfessors(String name, String colleage, String major) {
        if (name != null && !name.isEmpty()) {
            return professorRepository.findByNameContaining(name);
        } else if (colleage != null && major != null) {
        	
            //return professorRepository.findByColleageAndMajor(colleage, major);
        	return null;
        } else if (major != null) {
            return professorRepository.findByMajor(major);
        }
        return professorRepository.findAll();
    }

    @Override
    public List<String> getAllColleges() {
        return collegeRepository.findAll().stream()
                                 .map(Colleage::getName)
                                 .collect(Collectors.toList());
    }

    @Override
    public List<String> getMajorsByColleage(String colCd) {
//       return majorRepository.findByColleageId(colCd).stream()
//                              .map(Major::getName)
//                              .collect(Collectors.toList());
    	return null;
    }

    @Override
    public void saveDataFromExcel(String category, MultipartFile file) throws Exception {
        List<Student> students = new ArrayList<>();
        List<Professor> professors = new ArrayList<>();

        try (InputStream inputStream = file.getInputStream()) {
            Workbook workbook = WorkbookFactory.create(inputStream);
            Sheet sheet = workbook.getSheetAt(0);

            for (Row row : sheet) {
                if (row.getRowNum() == 0) continue; // 헤더 무시

                String name = row.getCell(0).getStringCellValue();
                String major = row.getCell(2).getStringCellValue();

                if ("student".equalsIgnoreCase(category)) {
                    Student student = new Student();
                    student.setStdNo(generateUniqueStudentId());
                    student.setName(name);
                    //student.setMajor(major);
                    student.setPassword("1234"); // 기본 비밀번호 설정
                    students.add(student);
                } else if ("professor".equalsIgnoreCase(category)) {
                    Professor professor = new Professor();
                    professor.setProfNo(generateUniqueProfessorId());
                    professor.setName(name);
                    //professor.setMajor(major);
                    professor.setPassword("1234"); // 기본 비밀번호 설정
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
