package com.kosta.hankuk.dto;

import com.kosta.hankuk.entity.Staff;

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
public class StaffDto implements UserDto {
	private String id;
	private String password;
	private String dept;
	private String profile;
	private String tel;
	
	public Staff toStaff() {
		return Staff.builder()
				.stfNo(id)
				.password(password)
				.dept(dept)
				.profile(profile)
				.tel(tel)
				.build();
	}
}
