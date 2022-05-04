package com.LoginRegistration.repositories;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.LoginRegistration.models.LoginRegistrationUser;

@Repository
public interface LoginRegistrationRepository extends CrudRepository<LoginRegistrationUser, Long>{
	Optional<LoginRegistrationUser>	findByEmail(String email);
}
