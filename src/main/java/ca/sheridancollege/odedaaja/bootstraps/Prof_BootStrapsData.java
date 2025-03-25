package ca.sheridancollege.odedaaja.bootstraps;

import ca.sheridancollege.odedaaja.domain.Users;
import ca.sheridancollege.odedaaja.domain.RoomPost;
import ca.sheridancollege.odedaaja.domain.RoomRequest;
import ca.sheridancollege.odedaaja.repo.UserRepo;
import ca.sheridancollege.odedaaja.repo.RoomPostRepository;
import ca.sheridancollege.odedaaja.repo.RoomRequestRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalTime;

@Component
public class Prof_BootStrapsData implements CommandLineRunner {

    private final UserRepo userRepo;
    private final RoomPostRepository roomPostRepository;
    private final RoomRequestRepository roomRequestRepository;

    public Prof_BootStrapsData(UserRepo userRepo, RoomPostRepository roomPostRepository, RoomRequestRepository roomRequestRepository) {
        this.userRepo = userRepo;
        this.roomPostRepository = roomPostRepository;
        this.roomRequestRepository = roomRequestRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        loadData();
    }

    private void loadData() {
        if (userRepo.count() == 0) {
            Users prof1 = Users.builder()
                    .username("john_doe")
                    .email("john.doe@example.com")
                    .password("password123")
                    .build();
            userRepo.save(prof1);

            Users prof2 = Users.builder()
                    .username("jane_smith")
                    .email("jane.smith@example.com")
                    .password("securePass456")
                    .build();
            userRepo.save(prof2);

            Users prof3 = Users.builder()
                    .username("michael_brown")
                    .email("michael.brown@example.com")
                    .password("pass789")
                    .build();
            userRepo.save(prof3);

            RoomPost room1 = RoomPost.builder()
                    .room("Room 101")
                    .date(LocalDate.now())
                    .startTime(LocalTime.of(9, 0))
                    .endTime(LocalTime.of(10, 30))
                    .postedBy("john_doe")
                    .description("Lecture on Data Structures")
                    .location("Building A")
                    .capacity(30)
                    .resources("Projector, Whiteboard")
                    .users(prof1)
                    .build();
            roomPostRepository.save(room1);

            RoomPost room2 = RoomPost.builder()
                    .room("Room 102")
                    .date(LocalDate.now())
                    .startTime(LocalTime.of(11, 0))
                    .endTime(LocalTime.of(12, 30))
                    .postedBy("jane_smith")
                    .description("Lecture on Software Engineering")
                    .location("Building B")
                    .capacity(25)
                    .resources("Projector, Whiteboard")
                    .users(prof2)
                    .build();
            roomPostRepository.save(room2);

            RoomPost room3 = RoomPost.builder()
                    .room("Room 103")
                    .date(LocalDate.now())
                    .startTime(LocalTime.of(13, 0))
                    .endTime(LocalTime.of(14, 30))
                    .postedBy("michael_brown")
                    .description("Lecture on Machine Learning")
                    .location("Building C")
                    .capacity(35)
                    .resources("Projector, Whiteboard")
                    .users(prof3)
                    .build();
            roomPostRepository.save(room3);

            System.out.println("✅ Sample Data Loaded into Database!");
        } else {
            System.out.println("ℹ️ Database already contains data, skipping initialization.");
        }
    }
}
