package com.practical.userauth.service;

import com.practical.userauth.model.User;
import com.practical.userauth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;

	public User register(User user) {
		User existingUser = userRepository.findByUsername(user.getUsername());
		if (existingUser != null) {
			throw new RuntimeException("Username already exists");
		}
		return userRepository.save(user);
	}

	public User login(String username, String password) {
		User user = userRepository.findByUsername(username);
		if (user == null || !user.getPassword().equals(password)) {
			throw new RuntimeException("Invalid username or password");
		}
		return user;
	}

	public User getUserById(Long id) {
		return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
	}

	public User updateUser(Long id, User userDetails) {
		User user = getUserById(id);
		user.setEmail(userDetails.getEmail());
		user.setUsername(userDetails.getUsername());
		return userRepository.save(user);
	}
}
