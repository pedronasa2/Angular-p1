package loja.informatica.repositorios;

import loja.informatica.models.NotaFiscal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryNotaFiscal extends JpaRepository<NotaFiscal, Long> {
}
