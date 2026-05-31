package loja.informatica.NotaFiscal;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record DadosItem(
                        String codigo,

                        String nome,

                        BigDecimal valorUnitario,

                        String descricao) {
    public DadosItem(ItenNota itenNota) {
        this(itenNota.getCodigoProduto(), itenNota.getNome(), itenNota.getValorUnitario(), itenNota.getDescricao());
    }
}
