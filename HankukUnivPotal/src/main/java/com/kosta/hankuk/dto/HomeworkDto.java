package com.kosta.hankuk.dto;

import java.sql.Date;

import com.kosta.hankuk.entity.Homework;
import com.kosta.hankuk.entity.Lecture;
import com.kosta.hankuk.entity.Lesson;

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
public class HomeworkDto {
	private Integer hwNo;
	private Date regDt;
	private Date startDt;
	private Date endDt;
	private String title;
	private String content;
	private String files;
	private String lecNo;
	private Integer lessonNo;
	private Integer week;
	private Integer lessonCnt;
	
	public Homework toHomework() {
		return Homework.builder()
				.hwNo(hwNo)
				.startDt(startDt)
				.endDt(endDt)
				.title(title)
				.content(content)
				.files(files)
				.lecture(Lecture.builder().lecNo(lecNo).build())
				.lesson(Lesson.builder().lessonNo(lessonNo).build())
				.build();
	}
}
