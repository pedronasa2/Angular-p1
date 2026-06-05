package loja.informatica.repositorios;

import jakarta.validation.constraints.NotBlank;
import loja.informatica.models.Cliente;
import loja.informatica.models.Produto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryProduto extends JpaRepository<Produto, Long> {
    boolean existsByCodigo(@NotBlank String codigo);

    Produto getReferenceByCodigo(String codigo);

    Page<Cliente.DadosProduto> findAllByAtivoTrue(Pageable paginacao);
}
