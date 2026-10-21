package br.itb.projeto.pizzaria.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void enviarCodigo(String destino, String codigo) {
        SimpleMailMessage mensagem = new SimpleMailMessage();
        mensagem.setTo(destino);
        mensagem.setSubject("Recuperação de senha");
        mensagem.setText("Seu código de recuperação é: " + codigo
                + ".\n" + "Não responda esse e-mail.");

        mailSender.send(mensagem);
    }
}
