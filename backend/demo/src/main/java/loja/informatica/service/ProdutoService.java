package loja.informatica.service;

import jakarta.transaction.Transactional;
import loja.informatica.models.Cliente;
import loja.informatica.models.DadosProduto;
import loja.informatica.models.Produto;
import loja.informatica.repositorios.RepositoryProduto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Transactional
@Service
public class ProdutoService {
    @Autowired
    private RepositoryProduto repository;

    public DadosProduto add(DadosProduto dados){
        if (repository.existsByCodigo(dados.codigo())){
            throw new RuntimeException("Codigo do produto já existe");
        }
        return new DadosProduto(repository.save(new Produto(dados)));

    }

    public DadosProduto buscarPorId(Long id) {

        if (repository.existsById(id)) {
            return new DadosProduto(repository.getReferenceById(id));
        }
        throw new RuntimeException("Não exite produtos com o id " + id );
    }

    public DadosProduto buscarPorCodigo(String codigo) {
        if (repository.existsByCodigo(codigo)) {
            return new DadosProduto(repository.getReferenceByCodigo(codigo));
        }
        throw new RuntimeException("Não exite produto por codigo " + codigo);
    }

    public DadosProduto deletar(Long id) {
        if (repository.existsById(id)) {
            var produto = repository.getReferenceById(id);
            produto.setAtivo(false);
            return new DadosProduto(produto);
        }
        throw new RuntimeException("Não exite produtos com o id " + id );
    }
    @Transactional
    public DadosProduto atualizarProduto(DadosProduto dados, Long id) {

        if (repository.existsById(id)) {
            var produto = repository.getReferenceById(id);
            produto.atualizarInfomacoes(dados);
            return new DadosProduto(produto);
        }
        throw new RuntimeException("Não exite produtos com o id " + id );
    }

    public List<DadosProduto> paginacao(Pageable paginacao) {
        return repository.findAllByAtivoTrue(paginacao).stream().toList();
    }
}
