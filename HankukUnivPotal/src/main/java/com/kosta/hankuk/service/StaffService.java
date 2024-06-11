package com.kosta.hankuk.service;

import java.util.List;
import org.springframework.web.multipart.MultipartFile;
import com.kosta.hankuk.entity.Student;
import com.kosta.hankuk.entity.Professor;

public interface StaffService {

    String generateUniqueStudentId();
    String generateUniqueProfessorId();

    void registerStudent(Student student);
    void registerProfessor(Professor professor);

    void deleteStudents(List<String> studentIds);
    void deleteProfessors(List<String> professorIds);

    void updateStudents(List<Student> students);
    void updateProfessors(List<Professor> professors);

    List<Student> searchStudents(String name, String colleage, String major);
    List<Professor> searchProfessors(String name, String colleage, String major);

    List<String> getAllColleges();
    List<String> getMajorsByColleage(String colCd);

    void saveDataFromExcel(String category, MultipartFile file) throws Exception;
}