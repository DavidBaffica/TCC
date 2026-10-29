package br.itb.projeto.pizzaria.model.entity;

import java.time.LocalDateTime;
import jakarta.persistence.*;

@Entity
@Table(name = "Curso")
public class Curso {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 140)
    private String titulo;

    @Column(nullable = false, length = 40)
    private String categoria;

    @Column(nullable = false, length = 2000)
    private String descricao;

    @Column(name = "imagemUrl", length = 600)
    private String imagemUrl;

    @Column(name = "cargaHoraria", length = 60)
    private String cargaHoraria;

    @Column(name = "linkExterno", length = 600)
    private String linkExterno;

    @Column(nullable = false)
    private boolean ativo = true;

    @Column(name = "dataCadastro", nullable = false)
    private LocalDateTime dataCadastro = LocalDateTime.now();

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }
    public String getCategoria() { return categoria; }
    public void setCategoria(String categoria) { this.categoria = categoria; }
    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }
    public String getImagemUrl() { return imagemUrl; }
    public void setImagemUrl(String imagemUrl) { this.imagemUrl = imagemUrl; }
    public String getCargaHoraria() { return cargaHoraria; }
    public void setCargaHoraria(String cargaHoraria) { this.cargaHoraria = cargaHoraria; }
    public String getLinkExterno() { return linkExterno; }
    public void setLinkExterno(String linkExterno) { this.linkExterno = linkExterno; }
    public boolean isAtivo() { return ativo; }
    public void setAtivo(boolean ativo) { this.ativo = ativo; }
    public LocalDateTime getDataCadastro() { return dataCadastro; }
    public void setDataCadastro(LocalDateTime dataCadastro) { this.dataCadastro = dataCadastro; }
}