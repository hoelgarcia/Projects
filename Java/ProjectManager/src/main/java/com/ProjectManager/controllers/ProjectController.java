package com.ProjectManager.controllers;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.ProjectManager.models.Project;
import com.ProjectManager.models.User;
import com.ProjectManager.services.ProjectService;
import com.ProjectManager.services.UserService;

@Controller
public class ProjectController {
	@Autowired
	private final ProjectService projectService;
	private final UserService userService;
	public ProjectController(ProjectService projectService, UserService userService) {
		this.projectService = projectService;
		this.userService = userService;
	}
// ========CREATE PROJECT=======================================================
	@GetMapping("/newProject")
	public String newProject(@ModelAttribute("project")Project project, Model model) {
		model.addAttribute("projects", projectService.allProjects());
		return "newProject.jsp";
	}
	@PostMapping("/createProject")
	public String createProject(@Valid @ModelAttribute("project")Project project, BindingResult result, HttpSession session) {
		if(result.hasErrors()) {
			System.out.println(result.getFieldErrors());
			return "newProject.jsp";
		}else {
			User user = userService.oneUser((Long)session.getAttribute("user_id"));
			project.setUser(user);
			projectService.create(project);
			return "redirect:/dashboard";
		}
	}
// ========SHOW ONE PROJECT=======================================================
	@GetMapping("/oneProject/{id}")
	public String oneProject(@PathVariable("id")Long id, Model model) {
		Project project = projectService.findOne(id);
		model.addAttribute("manyProjects", projectService.allProjects());
		model.addAttribute("project",project);
		return "oneProject.jsp";
	}
// ========UPDATE PROJECT=======================================================
	@GetMapping("/editProject/{id}")
	public String editProject(@PathVariable("id")Long id, Model model) {
		Project project = projectService.findOne(id);
		model.addAttribute("project",project);
		return "editProject.jsp";
	}
	@RequestMapping(value="/editProject/{id}",method=RequestMethod.PUT)
	public String update(@Valid @ModelAttribute("project") Project project, BindingResult result,HttpSession session) {
		if(result.hasErrors()) {
			return "editProject.jsp";
		}else {
			User user = userService.oneUser((Long)session.getAttribute("user_id"));
			project.setUser(user);
			projectService.update(project);
			return "redirect:/dashboard";
		}
	}
// ========DELETE PROJECT=======================================================
	@RequestMapping("/deleteProject/{id}")
	public String delete(@PathVariable("id")Long id) {
		projectService.delete(id);
		return "redirect:/dashboard";
	}
}