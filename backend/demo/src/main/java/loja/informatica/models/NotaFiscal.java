package loja.informatica.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Data
@NoArgsConstructor
public class NotaFiscal {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Cliente cliente;

    private LocalDateTime data;

    private BigDecimal valorTotal = BigDecimal.ZERO;


    @OneToMany(mappedBy = "notaFiscal", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ItenNota> listaItens = new ArrayList<>();

    public NotaFiscal(Cliente cliente) {
        this.cliente = cliente;
    }

    public void adicionasItens(ItenNota item){
        this.listaItens.add(item);
        this.valorTotal = this.valorTotal.add(item.getValorTotal());
    }

    public void atualizarDados(DadosCadastroNotaCompleta nota, List<ItenNota> itensConvertidos) {
        if (nota.cliente() != null) {
            this.cliente = new Cliente(nota.cliente());
        }
        if (nota.data() != null) {
            this.data = nota.data();
        }
        if (itensConvertidos != null && !itensConvertidos.isEmpty()) {
            this.listaItens = itensConvertidos;
            itensConvertidos.forEach(i -> this.valorTotal.add(i.getValorTotal()));
        }
    }
}
