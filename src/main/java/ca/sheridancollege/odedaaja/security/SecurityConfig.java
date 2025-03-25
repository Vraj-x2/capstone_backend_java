package ca.sheridancollege.odedaaja.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable() // Consider re-enabling CSRF as appropriate
            .authorizeHttpRequests((requests) -> requests
                .requestMatchers("/").permitAll()
                .requestMatchers("/api/profRoomBook/**").hasRole("ADMIN")
                .requestMatchers("/api/student/**").hasAnyRole("STUDENT", "ADMIN")
                .requestMatchers("/api/faculty/**").hasAnyRole("FACULTY", "ADMIN")
                .anyRequest().authenticated()
            )
            .httpBasic();
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public org.springframework.security.core.userdetails.UserDetailsService userDetailsService(PasswordEncoder encoder) {
        var userDetailsService = new InMemoryUserDetailsManager();
        userDetailsService.createUser(User.withUsername("admin")
                .password(encoder.encode("password"))
                .roles("ADMIN").build());
        userDetailsService.createUser(User.withUsername("student")
                .password(encoder.encode("password"))
                .roles("STUDENT").build());
        userDetailsService.createUser(User.withUsername("faculty")
                .password(encoder.encode("password"))
                .roles("FACULTY").build());
        return userDetailsService;
    }
}
