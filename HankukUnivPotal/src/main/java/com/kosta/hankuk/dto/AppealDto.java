package com.kosta.hankuk.dto;

import java.sql.Date;

import com.kosta.hankuk.entity.Appeal;
import com.kosta.hankuk.entity.Lecture;
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
public class AppealDto {
	private Integer appNo;
	private String status;
	private String content;
	private String files;
	private String answer;
	private Date reqDt;
	private String lecNo;
	private String stdNo;
	private String stdName;
	
	public Appeal toAppeal() {
		return Appeal.builder()
				.appNo(appNo)
				.status(status)
				.content(content)
				.files(files)
				.answer(answer)
				.reqDt(reqDt)
				.lecture(Lecture.builder().lecNo(lecNo).build())
				.student(Student.builder().stdNo(stdNo).build())
				.build();
	}
}
