package ca.sheridancollege.odedaaja.service;

import ca.sheridancollege.odedaaja.domain.RoomPost;
import ca.sheridancollege.odedaaja.domain.RoomRequest;
import ca.sheridancollege.odedaaja.domain.Users;

import java.util.List;
import java.util.Map;

public interface Prof_RoomBook_Service {

    // User methods
    List<Users> getAllUsers();
    Users saveUser(Users user);
    Users getUserById(Long id);
    Users updateUser(Long id, Users user);
    void deleteUser(Long id);
    Users patchUser(Long id, Map<String, Object> updates);

    // RoomPost methods
    List<RoomPost> getAllPostedRooms();
    RoomPost saveRoom(RoomPost roomPost);
    RoomPost updateRoomPost(Long id, RoomPost roomPost);
    void deleteRoomPost(Long id);

    // RoomRequest methods
    List<RoomRequest> getAllRoomRequests();
    RoomRequest saveRoomRequest(RoomRequest roomRequest);
    RoomRequest updateRoomRequest(Long id, RoomRequest roomRequest);
    void deleteRoomRequest(Long id);
}
