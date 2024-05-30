package com.kosta.hankuk.dto;

import java.sql.Date;

import com.kosta.hankuk.entity.Exam;
import com.kosta.hankuk.entity.Lecture;

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
public class ExamDto {
	private Integer examNo;
	private String div;
	private Date startDt;
	private Date EndDt;
	private Integer Qnum;
	private String type;
	private String lecNo;
	
	public Exam toExam() {
		return Exam.builder()
				.examNo(examNo)
				.div(div)
				.startDt(startDt)
				.EndDt(EndDt)
				.Qnum(Qnum)
				.type(type)
				.lecture(Lecture.builder().lecNo(lecNo).build())
				.build();
	}

}
