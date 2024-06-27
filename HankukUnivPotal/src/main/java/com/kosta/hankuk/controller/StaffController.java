package com.kosta.hankuk.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.kosta.hankuk.dto.ColleageDto;
import com.kosta.hankuk.dto.HuehakDto;
import com.kosta.hankuk.dto.MajorDto;
import com.kosta.hankuk.dto.NoticeBoardDto;
import com.kosta.hankuk.dto.ProfessorDto;
import com.kosta.hankuk.dto.StudentDto;
import com.kosta.hankuk.dto.SubjectDto;
import com.kosta.hankuk.service.StaffService;
import com.kosta.hankuk.util.PageInfo;

@RestController
public class StaffController {

    @Autowired
    private StaffService staffService;
    
    @PostMapping("/registerStudent")
    public ResponseEntity<String> registerStudent(@RequestBody Map<String, Object> payload) {
        try {
            String stdNo = String.valueOf(payload.get("id"));
            String name = (String) payload.get("name");
            String tel = (String) payload.get("tel");
            String password = String.valueOf(payload.get("password"));
            String majorId = String.valueOf(payload.get("major"));
            String profId = String.valueOf(payload.get("professor"));

            
            staffService.registerStudentByOne(stdNo, name, tel, password, majorId, profId);
            return new ResponseEntity<String>("학생이 성공적으로 등록되었습니다.", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<String>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/registerProfessor")
    public ResponseEntity<String> registerProfessor(@RequestBody Map<String, Object> payload) {
        try {
            String profNo = String.valueOf(payload.get("id"));
            String name = (String) payload.get("name");
            String tel = (String) payload.get("tel");
            String password = String.valueOf(payload.get("password"));
            String majorId = String.valueOf(payload.get("major"));
            
            staffService.registerProfessorByOne(profNo, name, tel, password, majorId);
            return new ResponseEntity<String>("학생이 성공적으로 등록되었습니다.",HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<String>("학생 등록 중 오류가 발생했습니다: "+e.getMessage(),
            		HttpStatus.BAD_REQUEST);
        }
    }
    
    @PostMapping("/updateStudents")
    public ResponseEntity<String> updateStudents(@RequestBody List<Map<String, Object>> students) {
        try {
            staffService.updateStudents(students);
            return new ResponseEntity<String>("학생이 성공적으로 업데이트 되었습니다", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<String>("Error updating students: "+e.getMessage(),
            		HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/updateProfessors")
    public ResponseEntity<String> updateProfessors(@RequestBody List<Map<String, Object>> professors) {
        try {
            staffService.updateProfessors(professors);
            return ResponseEntity.ok("학생이 성공적으로 업데이트 되었습니다");
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<String>("Error updating students: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/createStudentId")
    public ResponseEntity<String> createStudentId() {
        String newStudentId = staffService.generateUniqueStudentId();
        return new ResponseEntity<String>(newStudentId,HttpStatus.OK);
    }

    @GetMapping("/createProfessorId")
    public ResponseEntity<String> createProfessorId() {
        String newProfessorId = staffService.generateUniqueProfessorId();
        return new ResponseEntity<String>(newProfessorId,HttpStatus.OK);
    }

    @GetMapping("/colleagesSearchList")
    public ResponseEntity<List<ColleageDto>> getcolleagesSearchList() {
        List<ColleageDto> colleages = staffService.getAllColleages();
        return new ResponseEntity<List<ColleageDto>>(colleages,HttpStatus.OK);
    }

    @GetMapping("/majorsBycolleage")
    public ResponseEntity<List<MajorDto>> getMajorsByColleage(@RequestParam String colCd) {
        List<MajorDto> majors = staffService.getMajorsByColleage(colCd);
        return new ResponseEntity<List<MajorDto>>(majors,HttpStatus.OK);
    }
    
    @GetMapping("/professorsByMajor")
    public ResponseEntity<List<Map<String, String>>> getProfessorsByMajor(@RequestParam String majCd) {
        List<Map<String, String>> professors = staffService.getProfessorsByMajor(majCd);
        return new ResponseEntity<List<Map<String, String>>>(professors,HttpStatus.OK);
    }
    
    @GetMapping("/searchStudents")
    public ResponseEntity<List<StudentDto>> searchStudents(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String colleage,
            @RequestParam(required = false) String major) {
        List<StudentDto> students = staffService.searchStudents(name, colleage, major);
        return new ResponseEntity<List<StudentDto>>(students, HttpStatus.OK);
    }

    @GetMapping("/searchProfessors")
    public ResponseEntity<List<ProfessorDto>> searchProfessors(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String colleage,
            @RequestParam(required = false) String major) {
        List<ProfessorDto> professors = staffService.searchProfessors(name, colleage, major);
        return new ResponseEntity<List<ProfessorDto>>(professors, HttpStatus.OK);
    }

    @PostMapping("/deleteStudents")
    public ResponseEntity<String> deleteStudents(@RequestBody List<String> studentIds) {
        staffService.deleteStudents(studentIds);
        return new ResponseEntity<String>("Students deleted successfully", HttpStatus.OK);
    }

    @PostMapping("/deleteProfessors")
    public ResponseEntity<String> deleteProfessors(@RequestBody List<String> professorIds) {
        staffService.deleteProfessors(professorIds);
        return new ResponseEntity<String>("Professors deleted successfully", HttpStatus.OK);
    }

    @PostMapping("/createMajor")
    public ResponseEntity<String> createMajor(@RequestBody Map<String, Object> majorData) {
        try {
            staffService.createMajor(majorData);
            return new ResponseEntity<String>("학과가 성공적으로 개설되었습니다.", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>("학과 개설 중 오류가 발생했습니다.", HttpStatus.BAD_REQUEST);
        }
    }
    
    @PostMapping("/uploadExcel")
    public ResponseEntity<String> uploadExcel(@RequestParam("category") String category, @RequestParam("file") MultipartFile file) {
        try {
            staffService.saveDataFromExcel(category, file);
            return new ResponseEntity<String>("Data uploaded and saved successfully", HttpStatus.OK);
        } catch (Exception e) {
			e.printStackTrace();
            return new ResponseEntity<String>("Failed to upload data: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    
    @GetMapping("/searchMajors")
    public ResponseEntity<List<Map<String, Object>>> searchMajors(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String colleage) {
        List<Map<String, Object>> majors = staffService.searchMajors(name, colleage);
        return new ResponseEntity<List<Map<String, Object>>>(majors, HttpStatus.OK);
    }
    
    
    @GetMapping("/checkMajorCode")
    public ResponseEntity<Boolean> checkMajorCode(@RequestParam String majCd) {
        boolean exists = staffService.checkMajorCode(majCd);
        return new ResponseEntity<Boolean>(exists, HttpStatus.OK);
    }
    
    @GetMapping("/createMajor")
    public ResponseEntity<List<Map<String, Object>>> createMajor(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String colleage) {
        List<Map<String, Object>> majors = staffService.searchMajors(name, colleage);
        return new ResponseEntity<List<Map<String, Object>>>(majors, HttpStatus.OK);
    }
    
    
    @GetMapping("/majorsinformation")
    public ResponseEntity<MajorDto> getMajorDetail(
            @RequestParam String majCd) {
        
        MajorDto major = staffService.getMajorByCode(majCd);
        
        if (major != null) {
            return new ResponseEntity<MajorDto>(major, HttpStatus.OK);
        } else {
            return new ResponseEntity<MajorDto>(HttpStatus.BAD_REQUEST);
        }
    }
    
    @GetMapping("/subjectsByMajor")
    public ResponseEntity<List<SubjectDto>> getSubjectsByMajor(@RequestParam("majCd") String majCd) {
        try {
            List<SubjectDto> subjects = staffService.findSubjectsByMajor(majCd);
            return new ResponseEntity<List<SubjectDto>>(subjects, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<List<SubjectDto>>(HttpStatus.BAD_REQUEST);
        }
    }
    
    
    @PutMapping("/updatemajors/{majCd}")
    public ResponseEntity<String> updateMajor(
        @PathVariable String majCd,
        @RequestBody MajorDto majorDto) {
            staffService.updateMajor(majCd, majorDto);
            return new ResponseEntity<String>("학과 정보가 성공적으로 업데이트되었습니다.", HttpStatus.OK);
    }
    
    @PostMapping("/addSubject")
    public ResponseEntity<Boolean> addSubject(@RequestBody Map<String, Object> subjectData) {
        try {
            System.out.println("Received subject data: " + subjectData);

            staffService.addSubject(subjectData);
            return new ResponseEntity<Boolean>(true, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<Boolean>(HttpStatus.BAD_REQUEST);
        }
    }
    
    @PostMapping("/updateHeadProfessor")
    public ResponseEntity<String> updateHeadProfessor(@RequestParam String majCd, @RequestParam String profNo) {
        try {
            staffService.updateHeadProfessor(majCd, profNo);
            return new ResponseEntity<String>("Head professor updated successfully", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<String>("Failed to update head professor: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    
    @PostMapping("/deleteSubjects")
    public ResponseEntity<String> deleteSubjects(@RequestBody List<String> subjectCodes) {
        try {
            staffService.deleteSubjects(subjectCodes);
            return new ResponseEntity<String>("Subjects successfully deleted.", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<String>("Failed to delete subjects: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    
    @PostMapping("/uploadSubjectExcel")
    public ResponseEntity<String> uploadSubjectExcel(@RequestParam("majCd") String majCd, @RequestParam("file") MultipartFile file) {
        try {
            staffService.saveSubjectFromExcel(majCd, file);
            return new ResponseEntity<String>("Data uploaded and saved successfully", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<String>("Failed to upload data: " + e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }
 
    @GetMapping("/searchREQLecture")
    public ResponseEntity<List<Map<String, Object>>> searchREQLecture(
        @RequestParam(required = false) String name,
        @RequestParam(required = false) String colleage,
        @RequestParam(required = false) String major
    ) {
        try {
            List<Map<String, Object>> lectures = staffService.searchREQLecture(name, colleage, major);
            return new ResponseEntity<List<Map<String, Object>>>(lectures, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<List<Map<String, Object>>>(HttpStatus.BAD_REQUEST);
        }
    }
    
    @PostMapping("/approveLecture")
    public ResponseEntity<String> approveLecture(@RequestBody Map<String, String> request) {
        String lecNo = request.get("lecNo");
        try {
            staffService.updateLectureStatus(lecNo, "APPR");
            return new ResponseEntity<String>("Lecture approved successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>("Failed to approve lecture: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/rejectLecture")
    public ResponseEntity<String> rejectLecture(@RequestBody Map<String, String> request) {
        String lecNo = request.get("lecNo");
        try {
            staffService.updateLectureStatus(lecNo, "REJ");
            return new ResponseEntity<String>("Lecture rejected successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>("Failed to reject lecture: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    
    
    @GetMapping("/allHBList")
    public ResponseEntity<Map<String,Object>> allHueList(@RequestParam(name="page", required = false, defaultValue="1") Integer page,
    													 @RequestParam(name="type", required = false) String type) {
    	Map<String,Object> res = new HashMap<>();
    	try {
    		PageInfo pageInfo = PageInfo.builder().curPage(page).build();
    		List<HuehakDto> hbList = staffService.hbListByPage(pageInfo, type);
    		res.put("allhbList", hbList);
    		res.put("pageInfo", pageInfo);
    		return new ResponseEntity<Map<String,Object>>(res, HttpStatus.OK);
    	} catch(Exception e) {
    		e.printStackTrace();
			return new ResponseEntity<Map<String,Object>>(HttpStatus.BAD_REQUEST);
    	}
    }
    
    @PostMapping("/hueStatus")
    public ResponseEntity<String> huehakModify (@ModelAttribute HuehakDto hueDto) {
    	try {
    		staffService.huebokModify(hueDto);
			System.out.println(hueDto);
			return new ResponseEntity<String>("휴학상태변경완료", HttpStatus.OK);
		} catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>(HttpStatus.BAD_REQUEST);
		}
    }
    
    @GetMapping("/NoticeBrdList")
    public ResponseEntity<Map<String, Object>> NoticeBrdList(@RequestParam(name="page", required = false, defaultValue="1") Integer page,
    		                                                 @RequestParam(name="type", required = false) String type,
    		                                                 @RequestParam(name="word", required = false) String word) {
    	Map<String,Object> res = new HashMap<>();
    	try {
    		PageInfo pageInfo = PageInfo.builder().curPage(page).build();
    		List<NoticeBoardDto> nbrdList = staffService.noticeBrdList(pageInfo, type, word);
    		List<NoticeBoardDto> rbrdList = staffService.requiredBrdLsit();
    		res.put("nbrdList", nbrdList);
    		res.put("rbrdList", rbrdList);
			res.put("pageInfo", pageInfo);
    		return new ResponseEntity<Map<String,Object>>(res, HttpStatus.OK);
    	} catch(Exception e) {
    		e.printStackTrace();
    		return new ResponseEntity<Map<String,Object>>(HttpStatus.BAD_REQUEST);
    	}
    	
    }

    
    @PostMapping("/NoticeWrite")
    public ResponseEntity<String> noticeWrite(@ModelAttribute NoticeBoardDto nbrdDto) {
    	try {
    		staffService.noticeWrite(nbrdDto);
			return new ResponseEntity<String>("학사공지 작성 완료", HttpStatus.OK);
    	} catch(Exception e) {
    		e.printStackTrace();
    		return new ResponseEntity<String>(HttpStatus.BAD_REQUEST);
    	}
    }
}
