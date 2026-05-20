package com.backend.angula.Service;

import com.backend.angula.model.Contato;
import com.backend.angula.Repository.ContatoRepository;
import com.backend.angula.Repository.DadosContato;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ContatoService {

    @Autowired
    private ContatoRepository repository;

    public List<DadosContato> listarTodos(){
        List<DadosContato> lista = new ArrayList<>();
        repository.findAll().forEach(c -> lista.add(new DadosContato(c)));
        return lista;
    }

    public DadosContato contato(Long id) {
        return new DadosContato(repository.findById(id).get());
    }

    public void savar(DadosContato dados) {
        repository.save(new Contato(dados));
    }

    public void adcionarListaDeContato(List<DadosContato> dados) {
        dados.forEach(c -> repository.save(new Contato(c)));
    }

    public void atualizarContato(Long id, DadosContato dados) {
        if (repository.existsById(id)){
            repository.findById(id).get().atualizarDados(dados);
        }
    }

    public void deletarPorId(Long id) {
        System.out.println(id);
        repository.deleteById(id);
    }
}
