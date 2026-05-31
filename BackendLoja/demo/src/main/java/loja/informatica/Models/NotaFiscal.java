package loja.informatica.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import loja.informatica.NotaFiscal.ItenNota;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class NotaFiscal {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonIgnore
    private Cliente cliente;

    private LocalDateTime data = LocalDateTime.now();

    private BigDecimal valorTotal = new BigDecimal(0);

    @OneToMany(mappedBy = "notaFiscal", cascade = CascadeType.ALL)
    private List<ItenNota> listaItens = new ArrayList<>();

    public NotaFiscal(Cliente cliente) {
        this.cliente = cliente;
    }

    public void adicionasItens(ItenNota item){
        this.listaItens.add(item);
        this.valorTotal = this.valorTotal.add(item.getValorUnitario());
    }


}
