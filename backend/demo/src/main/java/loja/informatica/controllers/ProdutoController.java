package loja.informatica.controllers;

import jakarta.validation.Valid;
import loja.informatica.models.DadosProduto;
import loja.informatica.service.ProdutoService;
import loja.informatica.models.Cliente;
import loja.informatica.repositorios.RepositoryProduto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("/produto")
@CrossOrigin(origins = "*")
public class ProdutoController {

    @Autowired
    private RepositoryProduto repository;

    @Autowired
    private ProdutoService service;

    @PostMapping
    public ResponseEntity adicionarProduto(@RequestBody @Valid DadosProduto dados, UriComponentsBuilder uriBuilder){

        try{
            var produto = service.add(dados);
            var uri = uriBuilder.path("/produto/{id}").buildAndExpand(produto.id()).toUri();
            return ResponseEntity.created(uri).body(produto);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e);
        }

    }

    /*@GetMapping
    public ResponseEntity<Page<DadosProduto>> listar(@PageableDefault(size = 10, sort = {"nome"}) Pageable paginacao) {
        return ResponseEntity.ok(service.paginacao(paginacao));
    }*/
    @GetMapping
    public ResponseEntity listar(@PageableDefault(size = 10, sort = {"nome"}) Pageable paginacao) {
        return ResponseEntity.ok(service.paginacao(paginacao));
    }

    @GetMapping("/{id}")
    public ResponseEntity buscaId(@PathVariable Long id){
        try {
            return ResponseEntity.ok(service.buscarPorId(id));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e);
        }


    }

    @GetMapping("/codigo/{codigo}")
    public ResponseEntity buscaCodigo(@PathVariable String codigo){
        try{
            return ResponseEntity.ok(service.buscarPorCodigo(codigo));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e);
        }
    }

    @DeleteMapping("/{id}")
    public  ResponseEntity deletar(@PathVariable Long id){

        try{
            return ResponseEntity.ok(service.deletar(id));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity atualizar(@RequestBody DadosProduto dados, @PathVariable Long id){

        try{
            return ResponseEntity.ok(service.atualizarProduto(dados, id));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e);
        }

    }

}

