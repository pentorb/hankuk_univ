package com.kosta.hankuk.entity;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.CreationTimestamp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Files {
	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer fileNo;
	@Column
	private String directory;
	@Column
	private String name;
	@Column
	private long size;
	@Column
	private String contenttype;
	
	@Column
	@CreationTimestamp
	private Date uploadDt;
}
