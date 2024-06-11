package com.kosta.hankuk.dto;

import com.kosta.hankuk.entity.Lesson;
import com.kosta.hankuk.entity.LessonData;

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
public class LessonDataDto {
	private Integer ldNo;
	private String title;
	private String content;
	private String file;
	private Integer lessonNo;
	private String lecNo;
	private Integer week;
	private Integer lessonCnt;

	public LessonData toLessonData() {
		return LessonData.builder()
				.ldNo(ldNo)
				.title(title)
				.content(content)
				.file(file)
				.lesson(Lesson.builder().lessonNo(lessonNo).build())
				.build();
	}
}
