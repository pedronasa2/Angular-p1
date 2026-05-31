package loja.informatica.Service;

import jakarta.transaction.Transactional;
import loja.informatica.Models.Cliente;
import loja.informatica.NotaFiscal.DadosNotafiscal;
import loja.informatica.cliente.DadosCastroCliente;
import loja.informatica.cliente.RepositoryCliente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Service
public class ClienteService {

    @Autowired
    RepositoryCliente repository;

    @Transactional
    public DadosCastroCliente salvar(DadosCastroCliente dados){

        if (repository.existsByCodigo(dados.codigo())){
            throw new RuntimeException("Codigo de cliente já cadastrado ");
        }
        return new DadosCastroCliente(repository.save(new Cliente(dados)));

    }

    public List<DadosCastroCliente> listaTodos(Pageable pageable){

        List<DadosCastroCliente> clientes = new ArrayList<>();
        repository.findAllByAtivoTrue(pageable).forEach(c -> clientes.add(new DadosCastroCliente(c)));
        return clientes;
    }

    public DadosCastroCliente buscarId(Long id){
        if(repository.existsById(id)){
            return new DadosCastroCliente(repository.getReferenceById(id));
        }
        throw new RuntimeException("Não exite cliente com o id " + id );
    }


    public DadosCastroCliente atualizarCiente(Long id, DadosCastroCliente dados) {
        if(repository.existsById(id)){
            var cliente = repository.getReferenceById(id);
            cliente.atualizarDados(dados);
            repository.save(cliente);
            return new DadosCastroCliente(cliente);
        }
        throw new RuntimeException("Não exite cliente com o id: " + id);
    }

    public List<DadosNotafiscal> listaNotasCliente(Long id) {
        return repository.getReferenceById(id).getNotas().stream().map(n -> new DadosNotafiscal(n)).toList();
    }

    public String deletarPorId(Long id) {
        repository.deleteById(id);
        return "ok";
    }
}
