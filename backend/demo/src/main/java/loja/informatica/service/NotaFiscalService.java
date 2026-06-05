package loja.informatica.service;

import jakarta.transaction.Transactional;
import loja.informatica.models.Cliente;
import loja.informatica.models.NotaFiscal;
import loja.informatica.models.ItenNota;
import loja.informatica.repositorios.RepositoryItenNota;
import loja.informatica.repositorios.RepositoryNotaFiscal;
import loja.informatica.repositorios.RepositoryProduto;
import loja.informatica.repositorios.RepositoryCliente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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

    public Cliente.DadosNotafiscal criarNota(Long idCliente){

        if (repositoryCliente.existsById(idCliente)){
            var cliente = repositoryCliente.getReferenceById(idCliente);
            var nota = new NotaFiscal(cliente);
            return new Cliente.DadosNotafiscal(nota);
        }
        throw new RuntimeException("Id do cliente não exite");
    }

    public List<Cliente.DadosNotafiscal> listarTodas() {


        List<Cliente.DadosNotafiscal> lista = new ArrayList<>();
        repositoryNotaFiscal.findAll().forEach(n -> lista.add(new Cliente.DadosNotafiscal(n)));
        return lista;

    }

    public Cliente.DadosNotafiscal listaItem(Long id) {

        if (repositoryNotaFiscal.existsById(id)){
            return new Cliente.DadosNotafiscal(repositoryNotaFiscal.getReferenceById(id));
        }
        throw new RuntimeException("Id da nota não exite");

    }

    public Cliente.DadosNotafiscal adicionarProduto(Long idNota, Long idProduto) {

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


        return new Cliente.DadosNotafiscal(nota);
    }

    public void adicionarProdutos(Long id, List<ItenNota> produtos) {
        NotaFiscal nota = repositoryNotaFiscal.getReferenceById(id);
        if (nota != null){

            nota.setListaItens(produtos);
            repositoryNotaFiscal.save(nota);

        }
    }

    public NotaFiscal criarNotaComItens(Long idCliente, List<ItenNota> produtos) {

        var cliente = repositoryCliente.findById(idCliente)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

        NotaFiscal nota = new NotaFiscal(cliente);

        for (ItenNota item : produtos) {
            item.setNotaFiscal(nota);
            nota.adicionasItens(item);
        }

        return repositoryNotaFiscal.save(nota);
    }

    public void deletarPorId(Long id) {
        repositoryNotaFiscal.deleteById(id);
    }
}
