package com.kosta.hankuk.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import org.hibernate.annotations.DynamicInsert;

import com.kosta.hankuk.dto.StaffDto;

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
public class Staff implements User {
	@Id
	private String stfNo;
	@Column
	private String password;
	@Column
	private String dept;
	@Column
	private String profile;
	@Column
	private String tel;
	
	@OneToMany(mappedBy="staff", fetch=FetchType.LAZY)
	private List<NoticeBoard> noticeBoard = new ArrayList<>();
	
	public StaffDto toStaffDto() {
		return StaffDto.builder()
				.id(stfNo)
				.password(password)
				.dept(dept)
				.profile(profile)
				.tel(tel)
				.build();
	}
	
	@Override
	public String getId() {
		return stfNo;
	}
	
	@Override
	public String getPassword() {
		return password;
	}
	
	@Override
	public String getName() {
		return dept;
	}
	
	@Override
	public void setPassword(String enteredPassword) {
		this.password = enteredPassword;
	}
}
