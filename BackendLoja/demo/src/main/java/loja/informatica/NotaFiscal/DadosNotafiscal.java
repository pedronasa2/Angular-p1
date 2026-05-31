package loja.informatica.NotaFiscal;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import loja.informatica.Models.Cliente;
import loja.informatica.Models.NotaFiscal;
import loja.informatica.cliente.DadosCastroCliente;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record DadosNotafiscal(

        Long id,
        Long idCliente,
        String nomeCliente,
        LocalDateTime data,
        BigDecimal valorTotal,
        List<DadosItem> listaItens
) {
    public DadosNotafiscal(NotaFiscal nota) {
        this(nota.getId(),
                nota.getCliente().getId(),
                nota.getCliente().getNome(),
                nota.getData(),
                nota.getValorTotal(),
                nota.getListaItens().stream().map(i -> new DadosItem(i)).toList());
    }
}
