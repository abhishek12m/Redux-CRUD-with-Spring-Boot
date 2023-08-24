package com.example.taskManager.controller;

import com.example.taskManager.exception.ResourceNotFoundException;
import com.example.taskManager.model.Task;
import com.example.taskManager.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
	@Autowired
	private TaskRepository taskRepository;

	@GetMapping
	public List<Task> getAllTasks() {
		return taskRepository.findAll();
	}

	@PostMapping
	public Task createTask(@RequestBody Task task) {
		return taskRepository.save(task);
	}

	@PutMapping("/{id}")
	public Task updateTask(@PathVariable Long id, @RequestBody Task updatedTask) {
		Task task = taskRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Task not found with id: " + id));

		task.setTitle(updatedTask.getTitle());
		task.setDescription(updatedTask.getDescription());
		task.setCompleted(updatedTask.isCompleted());

		return taskRepository.save(task);
	}

	@DeleteMapping("/{id}")
	public void deleteTask(@PathVariable Long id) {
		taskRepository.deleteById(id);
	}
}
