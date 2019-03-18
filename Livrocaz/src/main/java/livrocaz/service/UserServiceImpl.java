package livrocaz.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import livrocaz.model.Client;
import livrocaz.model.Users;
import livrocaz.repository.ClientRepository;
import livrocaz.repository.UserRepository;
import livrocaz.security.JwtTokenProvider;


@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepo;
    private ClientRepository clientRepo;
    private BCryptPasswordEncoder passwordEncoder;
    private JwtTokenProvider jwtTokenProvider;
    private AuthenticationManager authenticationManager;

    public UserServiceImpl(UserRepository userRepository, ClientRepository clientRepository, BCryptPasswordEncoder passwordEncoder,
                              JwtTokenProvider jwtTokenProvider, AuthenticationManager authenticationManager) {
        this.userRepo = userRepository;
        this.clientRepo = clientRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
        this.authenticationManager = authenticationManager;
    }

    public String signin(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
            return jwtTokenProvider.createToken(username, userRepo.findByUsername(username).get().getAuthority());
        } catch (AuthenticationException e) {
            throw new Exception();
        }
    }

    public String signup(Client client) throws Exception {
        if (!userRepo.findByUsername(client.getUsers().getUsername()).isPresent()) {
        	Users userToSave = new Users(client.getUsers().getUsername(), passwordEncoder.encode(client.getUsers().getPassword()), client.getUsers().getAuthority());
            Client clientToSave = new Client(client.getNomClient(),
            								client.getPrenomClient(),
            								client.getNumeroL(),
            								client.getRueL(),
            								client.getComplementL(),
            								client.getCpL(),
            								client.getVilleL(),
            								client.getEmailClient(),
            								userToSave);
            clientRepo.save(clientToSave);
            return jwtTokenProvider.createToken(client.getUsers().getUsername(), client.getUsers().getAuthority());
        } else {
            throw new Exception();
        }
    }
}
