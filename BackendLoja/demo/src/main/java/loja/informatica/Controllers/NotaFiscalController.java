package loja.informatica.Controllers;

import jakarta.transaction.Transactional;
import loja.informatica.Service.NotaFiscalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@Controller
@RequestMapping("/notafiscal")
@CrossOrigin(origins = "*")
public class NotaFiscalController {

    @Autowired
    private NotaFiscalService service;


    @PostMapping("/{idCliente}/produtos")
    @Transactional
    public ResponseEntity criarNotaComProdutos(@PathVariable Long idCliente, @RequestBody List<Long> produtos){
        try{
            var nota =service.criarNota(idCliente);
            produtos.forEach(id -> service.adicionarProduto(nota.id(), id));
            return ResponseEntity.ok(nota);

        }catch (Exception e ){
            return ResponseEntity.badRequest().body(e);
        }
    }

    @PostMapping("/{idCliente}")
    @Transactional
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
    public ResponseEntity listarUnico(@PathVariable Long id){
        try{
            return ResponseEntity.ok(service.listaItem(id));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e);
        }
    }

    @PutMapping ("/{idNota}/adcionar/{idProduto}")
    public ResponseEntity adcionarItem(@PathVariable Long idNota, @PathVariable Long idProduto){
        try{
            return ResponseEntity.ok(service.adicionarProduto(idNota, idProduto));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e);
        }
    }



}
