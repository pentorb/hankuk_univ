package com.kosta.hankuk.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.kosta.hankuk.dto.LessonDto;

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
public class Lesson {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) // auto increment
	private Integer lessonNo;
	@Column // 주차
	private Integer week;
	
	@Column // 차시
	private Integer lessonCnt;
	@Column
	private String videoFile;

	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="lecNo")
	private Lecture lecture;
	
	@OneToMany(mappedBy="lesson", fetch=FetchType.LAZY)
	private List<LessonData> lesDataList = new ArrayList<>();
	
	public LessonDto toLessonDto() {
		return LessonDto.builder()
				.lessonNo(lessonNo)
				.week(week)
				.lessonCnt(lessonCnt)
				.videoFile(videoFile)
				.lecNo(lecture.getLecNo())
				.build();
	}
}
