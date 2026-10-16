package br.itb.projeto.pizzaria.model.repository;

import br.itb.projeto.pizzaria.model.entity.RecuperarSenha;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface RecuperarSenhaRepository extends JpaRepository<RecuperarSenha, Integer> {
    Optional<RecuperarSenha> findByEmailAndCodigoAndStatusCodigoTrue(String email, String codigo);
}
