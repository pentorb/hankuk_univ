package com.kosta.hankuk.dto;

import java.sql.Date;

import com.kosta.hankuk.entity.Leave;
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
public class LeaveDto {
	private Integer leaveNo;
	private String stdNo;
	private String rejResult;
	private Date appDt;
	private String status;
	private String div;
	private String type;
	
	public Leave toLeave() {
		return Leave.builder()
				.leaveNo(leaveNo)
				.student(Student.builder().stdNo(stdNo).build())
				.rejResult(rejResult)
				.appDt(appDt)
				.status(status)
				.div(div)
				.type(type)
				.build();
	}
}
