package com.backend.angula.model;

import com.backend.angula.Repository.DadosContato;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Data
@Getter
public class Contato {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private String telefone;

    private String email;
    private String aniversario;
    private String redes;
    private String observacoes;

    public Contato(DadosContato dados) {
        this.nome = dados.nome();
        this.telefone = dados.telefone();
    }

    public void atualizarDados(DadosContato dados){
        this.nome = dados.nome();
        this.telefone = dados.telefone();
        this.email = dados.email();
        this.aniversario = dados.aniversario();
        this.redes = dados.redes();
        this.observacoes = dados.observacoes();
    }
}
