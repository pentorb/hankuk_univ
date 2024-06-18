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

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;

import com.kosta.hankuk.dto.AbsenceDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


/*
 *  공결 유형
 ----------------
	일반 - 01
	병결 - 02
	여학생공결 - 44
	예비군 - 21
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@DynamicInsert
public class Absence {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer absNo;
	
	@Column
	@CreationTimestamp
	private Date regDt;
	
	@Column
	private String content;
	@Column
	private String files;
	@Column
	private String type;
	
	@Column
	@ColumnDefault("'NEW'")
	private String status;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="lessonNo")
	private Lesson lesson;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="stdNo")
	private Student student;
	
	public AbsenceDto toAbsencDto() {
		return AbsenceDto.builder()
				.absNo(absNo)
				.regDt(regDt)
				.content(content)
				.files(files)
				.type(type)
				.status(status)
				.stdNo(student.getStdNo())
				.stdName(student.getName())
				.lessonNo(lesson.getLessonNo())
				.week(lesson.getWeek())
				.lessonCnt(lesson.getLessonCnt())
				.build();
	}
	
}
