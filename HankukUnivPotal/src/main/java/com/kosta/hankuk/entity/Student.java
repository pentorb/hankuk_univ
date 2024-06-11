package com.kosta.hankuk.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import com.kosta.hankuk.dto.StudentDto;

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
@Table(name="STUDENT")
public class Student implements User {
	@Id
	private String stdNo;
	
	@Column
	@ColumnDefault("1234")
	private String password;
	
	@Column
	private String name;
	@Column
	private String tel;
	@Column
	private String addr;
	@Column
	private String detailAddr;
	@Column
	private String postCode;
	@Column
	private String gender;
	
	@Column
	private Date birthday;
	@Column
	private String email;
	@Column
	private String emailDo;
	
	@Column
	@ColumnDefault("'S1'")
	private String status;
	
	@Column
	private String profile;
	
	@Column
	@ColumnDefault("0")
	private Integer finCredit;
	
	@Column
	@ColumnDefault("0")
	private Integer finSem;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="profNo")
	private Professor professor;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="majCd")
	private Major major;
	
	// 한 학생이 수강하는 강의 리스트 = 수강리스트
	@OneToMany(mappedBy="student", fetch=FetchType.LAZY)
	private List<LectureByStd> lbsList = new ArrayList<>();
	
	// 장바구니 리스트 
	@OneToMany(mappedBy="student", fetch=FetchType.LAZY)
	private List<LectureBasket> lecbasList = new ArrayList<>();

	// 출결 리스트
	@OneToMany(mappedBy="student", fetch=FetchType.LAZY)
	private List<Attendance> attList = new ArrayList<>();
	
	// 공결 리스트 
	@OneToMany(mappedBy="student", fetch=FetchType.LAZY)
	private List<Absence> absList = new ArrayList<>();
	
	// 제출 과제 리스트
	@OneToMany(mappedBy="student", fetch=FetchType.LAZY)
	private List<HomeworkSubmit> hwsList = new ArrayList<>();

	// 학기 성적 리스트 
	@OneToMany(mappedBy="student", fetch=FetchType.LAZY)
	private List<Score> scoreList = new ArrayList<>();
	
	// 이의 신청 리스트 
	@OneToMany(mappedBy="student", fetch=FetchType.LAZY)
	private List<Appeal> appList = new ArrayList<>();
	
	
	public StudentDto toStudentDto() {
		return StudentDto.builder()
				.id(stdNo)
				.password(password)
				.name(name)
				.tel(tel)
				.addr(addr)
				.detailAddr(detailAddr)
				.postCode(postCode)
				.gender(gender)
				.birthday(birthday)
				.email(email)
				.emailDo(emailDo)
				.status(status)
				.profile(profile)
				.finCredit(finCredit)
				.finSem(finSem)
				.profName(professor.getName())
				.majName(major.getName())
				.build();
	}


	@Override
	public String getId() {
		return stdNo;
	}
	
	
	@Override
	public String getPassword() {
		return password;
	}
	
	@Override
	public String getName() {
		return name;
	}
	
	@Override
	public void setPassword(String enteredPassword) {
		this.password = enteredPassword;
	}


	@Override
	public String toString() {
		return "Student [stdNo=" + stdNo + ", password=" + password + ", name=" + name + ", tel=" + tel + ", addr="
				+ addr + ", detailAddr=" + detailAddr + ", postCode=" + postCode + ", gender=" + gender + ", birthday="
				+ birthday + ", email=" + email + ", emailDo=" + emailDo + ", status=" + status + ", profile=" + profile
				+ ", finCredit=" + finCredit + ", finSem=" + finSem + "]";
	}
	
	
}
