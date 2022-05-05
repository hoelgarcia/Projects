package com.ProjectManager.controllers;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.ProjectManager.models.LoginUser;
import com.ProjectManager.models.User;
import com.ProjectManager.services.ProjectService;
import com.ProjectManager.services.UserService;

@Controller
public class UserController {
	private final UserService userService;
	private final ProjectService projectService;
	public UserController( UserService userService, ProjectService projectService) {
		super();
		this.userService = userService;
		this.projectService = projectService;
	}	
	@GetMapping("/")
	    public String loginregistrationpage(Model model) {
	        model.addAttribute("newUser", new User());
	        model.addAttribute("newLogin", new LoginUser());
	        return "loginregistrationpage.jsp";
	    }
	@PostMapping("/register")
	    public String register(@Valid @ModelAttribute("newUser") User newUser, 
	            BindingResult result, Model model, HttpSession session) {
		 	userService.register(newUser, result);
	        if(result.hasErrors()) {
	            // Be sure to send in the empty LoginUser before 
	            // re-rendering the page.
	            model.addAttribute("newLogin", new LoginUser());
	            return "loginregistrationpage.jsp";
	        }
	        session.setAttribute("user_id", newUser.getId());
	        session.setAttribute("user", newUser.getFirstName());
	        session.setAttribute("user", newUser.getLastName());
	        return "redirect:/dashboard";
	    }
	    
    @PostMapping("/login")
	    public String login(@Valid @ModelAttribute("newLogin") LoginUser newLogin, 
	            BindingResult result, Model model, HttpSession session) {
	    	User user = userService.login(newLogin, result);
	        if(result.hasErrors()) {
	            model.addAttribute("newUser", new User());
	            return "loginregistrationpage.jsp";
	        }
	        session.setAttribute("user_id", user.getId());
	        session.setAttribute("user", newLogin.getEmail());
	        return "redirect:/dashboard";
    }
    @GetMapping("/logout")
	    public String clear(HttpSession session) {
	    	session.invalidate();
	    	return "redirect:/";
	    }
    @GetMapping("/dashboard")
		public String dashboard(Model model, HttpSession session) {
			model.addAttribute("allProjects" , projectService.allProjects());
	    	if(session.getAttribute("user_id") != null){
	    		model.addAttribute("user",userService.oneUser((Long)session.getAttribute("user_id")) );
	    			return "dashboard.jsp";
	    		}else {
	    			return "redirect:/";
	    		}
	    	}
		}