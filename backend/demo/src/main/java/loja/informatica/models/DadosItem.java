package loja.informatica.models;

import java.math.BigDecimal;

public record DadosItem(
                        String codigo,

                        String nome,

                        BigDecimal valorTotal

                        ) {
    public DadosItem(ItenNota itenNota) {
        this(itenNota.getCodigoProduto(), itenNota.getNome(), itenNota.getValorTotal() );
    }
}
