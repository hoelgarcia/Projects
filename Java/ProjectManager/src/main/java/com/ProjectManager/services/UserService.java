package com.ProjectManager.services;

import java.util.Optional;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import com.ProjectManager.models.LoginUser;
import com.ProjectManager.models.User;
import com.ProjectManager.repositories.UserRepository;

@Service
public class UserService {
	
	
@Autowired
private UserRepository userRepository;
  
	
	public User register(User newUser, BindingResult result) {
	  	  	if(userRepository.findByEmail(newUser.getEmail()).isPresent()) {
	  		result.rejectValue("email", "Unique", "This email is already in use.");
	  	}
	      if(!newUser.getPassword().equals(newUser.getConfirm())) {
	      	result.rejectValue("confirm", "Matches", "Your password and confirm password must match.");
	      }
	      if(result.hasErrors()) {
	      	return null;
	      }
	      String hashed = BCrypt.hashpw(newUser.getPassword(),BCrypt.gensalt());
	      newUser.setPassword(hashed);
	      return userRepository.save(newUser);
	  	}
	public User login(LoginUser newLogin, BindingResult result) {
	  	Optional<User> potentialUser = userRepository.findByEmail(newLogin.getEmail());
		  if(!potentialUser.isPresent()) {
		  	result.rejectValue("email", "Unique", "Email does not exist in the Database.");
		  	return null;
		  }
		  User user = potentialUser.get();
		  // Reject if BCrypt password match fails
		  if(!BCrypt.checkpw(newLogin.getPassword(), user.getPassword())) {
		  	result.rejectValue("password", "Matches", "That password does not match the password for this email.");
		  	return null;
		  }
		  if(result.hasErrors()) {
		  	return null;
		  } else  {
		      	return user;
		      }
		  	
		  }

	public User oneUser(Long id) {
	  	Optional<User> optionalUser = userRepository.findById(id);
	  	if (optionalUser.isPresent()) {
	  		return optionalUser.get();
	  	}else {
	  		return null;
	  	}
	  }
}

