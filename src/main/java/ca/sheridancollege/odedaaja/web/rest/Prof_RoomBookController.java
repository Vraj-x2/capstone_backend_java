package ca.sheridancollege.odedaaja.web.rest;

import java.util.List;
import java.util.Map;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ca.sheridancollege.odedaaja.domain.Users;
import ca.sheridancollege.odedaaja.domain.RoomPost;
import ca.sheridancollege.odedaaja.domain.RoomRequest;
import ca.sheridancollege.odedaaja.service.Prof_RoomBook_Service;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/api/profRoomBook")
@CrossOrigin(origins = "http://localhost:3000")
public class Prof_RoomBookController {

    private final Prof_RoomBook_Service profRoomBookService;

    // Users endpoints
    @PostMapping("/user")
    public Users createUser(@RequestBody Users user) {
        return profRoomBookService.saveUser(user);
    }

    @GetMapping("/user")
    public List<Users> getUsers() {
        return profRoomBookService.getAllUsers();
    }

    @GetMapping("/user/{id}")
    public Users getUserById(@PathVariable Long id) {
        return profRoomBookService.getUserById(id);
    }

    @PutMapping("/user/{id}")
    public Users updateUser(@PathVariable Long id, @RequestBody Users user) {
        return profRoomBookService.updateUser(id, user);
    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        profRoomBookService.deleteUser(id);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/user/{id}")
    public Users patchUser(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
        return profRoomBookService.patchUser(id, updates);
    }

    // RoomPost endpoints
    @PostMapping("/roomPost")
    public RoomPost createRoomPost(@RequestBody RoomPost roomPost) {
        return profRoomBookService.saveRoom(roomPost);
    }

    @GetMapping("/roomPost")
    public List<RoomPost> getAllRoomPosts() {
        return profRoomBookService.getAllPostedRooms();
    }

    @PutMapping("/roomPost/{id}")
    public RoomPost updateRoomPost(@PathVariable Long id, @RequestBody RoomPost roomPost) {
        return profRoomBookService.updateRoomPost(id, roomPost);
    }

    @DeleteMapping("/roomPost/{id}")
    public ResponseEntity<?> deleteRoomPost(@PathVariable Long id) {
        profRoomBookService.deleteRoomPost(id);
        return ResponseEntity.ok().build();
    }

    // RoomRequest endpoints
    @PostMapping("/roomRequest")
    public RoomRequest createRoomRequest(@RequestBody RoomRequest roomRequest) {
        return profRoomBookService.saveRoomRequest(roomRequest);
    }

    @GetMapping("/roomRequest")
    public List<RoomRequest> getAllRoomRequests() {
        return profRoomBookService.getAllRoomRequests();
    }

    @PutMapping("/roomRequest/{id}")
    public RoomRequest updateRoomRequest(@PathVariable Long id, @RequestBody RoomRequest roomRequest) {
        return profRoomBookService.updateRoomRequest(id, roomRequest);
    }

    @DeleteMapping("/roomRequest/{id}")
    public ResponseEntity<?> deleteRoomRequest(@PathVariable Long id) {
        profRoomBookService.deleteRoomRequest(id);
        return ResponseEntity.ok().build();
    }

    
}
