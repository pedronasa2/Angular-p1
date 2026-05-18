package com.backend.angula.Controllers;

import com.backend.angula.Contato.Contato;
import com.backend.angula.Contato.ContatoRepository;
import com.backend.angula.Contato.DadosContato;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
@Transactional
@RestController
@RequestMapping("/contato")
@CrossOrigin(origins = "http://localhost:4200")
public class ContatoController {

    @Autowired
    private ContatoRepository repository;

    @GetMapping
    public List<DadosContato> listarTodos(){
        List<DadosContato> lista = new ArrayList<>();
        repository.findAll().forEach(c -> lista.add(new DadosContato(c)));
        return lista;
    }

    @GetMapping("/{id}")
    public DadosContato listarPorLetra(@PathVariable Long id){
        Contato contato = repository.findById(id).get();
        return new DadosContato(contato);
    }

    @PostMapping
    public  void adicionarContato(@RequestBody DadosContato dados){
        repository.save(new Contato(dados));
    }

    @PostMapping("/lista")
    public  void adicionarContatoLista(@RequestBody List<DadosContato> dados){

           dados.forEach(c -> repository.save(new Contato(c)));
    }

    @PutMapping("/{id}")

    public void atualizarDados(@PathVariable Long id, @RequestBody DadosContato dados){
        if (repository.existsById(id)){
            repository.findById(id).get().atualizarDados(dados);
        }
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id){
        System.out.println(id);
        repository.deleteById(id);
    }

}
