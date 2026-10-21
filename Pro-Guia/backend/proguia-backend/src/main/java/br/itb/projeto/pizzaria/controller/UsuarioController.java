package br.itb.projeto.pizzaria.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.SecurityContextRepository;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;

import br.itb.projeto.pizzaria.dto.UsuarioDTO;
import br.itb.projeto.pizzaria.model.entity.Usuario;
import br.itb.projeto.pizzaria.service.UsuarioService;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;
    private final AuthenticationManager authenticationManager;
    private final SecurityContextRepository securityContextRepository;

    public UsuarioController(UsuarioService usuarioService,
            AuthenticationManager authenticationManager,
            SecurityContextRepository securityContextRepository) {
        this.usuarioService = usuarioService;
        this.authenticationManager = authenticationManager;
        this.securityContextRepository = securityContextRepository;
    }

    @PostMapping("/create")
    public ResponseEntity<UsuarioDTO> create(@RequestBody Usuario usuario) {
        Usuario createdUsuario = usuarioService.create(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(usuarioService.findById(createdUsuario.getId()));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario usuario,
            HttpServletRequest request, HttpServletResponse response) {
        try {
            String email = usuario.getUsername() == null ? ""
                    : usuario.getUsername().trim().toLowerCase(java.util.Locale.ROOT);
            var autenticacao = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, usuario.getPassword()));
            SecurityContext context = SecurityContextHolder.createEmptyContext();
            context.setAuthentication(autenticacao);
            SecurityContextHolder.setContext(context);
            securityContextRepository.saveContext(context, request, response);

            UsuarioDTO usuarioLogado = usuarioService.login(email, usuario.getPassword());
            if (usuarioLogado != null) {
                return ResponseEntity.ok(usuarioLogado);
            }
            SecurityContextHolder.clearContext();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("E-mail ou senha inválidos.");
        } catch (org.springframework.security.core.AuthenticationException e) {
            SecurityContextHolder.clearContext();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("E-mail ou senha inválidos.");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<UsuarioDTO> editar(
            @PathVariable Long id,
            @RequestBody Usuario usuario) {

        usuarioService.editar(null, id, usuario);
        return ResponseEntity.ok(usuarioService.findById(id));
    }

    @DeleteMapping("/me")
    public ResponseEntity<Void> excluir(Authentication authentication) {
        usuarioService.excluir(authentication);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/alterar-senha")
    public ResponseEntity<UsuarioDTO> alterarSenha(@PathVariable Long id,
                                                   @RequestParam String newPassword) {
        usuarioService.alterarSenha(id, newPassword);
        return ResponseEntity.ok(usuarioService.findById(id));
    }

    @PutMapping("/{id}/inativar")
    public ResponseEntity<UsuarioDTO> inativar(@PathVariable Long id) {
        usuarioService.inativar(id);
        return ResponseEntity.ok(usuarioService.findById(id));
    }

    @PutMapping("/{id}/ativar")
    public ResponseEntity<UsuarioDTO> ativar(@PathVariable Long id) {
        usuarioService.ativar(id);
        return ResponseEntity.ok(usuarioService.findById(id));
    }

    @GetMapping("/me")
    public UsuarioDTO me(Authentication authentication) {
        UsuarioDTO usuario = usuarioService
                .findByUsername(authentication);
        return usuario;
    }

    @GetMapping("/all")
    public ResponseEntity<List<UsuarioDTO>> findAll() {
        return ResponseEntity.ok(usuarioService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioDTO> findById(@PathVariable Long id) {
        return ResponseEntity.ok(usuarioService.findById(id));
    }
}