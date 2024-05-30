package com.kosta.hankuk.dto;

import com.kosta.hankuk.entity.ExamQues;
import com.kosta.hankuk.entity.ExamQuesSub;
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
public class ExamQuesSubDto {
	private Integer eqsNo;
	private String stdNo;
	private Integer eqNo;
	private String answer;
	
	public ExamQuesSub toExamQuesSub() {
		return ExamQuesSub.builder()
				.eqsNo(eqsNo)
				.student(Student.builder().stdNo(stdNo).build())
				.examQues(ExamQues.builder().eqNo(eqNo).build())
				.answer(answer)
				.build();
	}
}
