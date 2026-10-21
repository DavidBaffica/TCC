package br.itb.projeto.pizzaria.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import br.itb.projeto.pizzaria.dto.UsuarioDTO;
import br.itb.projeto.pizzaria.model.entity.Usuario;
import br.itb.projeto.pizzaria.model.repository.UsuarioRepository;

@Service
public class UsuarioService implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository usuarioRepository,
            PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /* ================= LOGIN ================= */
    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {

        Usuario usuario = usuarioRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));

        if (!"ATIVO".equals(usuario.getStatusUsuario())) {
            throw new DisabledException("Usuário inativo ou precisa trocar senha");
        }

        return User.builder()
                .username(usuario.getUsername())
                .password(usuario.getPassword())
                .roles(usuario.getNivelAcesso())
                .build();
    }

    /* ================= CREATE ================= */
    public Usuario create(Usuario usuario) {
        if (usuario == null || usuario.getNome() == null || usuario.getNome().isBlank()) {
            throw new org.springframework.web.server.ResponseStatusException(
                    org.springframework.http.HttpStatus.BAD_REQUEST, "O nome é obrigatório.");
        }
        if (usuario.getUsername() == null || usuario.getUsername().isBlank()) {
            throw new org.springframework.web.server.ResponseStatusException(
                    org.springframework.http.HttpStatus.BAD_REQUEST, "O e-mail é obrigatório.");
        }
        if (usuario.getPassword() == null || usuario.getPassword().isBlank()) {
            throw new org.springframework.web.server.ResponseStatusException(
                    org.springframework.http.HttpStatus.BAD_REQUEST, "A senha é obrigatória.");
        }

        String email = usuario.getUsername().trim().toLowerCase(java.util.Locale.ROOT);
        if (usuarioRepository.findByUsername(email).isPresent()) {
            throw new org.springframework.web.server.ResponseStatusException(
                    org.springframework.http.HttpStatus.CONFLICT, "Este e-mail já está cadastrado.");
        }

        Usuario novoUsuario = new Usuario();
        novoUsuario.setNome(usuario.getNome().trim());
        novoUsuario.setTelefone(usuario.getTelefone());
        novoUsuario.setUsername(email);
        novoUsuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        novoUsuario.setNivelAcesso("USER");
        novoUsuario.setStatusUsuario("ATIVO");
        novoUsuario.setDataCadastro(LocalDateTime.now());
        return usuarioRepository.save(novoUsuario);
    }

    public UsuarioDTO login(String email, String senha) {
        if (email == null || email.isBlank() || senha == null || senha.isBlank()) {
            return null;
        }
        Usuario usuario = usuarioRepository.findByUsername(email.trim().toLowerCase(java.util.Locale.ROOT))
                .orElse(null);
        if (usuario == null || !"ATIVO".equals(usuario.getStatusUsuario())
                || !passwordEncoder.matches(senha, usuario.getPassword())) {
            return null;
        }
        return toDTO(usuario);
    }

    /* ================= EDITAR ================= */
    public Usuario editar(MultipartFile file, Long id, Usuario usuario) {

        Usuario _usuario = usuarioRepository.findById(id)
                .orElseThrow(()
                        -> new RuntimeException("Usuário não encontrado"));

        _usuario.setNome(usuario.getNome());
        _usuario.setTelefone(usuario.getTelefone());
        _usuario.setDataAtualizacao(LocalDateTime.now());

        if (usuario.getFoto() != null) {
            _usuario.setFoto(usuario.getFoto());
        }

        return usuarioRepository.save(_usuario);
    }

    /* ================= ALTERAR SENHA ================= */
    public Usuario alterarSenha(Long id, String novaSenha) {
        Usuario _usuario = usuarioRepository.findById(id)
                .orElseThrow(()
                        -> new RuntimeException("Usuário não encontrado"));

        _usuario.setPassword(passwordEncoder.encode(novaSenha));
        _usuario.setStatusUsuario("ATIVO");
        _usuario.setDataAtualizacao(LocalDateTime.now());

        return usuarioRepository.save(_usuario);
    }

    /* ================= INATIVAR ================= */
    public Usuario inativar(Long id) {
        Usuario _usuario = usuarioRepository.findById(id)
                .orElseThrow(()
                        -> new RuntimeException("Usuário não encontrado"));

        _usuario.setStatusUsuario("INATIVO");
        _usuario.setDataAtualizacao(LocalDateTime.now());
        return usuarioRepository.save(_usuario);
    }

    /* ================= ATIVAR ================= */
    public Usuario ativar(Long id) {
        Usuario _usuario = usuarioRepository.findById(id)
                .orElseThrow(()
                        -> new RuntimeException("Usuário não encontrado"));

        _usuario.setStatusUsuario("ATIVO");
        _usuario.setDataAtualizacao(LocalDateTime.now());
        return usuarioRepository.save(_usuario);
    }

    /* ================= EXCLUIR ================= */
    public void excluir(Authentication authentication) {
        Usuario usuario = usuarioRepository
                .findByUsername(authentication.getName())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        usuarioRepository.delete(usuario);
    }

    public UsuarioDTO findByUsername(Authentication authentication) {
        Usuario usuario = usuarioRepository
                .findByUsername(authentication.getName())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        return toDTO(usuario);
    }

    public List<UsuarioDTO> findAll() {
        return usuarioRepository.findAll()
                .stream()
                .map(this::toDTO)
                .toList();
    }

    public UsuarioDTO findById(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(()
                        -> new RuntimeException("Usuário não encontrado"));

        return toDTO(usuario);
    }


    private UsuarioDTO toDTO(Usuario usuario) {
        UsuarioDTO dto = new UsuarioDTO(
                usuario.getId(),
                usuario.getNome(),
                usuario.getUsername(),
                usuario.getNivelAcesso(),
                usuario.getDataCadastro(),
                usuario.getStatusUsuario()
        );

        dto.setTelefone(usuario.getTelefone());
        dto.setFoto(usuario.getFoto());

        return dto;
    }
}