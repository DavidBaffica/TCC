package br.itb.projeto.pizzaria.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;

import jakarta.servlet.http.HttpServletResponse;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {

        http
            // ================= CSRF / CORS =================
            .csrf(AbstractHttpConfigurer::disable)
            .cors(Customizer.withDefaults())
            .securityContext(context -> context
                .securityContextRepository(securityContextRepository()))

            // ================= AUTORIZAÇÃO =================
            .authorizeHttpRequests(auth -> auth
                // Cadastro e login próprios do frontend
                .requestMatchers(HttpMethod.POST, "/usuarios/create", "/usuarios/login").permitAll()
                .requestMatchers("/usuarios").permitAll()
                .requestMatchers("/login").permitAll()
                .requestMatchers(HttpMethod.POST, "/mensagens/enviar").permitAll()
                .requestMatchers(HttpMethod.GET, "/mensagens/admin", "/mensagens/all").hasRole("ADMIN")
                .requestMatchers(HttpMethod.POST, "/mensagens/*/responder").hasRole("ADMIN")
                .requestMatchers(HttpMethod.GET, "/mensagens/*").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/mensagens/*/abrir", "/mensagens/*/inativar").hasRole("ADMIN")
                .requestMatchers(HttpMethod.GET, "/cursos").permitAll()
                .requestMatchers("/cursos/admin", "/cursos/**").hasRole("ADMIN")
                .requestMatchers("/notificacoes/**").permitAll()
                .requestMatchers("/recuperar-senha/**").permitAll()
                .anyRequest().authenticated()
            )

            // ================= LOGIN =================
            .formLogin(form -> form
                .loginProcessingUrl("/login")
                .successHandler((request, response, authentication) -> {
                    response.setStatus(HttpServletResponse.SC_OK);
                    response.setContentType("application/json");
                    response.getWriter().write("""
                        {
                          "message": "Login realizado com sucesso"
                        }
                    """);
                })
                .failureHandler((request, response, exception) -> {
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    response.setContentType("application/json");
                    response.getWriter().write("""
                        {
                          "error": "Usuário ou senha inválidos"
                        }
                    """);
                })
            )

            // ================= LOGOUT =================
            .logout(logout -> logout
                .logoutUrl("/logout")
                .logoutSuccessHandler((request, response, authentication) -> {
                    response.setStatus(HttpServletResponse.SC_OK);
                    response.setContentType("application/json");
                    response.getWriter().write("""
                        {
                          "message": "Logout realizado com sucesso"
                        }
                    """);
                })
            );

        return http.build();
    }

    // ================= PASSWORD ENCODER =================
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public SecurityContextRepository securityContextRepository() {
        return new HttpSessionSecurityContextRepository();
    }
}