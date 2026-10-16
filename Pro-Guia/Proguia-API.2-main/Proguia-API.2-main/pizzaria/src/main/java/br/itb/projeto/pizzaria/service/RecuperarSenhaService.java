package br.itb.projeto.pizzaria.service;

import java.time.LocalDateTime;
import java.util.Random;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import br.itb.projeto.pizzaria.model.entity.RecuperarSenha;
import br.itb.projeto.pizzaria.model.entity.Usuario;
import br.itb.projeto.pizzaria.model.repository.RecuperarSenhaRepository;
import br.itb.projeto.pizzaria.model.repository.UsuarioRepository;

@Service
public class RecuperarSenhaService {

    private RecuperarSenhaRepository recuperarSenhaRepository;
    private UsuarioRepository usuarioRepository;
    private JavaMailSender mailSender;
    private PasswordEncoder passwordEncoder;

    public RecuperarSenhaService(RecuperarSenhaRepository recuperarSenhaRepository, UsuarioRepository usuarioRepository,
            JavaMailSender mailSender, PasswordEncoder passwordEncoder) {
        this.recuperarSenhaRepository = recuperarSenhaRepository;
        this.usuarioRepository = usuarioRepository;
        this.mailSender = mailSender;
        this.passwordEncoder = passwordEncoder;
    }

    public void solicitarCodigo(String email) {
        Usuario usuario = usuarioRepository.findByUsername(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        if (usuario != null) {
            String codigo = gerarCodigo();
            LocalDateTime agora = LocalDateTime.now();
            LocalDateTime expiracao = agora.plusMinutes(15);

            RecuperarSenha recuperarSenha = new RecuperarSenha();
            recuperarSenha.setEmail(email);
            recuperarSenha.setCodigo(codigo);
            recuperarSenha.setGeradoEm(agora);
            recuperarSenha.setExepiraEm(expiracao);

            recuperarSenhaRepository.save(recuperarSenha);

            enviarCodigo(email, codigo);
        }
    }

    public void redefinirSenha(String email, String codigo, String novaSenha) {
        RecuperarSenha registro = recuperarSenhaRepository.findByEmailAndCodigoAndStatusCodigoTrue(email, codigo)
                .orElseThrow(() -> new RuntimeException("Código inválido ou expirado."));

        if (registro.getExepiraEm().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Código expirado.");
        }

        Usuario usuario = usuarioRepository.findByUsername(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado."));

        usuario.setPassword(passwordEncoder.encode(novaSenha));
        usuario.setDataAtualizacao(LocalDateTime.now());
        usuarioRepository.save(usuario);

        registro.setStatusCodigo(false);
        recuperarSenhaRepository.save(registro);
    }

    public boolean validarCodigo(String email, String codigo) {
        return recuperarSenhaRepository.findByEmailAndCodigoAndStatusCodigoTrue(email, codigo)
                .filter(r -> r.getExepiraEm().isAfter(LocalDateTime.now()))
                .isPresent();
    }

    private String gerarCodigo() {
        return String.format("%06d", new Random().nextInt(999999));
    }

    private void enviarCodigo(String email, String codigo) {
        SimpleMailMessage mensagem = new SimpleMailMessage();
        mensagem.setTo(email);
        mensagem.setSubject("Código de Recuperação de senha");
        mensagem.setText("Seu código de recuperação é: " + codigo
                + ".\n" + "Este código expira em 15 minutos."
                + "\n" + "Não responda esse e-mail.");

        mailSender.send(mensagem);
    }
}
