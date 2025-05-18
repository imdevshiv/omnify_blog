package com.omnify_blog.server.repository;
import com.omnify_blog.server.dto.AuthResponse;
import com.omnify_blog.server.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    Optional<User> findByEmail(String email);

}
