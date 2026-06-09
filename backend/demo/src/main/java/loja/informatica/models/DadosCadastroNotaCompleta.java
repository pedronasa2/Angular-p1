package loja.informatica.models;

import java.time.LocalDateTime;
import java.util.List;

public record DadosCadastroNotaCompleta(
        Long id,
        DadosCastroCliente cliente,
        LocalDateTime data,
        List<DadosCadastroItem> listaItens
) {}