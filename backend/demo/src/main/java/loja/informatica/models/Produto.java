package loja.informatica.models;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;


@Data
@Entity
@NoArgsConstructor
public class Produto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private String codigo;

    private BigDecimal valorUnitario;

    private String descricao;

    private Boolean ativo = true;


    public Produto(Cliente.DadosProduto dados) {

        this.nome = dados.nome();
        this.codigo = dados.codigo();
        this.valorUnitario = dados.valorUnitario();
        this.descricao = dados.descricao();
    }

    public void atualizarInfomacoes(Cliente.DadosProduto dados) {

        if(dados.codigo() != null){this.codigo = dados.codigo();}
        if(dados.nome() != null){this.nome = dados.nome();}
        if(dados.valorUnitario() != null){this.valorUnitario = dados.valorUnitario();}
        if(dados.descricao() != null){this.descricao = dados.descricao();}
        if(dados.ativo() != null){this.ativo = dados.ativo();}
    }



}
