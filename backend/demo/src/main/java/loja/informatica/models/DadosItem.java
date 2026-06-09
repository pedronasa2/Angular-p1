package loja.informatica.models;

import java.math.BigDecimal;

public record DadosItem(
                        Long id,

                        DadosProduto produto,


                        BigDecimal valorTotal,

                        Long quantidade
                        ) {
    public DadosItem(ItenNota itenNota) {
        this(itenNota.getId() ,new DadosProduto(itenNota.getProduto()),  itenNota.getValorTotal(), itenNota.getQuantidade() );
    }
}
