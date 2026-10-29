package br.itb.projeto.pizzaria.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import br.itb.projeto.pizzaria.model.entity.Mensagem;
import br.itb.projeto.pizzaria.model.repository.MensagemRepository;

@Service
public class MensagemService {

    private final MensagemRepository mensagemRepository;
    private final NotificacaoService notificacaoService;
    private final EmailService emailService;

    public MensagemService(MensagemRepository mensagemRepository, NotificacaoService notificacaoService, EmailService emailService) {
        this.mensagemRepository = mensagemRepository;
        this.notificacaoService = notificacaoService;
        this.emailService = emailService;
    }

    public Mensagem enviarMensagem(Mensagem mensagem) {

        mensagem.setDataMensagem(LocalDateTime.now());
        mensagem.setStatusMensagem("ATIVO");

        Mensagem mensagemEnviada = mensagemRepository.save(mensagem);

        // ✅ NOTIFICA EM TEMPO REAL
        notificacaoService.notificarNovaMensagem();

        return mensagemEnviada;
    }

    public List<Mensagem> findAll() {
        return mensagemRepository.findAll();
    }

    public Mensagem findById(Long id) {
        return mensagemRepository.findById(id).orElseThrow(() -> new org.springframework.web.server.ResponseStatusException(org.springframework.http.HttpStatus.NOT_FOUND, "Mensagem não encontrada"));
    }

    public Mensagem responder(Long id, String resposta) {
        if (resposta == null || resposta.isBlank()) throw new org.springframework.web.server.ResponseStatusException(org.springframework.http.HttpStatus.BAD_REQUEST, "A resposta é obrigatória.");
        Mensagem mensagem = mensagemRepository.findById(id).orElseThrow(() -> new org.springframework.web.server.ResponseStatusException(org.springframework.http.HttpStatus.NOT_FOUND, "Mensagem não encontrada"));
        try { emailService.enviarResposta(mensagem.getEmail(), mensagem.getTexto(), resposta.trim()); }
        catch (Exception ex) { throw new org.springframework.web.server.ResponseStatusException(org.springframework.http.HttpStatus.BAD_GATEWAY, "Não foi possível enviar o e-mail. Confira MAIL_USERNAME e MAIL_PASSWORD."); }
        mensagem.setRespostaAdmin(resposta.trim()); mensagem.setDataResposta(LocalDateTime.now()); mensagem.setStatusMensagem("RESPONDIDA"); mensagem.setDataAtualizacao(LocalDateTime.now());
        return mensagemRepository.save(mensagem);
    }

    public Mensagem abrirMensagem(Long id) {
        Mensagem _mensagem = mensagemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mensagem não encontrada"));

        _mensagem.setStatusMensagem("LIDA");
        _mensagem.setDataAtualizacao(LocalDateTime.now());

        return mensagemRepository.save(_mensagem);
    }

    public Mensagem inativar(Long id) {
        Mensagem _mensagem = mensagemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mensagem não encontrada"));

        _mensagem.setStatusMensagem("INATIVA");
        _mensagem.setDataAtualizacao(LocalDateTime.now());

        return mensagemRepository.save(_mensagem);
    }

}
