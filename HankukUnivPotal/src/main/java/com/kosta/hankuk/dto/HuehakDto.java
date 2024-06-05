package com.kosta.hankuk.dto;

import java.sql.Date;

import com.kosta.hankuk.entity.Huehak;
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
public class HuehakDto {
	private Integer hueNo;
	private String stdNo;
	private String rejResult;
	private Date appDt;
	private String status;
	private String sect;
	private String reason;
	private String type;
	private String files;
	private String hueSem;
	
	public Huehak toHuehak() {
		return Huehak.builder()
				.hueNo(hueNo)
				.student(Student.builder().stdNo(stdNo).build())
				.rejResult(rejResult)
				.appDt(appDt)
				.status(status)
				.sect(sect)
				.reason(reason)
				.type(type)
				.files(files)
				.hueSem(hueSem)
				.build();
	}
}
