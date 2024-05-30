package com.kosta.hankuk.dto;

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
public class LessonDto {
	private Integer lessonNo;
	private Integer week;
	private Integer lessonCnt;
	private String videoFile;
	private String lecNo;
	
	public Lesson toLesson() {
		return Lesson.builder()
				.lessonNo(lessonNo)
				.week(week)
				.lessonCnt(lessonCnt)
				.videoFile(videoFile)
				.lecture(Lecture.builder().lecNo(lecNo).build())
				.build();
	}
}
