package loja.informatica.controllers;


import loja.informatica.models.DadosCadastroItem;
import loja.informatica.models.DadosCadastroNotaCompleta;
import loja.informatica.models.DadosNotaFiscal;
import loja.informatica.models.ItenNota;
import loja.informatica.service.NotaFiscalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@RestController
@RequestMapping("/notafiscal")
@CrossOrigin(origins = "*")
public class NotaFiscalController {

    @Autowired
    private NotaFiscalService service;

    @PostMapping
    public ResponseEntity criarNotaCompleta(@RequestBody DadosCadastroNotaCompleta dados) {
        try {
            var nota = service.criarNotaCompleta(dados);
            return ResponseEntity.ok(new DadosNotaFiscal(nota));
        } catch (Exception e ){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/{idCliente}/produtos")
    public ResponseEntity criarNotaComProdutos(@PathVariable Long idCliente, @RequestBody List<DadosCadastroItem> produtos) {
        try {
            var nota = service.criarNotaComItens(idCliente, produtos);
            return ResponseEntity.ok(new DadosNotaFiscal(nota));
        } catch (Exception e ){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/{idCliente}")
    public ResponseEntity criarNota(@PathVariable Long idCliente, UriComponentsBuilder uriBuilder){
        try{
            var nota =service.criarNota(idCliente);
            var uri = uriBuilder.path("/notafiscal/{id}").buildAndExpand(nota.id()).toUri();
            return ResponseEntity.created(uri).body(uri);

        }catch (Exception e ){
            return ResponseEntity.badRequest().body(e);
        }
    }




    @GetMapping
    public ResponseEntity listarTodas(){
            return ResponseEntity.ok(service.listarTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity listarNota(@PathVariable Long id){
        try{
            return ResponseEntity.ok(service.listaItem(id));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e);
        }
    }

    @PutMapping()
    public ResponseEntity adcionarItem(@RequestBody DadosCadastroNotaCompleta nota) {
        try{
            return ResponseEntity.ok(service.atualizarNota(nota));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deletarPorId(@PathVariable Long id){
        try{
            service.deletarPorId(id);
            return ResponseEntity.ok("{}");
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e);
        }
    }



}
