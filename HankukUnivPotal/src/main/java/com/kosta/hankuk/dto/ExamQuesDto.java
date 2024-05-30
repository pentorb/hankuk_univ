package com.kosta.hankuk.dto;

import com.kosta.hankuk.entity.Exam;
import com.kosta.hankuk.entity.ExamQues;

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
public class ExamQuesDto {
	private Integer eqNo;
	private Integer examNo;
	private Integer quesNo;
	private String question;
	private String answer;
	private Integer point;
	private String choice1;
	private String choice2;
	private String choice3;
	private String choice4;
	
	public ExamQues toExamQues() {
		return ExamQues.builder()
				.eqNo(eqNo)
				.exam(Exam.builder().examNo(examNo).build())
				.quesNo(quesNo)
				.question(question)
				.answer(answer)
				.point(point)
				.choice1(choice1)
				.choice2(choice2)
				.choice3(choice3)
				.choice4(choice4)
				.build();
	}
	
}
