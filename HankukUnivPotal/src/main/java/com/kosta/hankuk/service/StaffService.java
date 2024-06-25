package com.kosta.hankuk.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.web.multipart.MultipartFile;

import com.kosta.hankuk.dto.ColleageDto;
import com.kosta.hankuk.dto.HuehakDto;
import com.kosta.hankuk.dto.MajorDto;
import com.kosta.hankuk.dto.NoticeBoardDto;
import com.kosta.hankuk.dto.ProfessorDto;
import com.kosta.hankuk.dto.StudentDto;
import com.kosta.hankuk.dto.SubjectDto;
import com.kosta.hankuk.entity.Major;
import com.kosta.hankuk.entity.Professor;
import com.kosta.hankuk.entity.Student;
import com.kosta.hankuk.entity.Subject;
import com.kosta.hankuk.util.PageInfo;

public interface StaffService {

    String generateUniqueStudentId();
    String generateUniqueProfessorId();

    void registerStudentByOne(String stdNo, String name, String tel, String password, String majorId, String profId);
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
    List<Map<String, String>> getProfessorsByMajor(String majCd);


    void saveDataFromExcel(String category, MultipartFile file) throws Exception;
    //학과관리
    List<Map<String, Object>> searchMajors(String name, String colleage);
    //학과개설
    boolean checkMajorCode(String majCd);
    void createMajor(Map<String, Object> majorData) throws Exception;
    //학과관리 detail
    void saveSubjectFromExcel(String majCd, MultipartFile file) throws Exception;
    MajorDto getMajorByCode(String majCd);
    List<SubjectDto> findSubjectsByMajor(String majCd);
    void updateMajor(String majCd, MajorDto majorDto);
    Optional<Major> getMajorByCodeop(String majCd);
    void updateSubjects(List<SubjectDto> updatedSubjects) throws Exception;
    void updateHeadProfessor(String majCd, String profNo) throws Exception;
    void deleteSubjects(List<String> subjectCodes);
    Subject addSubject(Map<String, Object> subjectData) throws Exception;
    //강의개설 허락
    public List<Map<String, Object>> searchREQLecture(String name, String colleage, String major);
    void updateLectureStatus(String lecNo, String status);
    
    // 교직원 휴학 관리 
    List<HuehakDto> hbListByPage(PageInfo pageInfo, String type) throws Exception;
//    void huebokInsert(HuehakAndBokhakDto hbDto) throws Exception;
    void huebokModify(HuehakDto hueDto) throws Exception;
    List<NoticeBoardDto> noticeBrdList(PageInfo pageInfo, String type, String word) throws Exception;
    List<NoticeBoardDto> requiredBrdLsit() throws Exception;
    void noticeWrite(NoticeBoardDto nbrdDto) throws Exception;
    
    
}