package livrocaz.service;

import livrocaz.model.Client;
import org.springframework.stereotype.Service;


@Service
public interface UserService {

    /**
     * Method that signs a user in the application.
     * @param username the user username.
     * @param password the user password.
     * @return the JWT if credentials are valid, throws InvalidCredentialsException otherwise.
     * @throws InvalidCredentialsException
     */
    String signin(String username, String password) throws Exception;

    /**
     * Method that signs up a new user in the application.
     * @param user the new user to create.
     * @return the JWT if user username is not already existing.
     * @throws ExistingUsernameException
     */
    String signup(Client client) throws Exception;

}
