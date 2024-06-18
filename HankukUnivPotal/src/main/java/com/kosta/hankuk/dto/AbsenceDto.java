package com.kosta.hankuk.dto;

import java.sql.Date;

import com.kosta.hankuk.entity.Absence;
import com.kosta.hankuk.entity.Lesson;
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
public class AbsenceDto {
	private Integer absNo;
	private Date regDt;
	private String content;
	private String files;
	private String type;
	private String status;
	private String stdNo;
	private String stdName;
	private Integer lessonNo;
	private Integer week;
	private Integer lessonCnt;
	
	public Absence toAbsence() {
		return Absence.builder()
				.absNo(absNo)
				.regDt(regDt)
				.content(content)
				.files(files)
				.type(type)
				.status(status)
				.student(Student.builder().stdNo(stdNo).build())
				.lesson(Lesson.builder().lessonNo(lessonNo).build())
				.build();
	}
}
