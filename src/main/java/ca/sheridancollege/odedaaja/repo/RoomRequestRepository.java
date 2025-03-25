package ca.sheridancollege.odedaaja.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import ca.sheridancollege.odedaaja.domain.RoomRequest;

public interface RoomRequestRepository extends JpaRepository<RoomRequest, Long> {
}
