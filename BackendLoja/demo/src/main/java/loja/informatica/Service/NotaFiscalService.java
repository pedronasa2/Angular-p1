package loja.informatica.Service;

import jakarta.transaction.Transactional;
import loja.informatica.Models.NotaFiscal;
import loja.informatica.NotaFiscal.DadosNotafiscal;
import loja.informatica.NotaFiscal.ItenNota;
import loja.informatica.NotaFiscal.RepositoryItenNota;
import loja.informatica.NotaFiscal.RepositoryNotaFiscal;
import loja.informatica.Produto.RepositoryProduto;
import loja.informatica.cliente.RepositoryCliente;
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

    public DadosNotafiscal criarNota(Long idCliente){

        if (repositoryCliente.existsById(idCliente)){
            var cliente = repositoryCliente.getReferenceById(idCliente);
            var nota = new NotaFiscal(cliente);
            cliente.getNotas().add(repositoryNotaFiscal.save(nota));
            return new DadosNotafiscal(nota);
        }
        throw new RuntimeException("Id do cliente não exite");
    }

    public List<DadosNotafiscal> listarTodas() {


        List<DadosNotafiscal> lista = new ArrayList<>();
        repositoryNotaFiscal.findAll().forEach(n -> lista.add(new DadosNotafiscal(n)));
        return lista;

    }

    public DadosNotafiscal listaItem(Long id) {

        if (repositoryNotaFiscal.existsById(id)){
            return new DadosNotafiscal(repositoryNotaFiscal.getReferenceById(id));
        }
        throw new RuntimeException("Id da nota não exite");

    }

    public DadosNotafiscal adicionarProduto(Long idNota, Long idProduto) {

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


        return new DadosNotafiscal(nota);
    }
}
