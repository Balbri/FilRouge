package livrocaz.security;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;


@Controller
public class SecurityController {

	@GetMapping("/index")
	public String publicResource () {
		return "index";
	}
	
	@PostMapping("/index")
	public String publicResource2 () {
		return "index";
	}
	
	@GetMapping("/login")
    public String loginForm() {
        return "login";
    }
	
	@GetMapping(path = "/auth")
    public String authResource() {
        return "auth";
    }
	
	@PostMapping(path = "/auth")
    public String authResource2() {
        return "auth";
    }

    @GetMapping(path = "/manager")
    public String managerResource() {
        return "manager";
    }
    
    @PostMapping(path = "/manager")
    public String managerResource2() {
        return "manager";
    }

    @GetMapping(path = "/admin")
    public String adminResource() {
        return "admin";
    }
    
    @PostMapping(path = "/admin")
    public String adminResource2() {
        return "admin";
    }
    
    @GetMapping(path = "/accessDenied")
    public String accesDenied() {
        return "accessDenied";
    }
	
}
