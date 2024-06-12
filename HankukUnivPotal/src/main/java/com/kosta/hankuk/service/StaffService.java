package com.kosta.hankuk.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.kosta.hankuk.dto.ColleageDto;
import com.kosta.hankuk.dto.MajorDto;
import com.kosta.hankuk.dto.ProfessorDto;
import com.kosta.hankuk.dto.StudentDto;
import com.kosta.hankuk.entity.Professor;
import com.kosta.hankuk.entity.Student;

public interface StaffService {

    String generateUniqueStudentId();
    String generateUniqueProfessorId();

    void registerStudent(Student student);
    void registerProfessor(Professor professor);

    void deleteStudents(List<String> studentIds);
    void deleteProfessors(List<String> professorIds);

    void updateStudents(List<Student> students);
    void updateProfessors(List<Professor> professors);

    List<StudentDto> searchStudents(String name, String colleage, String major);
    List<ProfessorDto> searchProfessors(String name, String colleage, String major);

    List<ColleageDto> getAllColleages();
    List<MajorDto> getMajorsByColleage(String colCd);

    void saveDataFromExcel(String category, MultipartFile file) throws Exception;
}