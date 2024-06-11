package com.kosta.hankuk.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Repository;

import com.kosta.hankuk.entity.User;
import com.kosta.hankuk.util.Utils;

@Repository
public class UserRepository{
	
	@Autowired
	private ProfessorRepository professorRepository;
	
	@Autowired
	private StudentRepository studentRepository;	
	
	@Autowired
	private StaffRepository staffRepository;
		
	public User identify(String username) {
		String identification = username.substring(0,1);
		String id = username;
		if(identification.equals("P")) {
			System.out.println(identification);
//			User user = professorRepository.findById(id).get();
//			System.out.println(user.getPassword());
			return professorRepository.findById(id).get();
		} else if(identification.equals("S")) {
			System.out.println(identification);
			User user = staffRepository.findById(id).get();
			System.out.println(user.getPassword());
			return staffRepository.findById(id).get();
		} else if(Utils.isNumber(identification)){
			//User user = studentRepository.findById(id).get();
			return studentRepository.findById(id).get();
		} else {		
			throw new UsernameNotFoundException("User not found with id:"+username);
		}
		
	}

	public void save(User user) {
	}
	

}
