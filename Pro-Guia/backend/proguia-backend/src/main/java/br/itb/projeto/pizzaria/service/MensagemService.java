
package br.itb.projeto.pizzaria.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import br.itb.projeto.pizzaria.model.entity.Mensagem;
import br.itb.projeto.pizzaria.model.repository.MensagemRepository;

@Service
public class MensagemService {

    private final MensagemRepository mensagemRepository;
    private final NotificacaoService notificacaoService;
    private final EmailService emailService;

    public MensagemService(
            MensagemRepository mensagemRepository,
            NotificacaoService notificacaoService,
            EmailService emailService) {

        this.mensagemRepository = mensagemRepository;
        this.notificacaoService = notificacaoService;
        this.emailService = emailService;
    }

    public Mensagem enviarMensagem(Mensagem mensagem) {

        mensagem.setDataMensagem(LocalDateTime.now());
        mensagem.setStatusMensagem("ATIVO");

        Mensagem mensagemEnviada = mensagemRepository.save(mensagem);

        // Notifica o painel administrativo sobre a nova mensagem
        notificacaoService.notificarNovaMensagem();

        return mensagemEnviada;
    }

    public List<Mensagem> findAll() {
        return mensagemRepository.findAll();
    }

    public Mensagem findById(Long id) {
        return mensagemRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Mensagem não encontrada"
                ));
    }

    public Mensagem responder(Long id, String resposta) {

        if (resposta == null || resposta.isBlank()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "A resposta é obrigatória."
            );
        }

        Mensagem mensagem = findById(id);

        try {
            emailService.enviarResposta(
                    mensagem.getEmail(),
                    mensagem.getTexto(),
                    resposta.trim()
            );

        } catch (Exception ex) {

            // Exibe o erro verdadeiro no terminal do backend
            System.err.println("ERRO AO ENVIAR E-MAIL:");
            ex.printStackTrace();

            throw new ResponseStatusException(
                    HttpStatus.BAD_GATEWAY,
                    "Falha ao enviar o e-mail. Consulte o terminal do backend."
            );
        }

        mensagem.setRespostaAdmin(resposta.trim());
        mensagem.setDataResposta(LocalDateTime.now());
        mensagem.setStatusMensagem("RESPONDIDA");
        mensagem.setDataAtualizacao(LocalDateTime.now());

        return mensagemRepository.save(mensagem);
    }

    public Mensagem abrirMensagem(Long id) {

        Mensagem mensagem = findById(id);

        mensagem.setStatusMensagem("LIDA");
        mensagem.setDataAtualizacao(LocalDateTime.now());

        return mensagemRepository.save(mensagem);
    }

    public Mensagem inativar(Long id) {

        Mensagem mensagem = findById(id);

        mensagem.setStatusMensagem("INATIVA");
        mensagem.setDataAtualizacao(LocalDateTime.now());

        return mensagemRepository.save(mensagem);
    }
}
