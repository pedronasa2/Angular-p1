package loja.informatica.cliente;


import loja.informatica.Models.Cliente;
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

