package loja.informatica.models;

import jakarta.persistence.*;
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

    private BigDecimal valorTotal;


    private Long quantidade;

    @ManyToOne
    @JoinColumn(name = "nota_fiscal_id")
    private NotaFiscal notaFiscal;

    public ItenNota(Produto produto){

        this.codigoProduto = produto.getCodigo();
        this.nome = produto.getNome();
        this.valorTotal = produto.getValorUnitario();

    }

}
