package com.backend.angula.Controller;

import com.backend.angula.Service.ContatoService;
import com.backend.angula.Repository.DadosContato;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@Transactional
@RestController
@RequestMapping("/contato")
@CrossOrigin(origins = "http://localhost:4200")
public class ContatoController {

    @Autowired
    private ContatoService service;

    @GetMapping
    public List<DadosContato> listarTodos(){

        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public DadosContato listarPorid(@PathVariable Long id){

        return service.contato(id);
    }

    @PostMapping
    public  void adicionarContato(@RequestBody DadosContato dados){
        service.savar(dados);
    }


    @PostMapping("/lista")
    public  void adicionarContatoLista(@RequestBody List<DadosContato> dados){
           service.adcionarListaDeContato(dados);
    }

    @PutMapping("/{id}")

    public void atualizarDados(@PathVariable Long id, @RequestBody DadosContato dados){
        service.atualizarContato(id, dados);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id){
        service.deletarPorId(id);
    }

}
