package br.itb.projeto.pizzaria.model.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "RecuperarSenha")
public class RecuperarSenha {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
    private String codigo;

    private LocalDateTime geradoEm;
    private LocalDateTime exepiraEm;
    private Boolean statusCodigo;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public LocalDateTime getGeradoEm() {
        return geradoEm;
    }

    public void setGeradoEm(LocalDateTime geradoEm) {
        this.geradoEm = geradoEm;
    }

    public LocalDateTime getExepiraEm() {
        return exepiraEm;
    }

    public void setExepiraEm(LocalDateTime exepiraEm) {
        this.exepiraEm = exepiraEm;
    }

    public Boolean isStatusCodigo() {
        return statusCodigo;
    }

    public void setStatusCodigo(Boolean statusCodigo) {
        this.statusCodigo = statusCodigo;
    }

}
