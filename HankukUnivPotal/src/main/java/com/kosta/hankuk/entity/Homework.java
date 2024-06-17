package com.kosta.hankuk.entity;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.CreatedDate;

import com.kosta.hankuk.dto.HomeworkDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Homework {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer hwNo;
	
	@Column
	@CreationTimestamp
	private Date regDt;
	
	@Column
	private Date startDt;
	@Column
	private Date endDt;
	@Column
	private String title;
	@Column
	private String content;
	@Column
	private String files;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="lecNo")
	private Lecture lecture;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="lessonNo")
	private Lesson lesson;
	
	public HomeworkDto toHomeworkDto() {
		return HomeworkDto.builder()
				.hwNo(hwNo)
				.regDt(regDt)
				.startDt(startDt)
				.endDt(endDt)
				.title(title)
				.content(content)
				.files(files)
				.lecNo(lecture.getLecNo())
				.lessonNo(lesson.getLessonNo())
				.week(lesson.getWeek())
				.lessonCnt(lesson.getLessonCnt())
				.build();
	}
	
}
