package com.ProjectManager.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.ProjectManager.models.Project;
import com.ProjectManager.repositories.ProjectRepository;

@Service
public class ProjectService {
	private final ProjectRepository projectRepository;

	public ProjectService(ProjectRepository projectRepository) {
		super();
		this.projectRepository = projectRepository;
	}
	public List<Project> allProjects(){
		return projectRepository.findAll();
	}
	public Project findOne(Long id) {
		Optional<Project> optionalProject = projectRepository.findById(id);
		if(optionalProject.isPresent()) {
			return optionalProject.get();
		}else {
			return null;
		}
	}
	public Project create(Project project) {
		return projectRepository.save(project);
	}
	public Project update(Project project) {
		return projectRepository.save(project);
	}
	public void delete(Long id) {
		projectRepository.deleteById(id);
	}
}