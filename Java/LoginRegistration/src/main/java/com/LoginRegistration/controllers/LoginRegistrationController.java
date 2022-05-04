package com.LoginRegistration.controllers;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.LoginRegistration.models.LoginRegistrationLoginUser;
import com.LoginRegistration.models.LoginRegistrationUser;
import com.LoginRegistration.services.LoginRegistrationService;

@Controller
public class LoginRegistrationController {
	private final LoginRegistrationService lrserv;
	public LoginRegistrationController(LoginRegistrationService lrserv) {
		super();
		this.lrserv = lrserv;
	}
	 @GetMapping("/")
	    public String loginregistrationpage(Model model) {
	    
	        // Bind empty User and LoginUser objects to the JSP
	        // to capture the form input
	        model.addAttribute("newUser", new LoginRegistrationUser());
	        model.addAttribute("newLogin", new LoginRegistrationLoginUser());
	        return "loginregistrationpage.jsp";
	    }
	 @PostMapping("/register")
	    public String register(@Valid @ModelAttribute("newUser") LoginRegistrationUser newUser, 
	            BindingResult result, Model model, HttpSession session) {
	        
	        // TO-DO Later -- call a register method in the service 
	        // to do some extra validations and create a new user!
	        
		 	lrserv.register(newUser, result);
		 	
	        if(result.hasErrors()) {
	            // Be sure to send in the empty LoginUser before 
	            // re-rendering the page.
	            model.addAttribute("newLogin", new LoginRegistrationLoginUser());
	            return "loginregistrationpage.jsp";
	        }
	        
	        // No errors! 
	        // TO-DO Later: Store their ID from the DB in session, 
	        // in other words, log them in.
	        session.setAttribute("user_id", newUser.getId());
	        session.setAttribute("user", newUser.getUserName());
	        return "redirect:/dashboard";
	    }
	    @PostMapping("/login")
	    public String login(@Valid @ModelAttribute("newLogin") LoginRegistrationLoginUser newLogin, 
	            BindingResult result, Model model, HttpSession session) {
	        
	        // Add once service is implemented:
	        // User user = userServ.login(newLogin, result);
	    	LoginRegistrationUser loginRegistrationUser = lrserv.login(newLogin, result);
	        if(result.hasErrors()) {
	            model.addAttribute("newUser", new LoginRegistrationUser());
	            return "loginregistrationpage.jsp";
	        }
	    
	        // No errors! 
	        // TO-DO Later: Store their ID from the DB in session, 
	        // in other words, log them in.
	        session.setAttribute("user_id", loginRegistrationUser.getId());
	        session.setAttribute("user", newLogin.getEmail());
	        return "redirect:/dashboard";
	    }
	    @GetMapping("/logout")
	    public String clear(HttpSession session) {
	    	session.invalidate();
	    	return "redirect:/";
	    }
	    @GetMapping("/dashboard")
		public String dashboard(Model model) {
			// Send our Candies to the JSP using Model model
//			model.addAttribute("allCands" , candyServ.allCandys());
			return "dashboard.jsp";
		}
}
