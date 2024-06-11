package com.kosta.hankuk.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.DynamicInsert;

import com.kosta.hankuk.dto.LessonDataDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@DynamicInsert
public class LessonData {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer ldNo;
	@Column
	private String title;
	@Column
	private String content;
	@Column
	private String file;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="lessonNo")
	private Lesson lesson;
	
	public LessonDataDto toLessonDataDto() {
		return LessonDataDto.builder()
				.ldNo(ldNo)
				.title(title)
				.content(content)
				.file(file)
				.lessonNo(lesson.getLessonNo())
				.lecNo(lesson.getLecture().getLecNo())
				.week(lesson.getWeek())
				.lessonCnt(lesson.getLessonCnt())
				.build();
	}
}
