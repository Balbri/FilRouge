package livrocaz.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.util.Base64;
import java.util.Date;

/**
 * JWT utility class that is in charge of proving token, checking it, ...
 */
@Component
public class JwtTokenProvider {

    @Value("${security.jwt.token.secret-key:secret-key}")
    private String secretKey;

    @Value("${security.jwt.token.expire-length:3600000}")
    private long validityInMilliseconds = 3600000; // 1h

    @Autowired
    private UserDetailsService userDetailsService;

    /**
     * Method that encodes our secret to base64 format to enable HMAC signature (as header and payload are also in base64).
     */
    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    /**
     * Method that creates a token with username as "sub" field, user roles as "auth" field, "iat" as now date,
     * "exp" as now date + validity time.
     * @param username the user username.
     * @param roles the user roles.
     * @return the created JWT as String.
     */
    public String createToken(String username, String role) {

        Claims claims = Jwts.claims().setSubject(username);
        claims.put("auth", role);

        Date now = new Date();
        Date validity = new Date(now.getTime() + validityInMilliseconds);

        return Jwts.builder()//
                .setClaims(claims)//
                .setIssuedAt(now)//
                .setExpiration(validity)//
                .signWith(SignatureAlgorithm.HS256, secretKey)//
                .compact();
    }

    /**
     * Method that returns the user authentication based on one JWT.
     * @param token the token to use for authentication.
     * @return the authentication object if username is found.
     */
    public Authentication getAuthentication(String token) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(getUsername(token));
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    /**
     * Method that gets the username from the JWT.
     * @param token the token to analyse.
     * @return the user username as String.
     */
    public String getUsername(String token) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
    }

    /**
     * Method that resolve a JWT from an HTTP Request.
     * The header should contains an Authorization field where JWT should be added after "Bearer ".
     * @param req the request to check.
     * @return the JWT from the HTTP Header.
     */
    public String resolveToken(HttpServletRequest req) {
        String bearerToken = req.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    /**
     * Method that checks that a JWT is valid.
     * The signature should be correct and the exp time should be after "now"
     * @param token the token to validate
     * @return True if the token is valid, throws InvalidJWTException otherwise.
     * @throws InvalidJWTException
     */
    public boolean validateToken(String token) throws Exception {
        try {
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            return true;
        } catch (Exception  e) {
            throw new Exception();
        }
    }
}
