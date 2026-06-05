package loja.informatica.service;

import jakarta.transaction.Transactional;
import loja.informatica.models.Cliente;
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

    public Cliente.DadosProduto add(Cliente.DadosProduto dados){
        if (repository.existsByCodigo(dados.codigo())){
            throw new RuntimeException("Codigo do produto já existe");
        }
        return new Cliente.DadosProduto(repository.save(new Produto(dados)));

    }

    public Cliente.DadosProduto buscarPorId(Long id) {

        if (repository.existsById(id)) {
            return new Cliente.DadosProduto(repository.getReferenceById(id));
        }
        throw new RuntimeException("Não exite produtos com o id " + id );
    }

    public Cliente.DadosProduto buscarPorCodigo(String codigo) {
        if (repository.existsByCodigo(codigo)) {
            return new Cliente.DadosProduto(repository.getReferenceByCodigo(codigo));
        }
        throw new RuntimeException("Não exite produto por codigo " + codigo);
    }

    public Cliente.DadosProduto deletar(Long id) {
        if (repository.existsById(id)) {
            var produto = repository.getReferenceById(id);
            produto.setAtivo(false);
            return new Cliente.DadosProduto(produto);
        }
        throw new RuntimeException("Não exite produtos com o id " + id );
    }
    @Transactional
    public Cliente.DadosProduto atualizarProduto(Cliente.DadosProduto dados, Long id) {

        if (repository.existsById(id)) {
            var produto = repository.getReferenceById(id);
            produto.atualizarInfomacoes(dados);
            return new Cliente.DadosProduto(produto);
        }
        throw new RuntimeException("Não exite produtos com o id " + id );
    }

    public List<Cliente.DadosProduto> paginacao(Pageable paginacao) {
        return repository.findAllByAtivoTrue(paginacao).stream().toList();
    }
}
