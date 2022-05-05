package com.LoginRegistration.services;

import java.util.Optional;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import com.LoginRegistration.models.LoginRegistrationLoginUser;
import com.LoginRegistration.models.LoginRegistrationUser;
import com.LoginRegistration.repositories.LoginRegistrationRepository;

@Service
public class LoginRegistrationService {
	
	@Autowired
	private LoginRegistrationRepository lrrepo;
	
    // TO-DO: Write register and login methods!
    public LoginRegistrationUser register(LoginRegistrationUser newUser, BindingResult result) {
    	// TO-DO - Reject values or register if no errors:
        
        // Reject if email is taken (present in database)
    	if(lrrepo.findByEmail(newUser.getEmail()).isPresent()) {
    		result.rejectValue("email", "Unique", "This email is already in use. Please use another email address!");
    	}
        // Reject if password doesn't match confirmation
        if(!newUser.getPassword().equals(newUser.getConfirm())) {
        	result.rejectValue("confirm", "Matches", "Your password and confirm password must match!");
        }
        // Return null if result has errors
        if(result.hasErrors()) {
        	return null;
        }
        // Hash and set password, save user to database
        String hashed = BCrypt.hashpw(newUser.getPassword(),BCrypt.gensalt());
        newUser.setPassword(hashed);

        return lrrepo.save(newUser);
    }
    
    
    
    public LoginRegistrationUser login(LoginRegistrationLoginUser newLogin, BindingResult result) {
    	// TO-DO - Reject values:
    	// Find user in the DB by email
        // Reject if NOT present
        Optional<LoginRegistrationUser> potentialUser = lrrepo.findByEmail(newLogin.getEmail());
        if(!potentialUser.isPresent()) {
        	result.rejectValue("email", "Unique", "This email does not exist in our system.");
        	return null;
        }
        LoginRegistrationUser lRUser = potentialUser.get();
        // Reject if BCrypt password match fails
        if(!BCrypt.checkpw(newLogin.getPassword(), lRUser.getPassword())) {
        	result.rejectValue("password", "Matches", "The password does not match the password for this email.");
        	return null;
        }
        // Return null if result has errors
        if(result.hasErrors()) {
        	return null;
        } else  {
        	// Otherwise, return the user object
        	return lRUser;
        }
    	
    }
}
