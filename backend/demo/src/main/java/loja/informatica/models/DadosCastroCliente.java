package loja.informatica.models;

import jakarta.validation.constraints.NotBlank;

import java.util.List;

public record DadosCastroCliente(

        @NotBlank
        String nome,
        @NotBlank
        String codigo,
        Long id,
        Boolean ativo
        ) {

    public DadosCastroCliente(Cliente cliente) {
        this(cliente.getNome(), cliente.getCodigo(), cliente.getId(), cliente.getAtivo());
    }
}
