package com.kosta.hankuk.dto;

import java.sql.Date;

import com.kosta.hankuk.entity.Homework;
import com.kosta.hankuk.entity.HomeworkSubmit;
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
public class HomeworkSubmitDto {
	private Integer hwsNo;
	private Integer hwNo;
	private String stdNo;
	private String stdName;
	private String files;
	private Date submitDt;
	private Date modifyDt;
	private Integer score;
	
	public HomeworkSubmit toHomeworkSubmit() {
		return HomeworkSubmit.builder()
				.hwsNo(hwsNo)
				.homework(Homework.builder().hwNo(hwNo).build())
				.student(Student.builder().stdNo(stdNo).build())
				.files(files)
				.submitDt(submitDt)
				.modifyDt(modifyDt)
				.score(score)
				.build();
	}
}
