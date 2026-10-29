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

    public void enviarResposta(String destino, String textoOriginal, String resposta) {
        SimpleMailMessage mensagem = new SimpleMailMessage();
        mensagem.setTo(destino);
        mensagem.setSubject("Resposta do Pro Guia - Fale Conosco");
        mensagem.setText("Olá!\n\nRecebemos sua mensagem:\n\"" + textoOriginal + "\"\n\nNossa equipe respondeu:\n" + resposta + "\n\nAtenciosamente,\nEquipe Pro Guia");
        mailSender.send(mensagem);
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
