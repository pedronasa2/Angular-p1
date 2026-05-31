package loja.informatica.NotaFiscal;

import jakarta.persistence.*;
import loja.informatica.Models.NotaFiscal;
import loja.informatica.Models.Produto;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@Entity
public class ItenNota {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private String codigoProduto;

    private BigDecimal valorUnitario;

    private String descricao;

    @ManyToOne
    @JoinColumn(name = "nota_fiscal_id")
    private NotaFiscal notaFiscal;

    public ItenNota(Produto produto){

        this.codigoProduto = produto.getCodigo();
        this.nome = produto.getNome();
        this.valorUnitario = produto.getValorUnitario();
        this.descricao = produto.getDescricao();

    }

}
