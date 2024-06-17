package com.kosta.hankuk.service;

import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.kosta.hankuk.dto.ColleageDto;
import com.kosta.hankuk.dto.HuehakDto;
import com.kosta.hankuk.dto.MajorDto;
import com.kosta.hankuk.dto.ProfessorDto;
import com.kosta.hankuk.dto.StudentDto;
import com.kosta.hankuk.entity.Professor;
import com.kosta.hankuk.entity.Student;
import com.kosta.hankuk.util.PageInfo;

public interface StaffService {

    String generateUniqueStudentId();
    String generateUniqueProfessorId();

    void registerStudentByOne(String stdNo, String name, String tel, String password, String majorId);
    void registerProfessorByOne(String profNo, String name, String tel, String password, String majorId);

    void registerStudent(Student student);
    void registerProfessor(Professor professor);

    void deleteStudents(List<String> studentIds);
    void deleteProfessors(List<String> professorIds);

    void updateStudents(List<Map<String, Object>> students);
    void updateProfessors(List<Map<String, Object>> professors);
    
    List<StudentDto> searchStudents(String name, String colleage, String major);
    List<ProfessorDto> searchProfessors(String name, String colleage, String major);

    List<ColleageDto> getAllColleages();
    List<MajorDto> getMajorsByColleage(String colCd);

    void saveDataFromExcel(String category, MultipartFile file) throws Exception;
    
    List<Map<String, Object>> searchMajors(String name, String colleage);

    
    // 교직원 휴학 관리 
    List<HuehakDto> hbListByPage(PageInfo pageInfo, String type) throws Exception;
//    void huebokInsert(HuehakAndBokhakDto hbDto) throws Exception;
    void huebokModify(HuehakDto hueDto) throws Exception;
    
}