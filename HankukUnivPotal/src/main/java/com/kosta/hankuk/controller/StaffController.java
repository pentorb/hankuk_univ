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
import com.kosta.hankuk.dto.ProfessorDto;
import com.kosta.hankuk.dto.StudentDto;
import com.kosta.hankuk.dto.SubjectDto;
import com.kosta.hankuk.entity.Subject;
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
            
            return ResponseEntity.ok("학생이 성공적으로 등록되었습니다.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("학생 등록 중 오류가 발생했습니다: " + e.getMessage());
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
            
            return ResponseEntity.ok("학생이 성공적으로 등록되었습니다.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("학생 등록 중 오류가 발생했습니다: " + e.getMessage());
        }
    }
    
    @PostMapping("/updateStudents")
    public ResponseEntity<String> updateStudents(@RequestBody List<Map<String, Object>> students) {
        try {
            staffService.updateStudents(students);
            return ResponseEntity.ok("학생이 성공적으로 업데이트 되었습니다");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error updating students: " + e.getMessage());
        }
    }

    @PostMapping("/updateProfessors")
    public ResponseEntity<String> updateProfessors(@RequestBody List<Map<String, Object>> professors) {
        try {
            staffService.updateProfessors(professors);
            return ResponseEntity.ok("학생이 성공적으로 업데이트 되었습니다");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error updating students: " + e.getMessage());
        }
    }

    @GetMapping("/createStudentId")
    public ResponseEntity<String> createStudentId() {
        String newStudentId = staffService.generateUniqueStudentId();
        return ResponseEntity.ok(newStudentId);
    }

    @GetMapping("/createProfessorId")
    public ResponseEntity<String> createProfessorId() {
        String newProfessorId = staffService.generateUniqueProfessorId();
        return ResponseEntity.ok(newProfessorId);
    }

    @GetMapping("/colleagesSearchList")
    public ResponseEntity<List<ColleageDto>> getcolleagesSearchList() {
        List<ColleageDto> colleages = staffService.getAllColleages();
        return ResponseEntity.ok(colleages);
    }

    @GetMapping("/majorsBycolleage")
    public ResponseEntity<List<MajorDto>> getMajorsByColleage(@RequestParam String colCd) {
        List<MajorDto> majors = staffService.getMajorsByColleage(colCd);
        return ResponseEntity.ok(majors);
    }
    
    @GetMapping("/professorsByMajor")
    public ResponseEntity<List<Map<String, String>>> getProfessorsByMajor(@RequestParam String majCd) {
        List<Map<String, String>> professors = staffService.getProfessorsByMajor(majCd);
        return ResponseEntity.ok(professors);
    }
    
    @GetMapping("/searchStudents")
    public ResponseEntity<List<StudentDto>> searchStudents(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String colleage,
            @RequestParam(required = false) String major) {
        List<StudentDto> students = staffService.searchStudents(name, colleage, major);
        return ResponseEntity.ok(students);
    }

    @GetMapping("/searchProfessors")
    public ResponseEntity<List<ProfessorDto>> searchProfessors(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String colleage,
            @RequestParam(required = false) String major) {
        List<ProfessorDto> professors = staffService.searchProfessors(name, colleage, major);
        return ResponseEntity.ok(professors);
    }

    @PostMapping("/deleteStudents")
    public ResponseEntity<String> deleteStudents(@RequestBody List<String> studentIds) {
        staffService.deleteStudents(studentIds);
        return ResponseEntity.ok("Students deleted successfully");
    }

    @PostMapping("/deleteProfessors")
    public ResponseEntity<String> deleteProfessors(@RequestBody List<String> professorIds) {
        staffService.deleteProfessors(professorIds);
        return ResponseEntity.ok("Professors deleted successfully");
    }

    @PostMapping("/createMajor")
    public ResponseEntity<String> createMajor(@RequestBody Map<String, Object> majorData) {
        try {
            staffService.createMajor(majorData);
            return ResponseEntity.ok("학과가 성공적으로 개설되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("학과 개설 중 오류가 발생했습니다.");
        }
    }
    
    @PostMapping("/uploadExcel")
    public ResponseEntity<String> uploadExcel(@RequestParam("category") String category, @RequestParam("file") MultipartFile file) {
        try {
            staffService.saveDataFromExcel(category, file);
            return ResponseEntity.ok("Data uploaded and saved successfully");
        } catch (Exception e) {
			e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to upload data: " + e.getMessage());
        }
    }
    
    @GetMapping("/searchMajors")
    public ResponseEntity<List<Map<String, Object>>> searchMajors(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String colleage) {
        List<Map<String, Object>> majors = staffService.searchMajors(name, colleage);
        return ResponseEntity.ok(majors);
    }
    
    
    @GetMapping("/checkMajorCode")
    public ResponseEntity<Boolean> checkMajorCode(@RequestParam String majCd) {
        boolean exists = staffService.checkMajorCode(majCd);
        return ResponseEntity.ok(exists);
    }
    
    @GetMapping("/createMajor")
    public ResponseEntity<List<Map<String, Object>>> createMajor(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String colleage) {
        List<Map<String, Object>> majors = staffService.searchMajors(name, colleage);
        return ResponseEntity.ok(majors);
    }
    
    
    @GetMapping("/majorsinformation")
    public ResponseEntity<MajorDto> getMajorDetail(
            @RequestParam String majCd) {
        
        MajorDto major = staffService.getMajorByCode(majCd);
        
        if (major != null) {
            return ResponseEntity.ok(major);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/subjectsByMajor")
    public ResponseEntity<List<SubjectDto>> getSubjectsByMajor(@RequestParam("majCd") String majCd) {
        try {
            List<SubjectDto> subjects = staffService.findSubjectsByMajor(majCd);
            return ResponseEntity.ok(subjects);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    
    
    @PutMapping("/updatemajors/{majCd}")
    public ResponseEntity<String> updateMajor(
        @PathVariable String majCd,
        @RequestBody MajorDto majorDto) {
            staffService.updateMajor(majCd, majorDto);
            return ResponseEntity.ok("학과 정보가 성공적으로 업데이트되었습니다.");

    }
    
    @PostMapping("/addSubject")
    public ResponseEntity<Subject> addSubject(@RequestBody Map<String, Object> subjectData) {
        try {
            System.out.println("Received subject data: " + subjectData);

            Subject createdSubject = staffService.addSubject(subjectData);
            return ResponseEntity.ok(createdSubject);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    
    @PostMapping("/updateHeadProfessor")
    public ResponseEntity<String> updateHeadProfessor(@RequestParam String majCd, @RequestParam String profNo) {
        try {
            staffService.updateHeadProfessor(majCd, profNo);
            return ResponseEntity.ok("Head professor updated successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to update head professor: " + e.getMessage());
        }
    }
    
    @PostMapping("/deleteSubjects")
    public ResponseEntity<String> deleteSubjects(@RequestBody List<String> subjectCodes) {
        try {
            staffService.deleteSubjects(subjectCodes);
            return ResponseEntity.ok("Subjects successfully deleted.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to delete subjects: " + e.getMessage());
        }
    }
    
    @PostMapping("/uploadSubjectExcel")
    public ResponseEntity<String> uploadSubjectExcel(@RequestParam("majCd") String majCd, @RequestParam("file") MultipartFile file) {
        try {
            staffService.saveSubjectFromExcel(majCd, file);
            return ResponseEntity.ok("Data uploaded and saved successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to upload data: " + e.getMessage());
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
}
