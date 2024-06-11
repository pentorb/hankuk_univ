package com.kosta.hankuk.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.kosta.hankuk.entity.Student;
import com.kosta.hankuk.entity.Professor;
import com.kosta.hankuk.service.StaffService;

@RestController
public class StaffController {

    @Autowired
    private StaffService staffService;

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

    @GetMapping("/collegesSearchList")
    public ResponseEntity<List<String>> getCollegesSearchList() {
        List<String> colleges = staffService.getAllColleges();
        return ResponseEntity.ok(colleges);
    }

    @GetMapping("/majorsByCollege")
    public ResponseEntity<List<String>> getMajorsByCollege(@RequestParam String colCd) {
        List<String> majors = staffService.getMajorsByColleage(colCd);
        return ResponseEntity.ok(majors);
    }

    @GetMapping("/searchStudents")
    public ResponseEntity<List<Student>> searchStudents(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String college,
            @RequestParam(required = false) String major) {
        List<Student> students = staffService.searchStudents(name, college, major);
        return ResponseEntity.ok(students);
    }

    @GetMapping("/searchProfessors")
    public ResponseEntity<List<Professor>> searchProfessors(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String college,
            @RequestParam(required = false) String major) {
        List<Professor> professors = staffService.searchProfessors(name, college, major);
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

    @PostMapping("/updateStudents")
    public ResponseEntity<String> updateStudents(@RequestBody List<Student> students) {
        staffService.updateStudents(students);
        return ResponseEntity.ok("Students updated successfully");
    }

    @PostMapping("/updateProfessors")
    public ResponseEntity<String> updateProfessors(@RequestBody List<Professor> professors) {
        staffService.updateProfessors(professors);
        return ResponseEntity.ok("Professors updated successfully");
    }

    @PostMapping("/uploadExcel")
    public ResponseEntity<String> uploadExcel(@RequestParam("category") String category, @RequestParam("file") MultipartFile file) {
        try {
            staffService.saveDataFromExcel(category, file);
            return ResponseEntity.ok("Data uploaded and saved successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to upload data: " + e.getMessage());
        }
    }
}
