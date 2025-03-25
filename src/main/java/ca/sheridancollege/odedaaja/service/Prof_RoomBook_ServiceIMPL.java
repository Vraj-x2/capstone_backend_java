package ca.sheridancollege.odedaaja.service;

import ca.sheridancollege.odedaaja.domain.RoomPost;
import ca.sheridancollege.odedaaja.domain.RoomRequest;
import ca.sheridancollege.odedaaja.domain.Users;
import ca.sheridancollege.odedaaja.repo.RoomPostRepository;
import ca.sheridancollege.odedaaja.repo.RoomRequestRepository;
import ca.sheridancollege.odedaaja.repo.UserRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@AllArgsConstructor
public class Prof_RoomBook_ServiceIMPL implements Prof_RoomBook_Service {

    private final UserRepo userRepo;
    private final RoomPostRepository roomPostRepository;
    private final RoomRequestRepository roomRequestRepository;

    @Override
    public List<Users> getAllUsers() {
        return userRepo.findAll();
    }

    @Override
    public Users saveUser(Users user) {
        return userRepo.save(user);
    }

    @Override
    public Users getUserById(Long id) {
        return userRepo.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public Users updateUser(Long id, Users user) {
        return userRepo.findById(id).map(existingUser -> {
            existingUser.setUsername(user.getUsername());
            existingUser.setEmail(user.getEmail());
            existingUser.setPassword(user.getPassword());
            return userRepo.save(existingUser);
        }).orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public void deleteUser(Long id) {
        userRepo.deleteById(id);
    }

    @Override
    public Users patchUser(Long id, Map<String, Object> updates) {
        return userRepo.findById(id).map(user -> {
            updates.forEach((key, value) -> {
                switch (key) {
                    case "username": user.setUsername((String) value); break;
                    case "email": user.setEmail((String) value); break;
                    case "password": user.setPassword((String) value); break;
                    // Add other cases as needed
                }
            });
            return userRepo.save(user);
        }).orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public List<RoomPost> getAllPostedRooms() {
        return roomPostRepository.findAll();
    }

    @Override
    public RoomPost saveRoom(RoomPost roomPost) {
        return roomPostRepository.save(roomPost);
    }

    @Override
    public RoomPost updateRoomPost(Long id, RoomPost roomPost) {
        return roomPostRepository.findById(id).map(existingRoom -> {
            existingRoom.setRoom(roomPost.getRoom());
            existingRoom.setDate(roomPost.getDate());
            existingRoom.setStartTime(roomPost.getStartTime());
            existingRoom.setEndTime(roomPost.getEndTime());
            existingRoom.setPostedBy(roomPost.getPostedBy());
            existingRoom.setDescription(roomPost.getDescription());
            existingRoom.setLocation(roomPost.getLocation());
            existingRoom.setCapacity(roomPost.getCapacity());
            existingRoom.setResources(roomPost.getResources());
            return roomPostRepository.save(existingRoom);
        }).orElseThrow(() -> new RuntimeException("Room post not found"));
    }

    @Override
    public void deleteRoomPost(Long id) {
        roomPostRepository.deleteById(id);
    }

    @Override
    public List<RoomRequest> getAllRoomRequests() {
        return roomRequestRepository.findAll();
    }

    @Override
    public RoomRequest saveRoomRequest(RoomRequest roomRequest) {
        return roomRequestRepository.save(roomRequest);
    }

    @Override
    public RoomRequest updateRoomRequest(Long id, RoomRequest roomRequest) {
        return roomRequestRepository.findById(id).map(existingRequest -> {
            existingRequest.setDate(roomRequest.getDate());
            existingRequest.setStartTime(roomRequest.getStartTime());
            existingRequest.setEndTime(roomRequest.getEndTime());
            existingRequest.setDescription(roomRequest.getDescription());
            existingRequest.setLocation(roomRequest.getLocation());
            existingRequest.setCapacity(roomRequest.getCapacity());
            existingRequest.setResources(roomRequest.getResources());
            return roomRequestRepository.save(existingRequest);
        }).orElseThrow(() -> new RuntimeException("Room request not found"));
    }

    @Override
    public void deleteRoomRequest(Long id) {
        roomRequestRepository.deleteById(id);
    }
}
