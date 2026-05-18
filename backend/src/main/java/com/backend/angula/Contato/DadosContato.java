package com.backend.angula.Contato;

public record DadosContato(Long id,
                           String nome,
                           String telefone,
                           String email,
                           String aniversario,
                           String redes,
                           String observacoes) {
    public DadosContato(Contato contato){

        this(contato.getId(),contato.getNome(), contato.getTelefone(), contato.getEmail(), contato.getAniversario(), contato.getRedes(), contato.getObservacoes());
    }
}
