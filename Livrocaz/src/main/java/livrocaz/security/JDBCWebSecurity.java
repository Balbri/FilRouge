package livrocaz.security;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.Environment;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@EnableWebSecurity
public class JDBCWebSecurity extends WebSecurityConfigurerAdapter{
	
	@Autowired
    private Environment env;

    @Bean
    public DataSource dataSource() {
        final DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName(env.getProperty("spring.datasource.driver-class-name"));
        dataSource.setUrl(env.getProperty("spring.datasource.url"));
        dataSource.setUsername(env.getProperty("spring.datasource.username"));
        dataSource.setPassword(env.getProperty("spring.datasource.password"));
        return dataSource;
    }
    
    @Autowired
    public void configAuthentication(AuthenticationManagerBuilder auth) throws Exception {
        auth.jdbcAuthentication().dataSource(dataSource());
    }
    
    @Override
	protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
    	.antMatchers("/").permitAll()
    	.antMatchers("/auth").permitAll()
    	.antMatchers(
                "/",
                "/favicon.ico",
                "/**/*.png",
                "/**/*.gif",
                "/**/*.svg",
                "/**/*.jpg",
                "/**/*.html",
                "/**/*.css",
                "/**/*.js"
        ).permitAll()
    	.antMatchers("/manager").hasAnyAuthority("MANAGER", "ADMIN")
    	.antMatchers("/manager.html").hasAnyAuthority("MANAGER", "ADMIN")
    	.antMatchers("/admin").hasAnyAuthority("ADMIN")
    	.antMatchers("/admin.html").hasAnyAuthority("ADMIN")
    	.anyRequest().authenticated()
    	.and()
    	.formLogin().permitAll()
    	.and()
        .formLogin()
        .loginPage("/login")//page login perso
        .loginProcessingUrl("/login")
    	.defaultSuccessUrl("/auth", true)
    	.and()
    	.logout().logoutRequestMatcher(new AntPathRequestMatcher("/logout")).logoutSuccessUrl("/login")
    	.and()
        .exceptionHandling().accessDeniedPage("/accessDenied");//page perso accés refusé
	}
}
