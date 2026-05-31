package loja.informatica.Controllers;

import loja.informatica.Service.ClienteService;
import loja.informatica.cliente.DadosCastroCliente;
import loja.informatica.cliente.RepositoryCliente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;


@RestController
@RequestMapping("/cliente")
@CrossOrigin(origins = "*")
public class ClienteControllers {

    @Autowired
    private RepositoryCliente repository;

    @Autowired
    private ClienteService service;



    @PostMapping
    public ResponseEntity cadastrar(@RequestBody DadosCastroCliente dados, UriComponentsBuilder uriBuilder){

        try{
            var cliente = service.salvar(dados);
            var uri = uriBuilder.path("/cliente/{id}").buildAndExpand(cliente.id()).toUri();
            return ResponseEntity.created(uri).body(cliente);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e);
        }

    }
     @GetMapping
    public ResponseEntity listarCliente(@PageableDefault(size = 10, sort = {"nome"}) Pageable paginacao){

        return ResponseEntity.ok(service.listaTodos(paginacao));

    }

    @GetMapping("/notas/{id}")
    public ResponseEntity notasDoCliente(@PathVariable Long id){
        try {
            return ResponseEntity.ok(service.listaNotasCliente(id));
        }catch (Exception erro){
            return ResponseEntity.badRequest().body(erro);
        }
    }



    @GetMapping("/bucarid/{id}")
    public  ResponseEntity detalhar(@PathVariable Long id){
        return ResponseEntity.ok(new DadosCastroCliente(repository.getReferenceById(id)));
    }

    @GetMapping("/buscarcodigo/{codigo}")
    public ResponseEntity buscaNome(@PathVariable String codigo){
        return ResponseEntity.ok(new DadosCastroCliente(repository.findByCodigo(codigo)));
    }

    @PutMapping("/{id}")
    public  ResponseEntity buscaNome(@PathVariable Long id, @RequestBody DadosCastroCliente dados){
        try {
            return ResponseEntity.ok(service.atualizarCiente(id, dados));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e);
        }
    }

    @DeleteMapping("/{id}")
    public  ResponseEntity deletarCliente(@PathVariable Long id){
        try{
            service.deletarPorId(id);
            return ResponseEntity.ok("{}");
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e);
        }
    }

    }
