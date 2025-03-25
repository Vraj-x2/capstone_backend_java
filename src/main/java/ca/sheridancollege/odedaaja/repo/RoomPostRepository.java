package ca.sheridancollege.odedaaja.repo;
import org.springframework.data.jpa.repository.JpaRepository;
import ca.sheridancollege.odedaaja.domain.RoomPost;

public interface RoomPostRepository extends JpaRepository<RoomPost, Long> {
}
