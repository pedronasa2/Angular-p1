package loja.informatica.models;

import java.math.BigDecimal;

public record DadosProduto (
        Long id,

        String nome,

        String codigo,

        BigDecimal valorUnitario,

        String descricao
        ){
    public DadosProduto(Produto produto){
        this(produto.getId(), produto.getNome(), produto.getCodigo(), produto.getValorUnitario(), produto.getDescricao());
    }
}
