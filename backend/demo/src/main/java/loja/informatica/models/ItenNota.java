package loja.informatica.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
public class ItenNota {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Produto produto;

    private BigDecimal valorTotal;

    private Long quantidade;

    @ManyToOne
    @JoinColumn(name = "nota_fiscal_id")
    private NotaFiscal notaFiscal;

    public ItenNota(Produto produto){

        this.valorTotal = produto.getValorUnitario();

    }

    public ItenNota(Long id, Produto produto, BigDecimal valorTotal, Long quantidade, NotaFiscal notaFiscal) {
        this.id = id;
        this.produto = produto;
        this.valorTotal = valorTotal;
        this.quantidade = quantidade;
        this.notaFiscal = notaFiscal;
    }
}
