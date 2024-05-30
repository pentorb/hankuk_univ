package com.kosta.hankuk.dto;

import com.kosta.hankuk.entity.Attendance;
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
public class AttendanceDto {
	private Integer attNo;
	private String stdNo;
	private Integer lessonNo;
	private String status;
	
	public Attendance toAttendacne() {
		return Attendance.builder()
				.attNo(attNo)
				.student(Student.builder().stdNo(stdNo).build())
				.lesson(Lesson.builder().lessonNo(lessonNo).build())
				.status(status)
				.build();
	}
}
