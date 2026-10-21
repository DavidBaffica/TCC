package br.itb.projeto.pizzaria.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.itb.projeto.pizzaria.model.entity.Mensagem;
import br.itb.projeto.pizzaria.service.MensagemService;

@RestController
@RequestMapping("/mensagens")
public class MensagemController {

    private final MensagemService mensagemService;

    public MensagemController(MensagemService mensagemService) {
        this.mensagemService = mensagemService;
    }

    @PostMapping("/enviar")
    public ResponseEntity<Mensagem> enviarMensagem(@RequestBody Mensagem mensagem) {
        Mensagem mensagemEnviada = mensagemService.enviarMensagem(mensagem);
        return ResponseEntity.status(HttpStatus.CREATED).body(mensagemEnviada);
    }
     
    @GetMapping("/all")
    public ResponseEntity<List<Mensagem>> findAll() {
        return ResponseEntity.ok(mensagemService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Mensagem> findById(@PathVariable Long id) {
        return ResponseEntity.ok(mensagemService.findById(id));
    }

    @PutMapping("/{id}/abrir")
    public ResponseEntity<Mensagem> abrir(@PathVariable Long id) {
        return ResponseEntity.ok(mensagemService.abrirMensagem(id));
    }

    @PutMapping("/{id}/inativar")
    public void inativar(@PathVariable Long id) {
        mensagemService.inativar(id);
    }

}
