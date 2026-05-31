package loja.informatica.NotaFiscal;

import loja.informatica.Models.NotaFiscal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryNotaFiscal extends JpaRepository<NotaFiscal, Long> {
}
