package repository;

import entity.User;
import org.springframework.data.repository.CrudRepository;

import javax.validation.constraints.NotNull;
import java.util.List;

public interface UserRepository extends CrudRepository<User, Integer> {

    User findUserByUserId(Integer userId);

    User findUserByLogin(@NotNull String login);

    User findUserByLoginAndPassword(@NotNull String login, @NotNull String password);

    List<User> findUsersByEmail(@NotNull String email);

    List<User> findUsersByName(@NotNull String name);
}
