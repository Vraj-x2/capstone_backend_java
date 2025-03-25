package ca.sheridancollege.odedaaja.repo;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import ca.sheridancollege.odedaaja.domain.Users;

public interface UserRepo extends JpaRepository<Users, Long> {
    Optional<Users> findByUsername(String username);
}
