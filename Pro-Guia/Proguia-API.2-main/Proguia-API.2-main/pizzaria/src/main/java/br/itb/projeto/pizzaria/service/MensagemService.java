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

    public MensagemService(MensagemRepository mensagemRepository, NotificacaoService notificacaoService) {
        this.mensagemRepository = mensagemRepository;
        this.notificacaoService = notificacaoService;
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
        return mensagemRepository.findById(id).orElse(null);
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
