package controller;

import entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import repository.UserRepository;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/web")
@EnableAutoConfiguration
public class FilterController {

    @Autowired
    UserRepository userRepository;

    @GetMapping( "/users_by_filter")
    public @ResponseBody
    ResponseEntity getUsersByFilter(@RequestParam("type") String type, String text) {
        User user = userRepository.findUserByLogin(SecurityContextHolder.getContext().getAuthentication().getName());
        switch (type) {
            case "name":
                List<User> users = userRepository.findUsersByName(text);
                for (User u: users) {
                    if (!u.getLogin().equals(user.getLogin())) {
                        u.setPassword("hidden");
                    }
                }
                return ResponseEntity.status(HttpStatus.OK).body(users);
            case "email":
                List<User> us = userRepository.findUsersByEmail(text);
                for (User u: us) {
                    if (!u.getLogin().equals(user.getLogin())) {
                        u.setPassword("hidden");
                    }
                }
                return ResponseEntity.status(HttpStatus.OK).body(us);
            case "login":
                User uL = userRepository.findUserByLogin(text);
                List<User> tmp = new ArrayList<>();
                if (!uL.getLogin().equals(user.getLogin())) {
                    uL.setPassword("hidden");
                }

                tmp.add(uL);
                return ResponseEntity.status(HttpStatus.OK).body(tmp);
            default:
                return ResponseEntity.status(HttpStatus.OK).body("Incorrect data");
        }

    }

}
