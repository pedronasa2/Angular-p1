package loja.informatica.Produto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import loja.informatica.Models.Produto;

import java.math.BigDecimal;
public record DadosProduto(

        @NotBlank
        String codigo,

        @NotBlank
        String nome,

        @NotNull
        BigDecimal valorUnitario,

        String descricao,

        Long id,

        Boolean ativo
) {
    public DadosProduto(Produto p) {
        this(p.getCodigo(), p.getNome(), p.getValorUnitario(), p.getDescricao(), p.getId(), p.getAtivo());
    }
}
