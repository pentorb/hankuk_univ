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
	private String sect;
	private String startDt;
	private String endDt;
	private Integer qnum;
	private String type;
	private String lecNo;
	
	public Exam toExam() {
		return Exam.builder()
				.examNo(examNo)
				.sect(sect)
				.startDt(startDt)
				.EndDt(endDt)
				.Qnum(qnum)
				.type(type)
				.lecture(Lecture.builder().lecNo(lecNo).build())
				.build();
	}

}
