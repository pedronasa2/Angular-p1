package loja.informatica.repositorios;


import loja.informatica.models.Cliente;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryCliente extends JpaRepository<Cliente, Long> {

    Cliente findByCodigo(String codigo);

    boolean existsByCodigo(String codigo);

    Page<Cliente> findAllByAtivoTrue(Pageable paginacao);


}

