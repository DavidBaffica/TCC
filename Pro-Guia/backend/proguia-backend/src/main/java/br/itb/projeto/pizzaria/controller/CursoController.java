package br.itb.projeto.pizzaria.controller;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import br.itb.projeto.pizzaria.model.entity.Curso;
import br.itb.projeto.pizzaria.service.CursoService;

@RestController
@RequestMapping("/cursos")
public class CursoController {
    private final CursoService service;
    public CursoController(CursoService service) { this.service = service; }

    @GetMapping
    public List<Curso> listarPublicos() { return service.listarPublicos(); }

    @GetMapping("/admin")
    public List<Curso> listarTodos() { return service.listarTodos(); }

    @PostMapping
    public ResponseEntity<Curso> criar(@RequestBody Curso curso) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.criar(curso));
    }

    @PutMapping("/{id}")
    public Curso atualizar(@PathVariable Long id, @RequestBody Curso curso) {
        return service.atualizar(id, curso);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        service.excluir(id);
        return ResponseEntity.noContent().build();
    }
}