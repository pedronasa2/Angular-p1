package loja.informatica.repositorios;

import loja.informatica.models.ItenNota;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepositoryItenNota extends JpaRepository<ItenNota, Long> {
}
