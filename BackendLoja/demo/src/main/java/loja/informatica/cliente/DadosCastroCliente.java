package loja.informatica.cliente;

import jakarta.validation.constraints.NotBlank;
import loja.informatica.Models.Cliente;
import loja.informatica.Models.NotaFiscal;
import loja.informatica.NotaFiscal.DadosNotafiscal;

import java.util.List;

public record DadosCastroCliente(

        @NotBlank
        String nome,
        @NotBlank
        String codigo,
        Long id,
        Boolean ativo,
        List<DadosNotafiscal> nota
        ) {

    public DadosCastroCliente(Cliente cliente) {
        this(cliente.getNome(), cliente.getCodigo(), cliente.getId(), cliente.getAtivo(), cliente.getNotas().stream().map(DadosNotafiscal::new).toList() );
    }


}
