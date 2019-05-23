package controller;

import entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.*;
import repository.UserRepository;

import java.util.List;

@RestController
@RequestMapping("/web")
@EnableAutoConfiguration
public class UserController {

    @Autowired
    UserRepository userRepository;

    @PostMapping( "/signup")
    public @ResponseBody
    ResponseEntity registerUser(String login, String email, String name, String password) {
        User user = new User(login, name, email, BCrypt.hashpw(password, BCrypt.gensalt()));
        if ((login.equals("")) || (password.equals(""))) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Incorrect login or password");
        }
        User someUser = userRepository.findUserByLogin(login);
        if (someUser != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User already exists");
        }
        userRepository.save(user);
        return ResponseEntity.status(HttpStatus.OK).body(user);
    }

    @GetMapping( "/get_user")
    public @ResponseBody
    ResponseEntity getUser() {
        User user = userRepository.findUserByLogin(SecurityContextHolder.getContext().getAuthentication().getName());
        return ResponseEntity.status(HttpStatus.OK).body(user);
    }

    @PostMapping( "/edit")
    public @ResponseBody
    ResponseEntity editUser(String type, String text, String password) {
        User user = userRepository.findUserByLogin(SecurityContextHolder.getContext().getAuthentication().getName());
        if (!BCrypt.checkpw(password, user.getPassword())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Wrong password");
        }

        if (text.equals("")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Empty data");
        }
        switch (type) {
            case "login":
                user.setLogin(text);
                break;
            case "email":
                user.setEmail(text);
                break;
            case "name":
                user.setName(text);
                break;
            case "password":
                user.setPassword(BCrypt.hashpw(text, BCrypt.gensalt()));
                break;
            default:
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Incorrect type");
        }
        userRepository.save(user);
        return ResponseEntity.status(HttpStatus.OK).body(user);
    }

    @GetMapping( "/get_all_users")
    public @ResponseBody
    ResponseEntity getAllUsers() {
        User user = userRepository.findUserByLogin(SecurityContextHolder.getContext().getAuthentication().getName());
        List<User> users = (List<User>) userRepository.findAll();
        for (User u: users) {
            if (!u.getLogin().equals(user.getLogin())) {
                u.setPassword("hidden");
            }
        }
        return ResponseEntity.status(HttpStatus.OK).body(users);
    }


}
