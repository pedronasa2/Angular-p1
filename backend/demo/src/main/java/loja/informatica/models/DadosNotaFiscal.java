package loja.informatica.models;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record DadosNotaFiscal(
        Long id,
        DadosCastroCliente cliente,
        LocalDateTime data,
        BigDecimal valorTotal,
        List<DadosItem> listaItens) {

    public DadosNotaFiscal(NotaFiscal nota) {
        this(nota.getId(),
                new DadosCastroCliente(nota.getCliente()),
                nota.getData(),
                nota.getValorTotal(),
                nota.getListaItens().stream().map(DadosItem::new).toList());
    }
}