package loja.informatica.service;

import jakarta.transaction.Transactional;
import loja.informatica.models.*;
import loja.informatica.repositorios.RepositoryItenNota;
import loja.informatica.repositorios.RepositoryNotaFiscal;
import loja.informatica.repositorios.RepositoryProduto;
import loja.informatica.repositorios.RepositoryCliente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class NotaFiscalService {

    @Autowired
    private RepositoryNotaFiscal repositoryNotaFiscal;

    @Autowired
    private RepositoryProduto repositoryProduto;

    @Autowired
    private RepositoryItenNota repositoryItenNota;

    @Autowired
    private RepositoryCliente repositoryCliente;

    public DadosNotaFiscal criarNota(Long idCliente){

        if (repositoryCliente.existsById(idCliente)){
            var cliente = repositoryCliente.getReferenceById(idCliente);
            var nota = new NotaFiscal(cliente);
            return new DadosNotaFiscal(nota);
        }
        throw new RuntimeException("Id do cliente não exite");
    }

    public List<DadosNotaFiscal> listarTodas() {


        List<DadosNotaFiscal> lista = new ArrayList<>();
        repositoryNotaFiscal.findAll().forEach(n -> lista.add(new DadosNotaFiscal(n)));
        return lista;

    }

    public DadosNotaFiscal listaItem(Long id) {

        if (repositoryNotaFiscal.existsById(id)){
            return new DadosNotaFiscal(repositoryNotaFiscal.getReferenceById(id));
        }
        throw new RuntimeException("Id da nota não exite");

    }

    public DadosNotaFiscal adicionarProduto(Long idNota, Long idProduto) {

        if (!repositoryNotaFiscal.existsById(idNota)){
            throw new RuntimeException("Não foi possivel acha a nota com o id: " + idNota );
        }
        if (!repositoryProduto.existsById(idProduto)){
            throw new RuntimeException("Não foi possivel acha o produto com o id: " + idProduto );
        }

        var item = new ItenNota(repositoryProduto.getReferenceById(idProduto));
        var nota = repositoryNotaFiscal.getReferenceById(idNota);
        item.setNotaFiscal(nota);
        nota.adicionasItens(item);
        repositoryItenNota.save(item);


        return new DadosNotaFiscal(nota);
    }

    public void adicionarProdutos(Long id, List<ItenNota> produtos) {
        NotaFiscal nota = repositoryNotaFiscal.getReferenceById(id);
        if (nota != null){

            nota.setListaItens(produtos);
            repositoryNotaFiscal.save(nota);

        }
    }

    public NotaFiscal criarNotaComItens(Long idCliente, List<DadosCadastroItem> itens) {
        var cliente = repositoryCliente.findById(idCliente)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

        NotaFiscal nota = new NotaFiscal(cliente);

        for (DadosCadastroItem dto : itens) {
            var produto = repositoryProduto.findById(dto.idProduto())
                    .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

            ItenNota item = new ItenNota();
            item.setProduto(produto);
            item.setQuantidade(dto.quantidade());
            item.setValorTotal(dto.valorTotal());
            item.setNotaFiscal(nota);

            nota.adicionasItens(item);
        }

        return repositoryNotaFiscal.save(nota);
    }

    public void deletarPorId(Long id) {
        repositoryNotaFiscal.deleteById(id);
    }


    public NotaFiscal criarNotaCompleta(DadosCadastroNotaCompleta dadosCadastro) {

        var cliente = repositoryCliente.getReferenceById(dadosCadastro.cliente().id());

        NotaFiscal nota = new NotaFiscal(cliente);
        nota.setData(dadosCadastro.data());


        for (DadosCadastroItem dados : dadosCadastro.listaItens()) {
            var produto = repositoryProduto.getReferenceById(dados.idProduto());

            ItenNota item = new ItenNota();
            item.setProduto(produto);
            item.setQuantidade(dados.quantidade());
            item.setValorTotal(dados.valorTotal());
            item.setNotaFiscal(nota);

            nota.adicionasItens(item);
        }

        return repositoryNotaFiscal.save(nota);
    }

    public DadosNotaFiscal atualizarNota(DadosCadastroNotaCompleta dadosCadastro) {

        var cliente = repositoryCliente.getReferenceById(dadosCadastro.cliente().id());


        NotaFiscal nota = repositoryNotaFiscal.getReferenceById(dadosCadastro.id());
        nota.setCliente(cliente);
        if (dadosCadastro.data() != null){nota.setData(dadosCadastro.data());}

        List<ItenNota> lista = new ArrayList<>();
        nota.getListaItens().clear();
        BigDecimal novoValorTotal = BigDecimal.ZERO;
        for (DadosCadastroItem dados : dadosCadastro.listaItens()) {
            var produto = repositoryProduto.getReferenceById(dados.idProduto());

            ItenNota item = new ItenNota();
            item.setProduto(produto);
            item.setQuantidade(dados.quantidade());
            item.setValorTotal(dados.valorTotal());
            item.setNotaFiscal(nota);
            repositoryItenNota.save(item);
            lista.add(item);
            nota.getListaItens().add(item);
            novoValorTotal = novoValorTotal.add(dados.valorTotal());
            }
        nota.setValorTotal(novoValorTotal);

        return new DadosNotaFiscal(repositoryNotaFiscal.save(nota));
    }
}
