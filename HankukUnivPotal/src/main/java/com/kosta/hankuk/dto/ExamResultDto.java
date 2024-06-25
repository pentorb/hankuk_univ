package com.kosta.hankuk.dto;

import com.kosta.hankuk.entity.Exam;
import com.kosta.hankuk.entity.ExamResult;
import com.kosta.hankuk.entity.Student;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class ExamResultDto {
	private Integer erNo;
	private Integer totalScore;
	private Integer examNo;
	private String sect;
	private String stdNo;
	private String lecNo;
	
	public ExamResult toExamResult() {
		return ExamResult.builder()
				.erNo(erNo)
				.totalScore(totalScore)
				.exam(Exam.builder().examNo(examNo).build())
				.student(Student.builder().stdNo(stdNo).build())
				.build();
	}

}
