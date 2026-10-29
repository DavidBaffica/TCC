package br.itb.projeto.pizzaria.service;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import br.itb.projeto.pizzaria.model.entity.Curso;
import br.itb.projeto.pizzaria.model.repository.CursoRepository;

@Service
public class CursoService {
    private final CursoRepository repository;
    public CursoService(CursoRepository repository) { this.repository = repository; }

    public List<Curso> listarPublicos() { return repository.findByAtivoTrueOrderByDataCadastroDesc(); }
    public List<Curso> listarTodos() { return repository.findAll(); }

    public Curso criar(Curso curso) {
        validar(curso);
        curso.setId(null);
        curso.setDataCadastro(LocalDateTime.now());
        curso.setAtivo(true);
        return repository.save(curso);
    }

    public Curso atualizar(Long id, Curso dados) {
        validar(dados);
        Curso atual = repository.findById(id).orElseThrow(() ->
            new ResponseStatusException(HttpStatus.NOT_FOUND, "Curso não encontrado."));
        atual.setTitulo(dados.getTitulo().trim());
        atual.setCategoria(dados.getCategoria().trim());
        atual.setDescricao(dados.getDescricao().trim());
        atual.setImagemUrl(dados.getImagemUrl());
        atual.setCargaHoraria(dados.getCargaHoraria());
        atual.setLinkExterno(dados.getLinkExterno());
        atual.setAtivo(dados.isAtivo());
        return repository.save(atual);
    }

    public void excluir(Long id) {
        Curso curso = repository.findById(id).orElseThrow(() ->
            new ResponseStatusException(HttpStatus.NOT_FOUND, "Curso não encontrado."));
        curso.setAtivo(false);
        repository.save(curso);
    }

    private void validar(Curso curso) {
        if (curso == null || curso.getTitulo() == null || curso.getTitulo().isBlank()
            || curso.getCategoria() == null || curso.getCategoria().isBlank()
            || curso.getDescricao() == null || curso.getDescricao().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                "Título, categoria e descrição são obrigatórios.");
        }
        curso.setTitulo(curso.getTitulo().trim());
        curso.setCategoria(curso.getCategoria().trim());
        curso.setDescricao(curso.getDescricao().trim());
    }
}