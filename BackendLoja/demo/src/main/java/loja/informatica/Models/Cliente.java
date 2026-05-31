    package loja.informatica.Models;

    import com.fasterxml.jackson.annotation.JsonIgnore;
    import jakarta.persistence.*;
    import loja.informatica.cliente.DadosCastroCliente;
    import lombok.Data;
    import lombok.NoArgsConstructor;

    import java.util.ArrayList;
    import java.util.List;

    @Data
    @Entity
    @NoArgsConstructor
    public class Cliente {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;
        private String codigo;
        private String nome;
        private Boolean ativo = true;

        @JsonIgnore
        @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL, orphanRemoval = true)
        private List<NotaFiscal> notas = new ArrayList<>();


        public Cliente(DadosCastroCliente dados) {
            this.codigo = dados.codigo();
            this.nome = dados.nome();
        }

        @Override
        public String toString() {
            return "[ nome: " + this.nome + "| codigo: " + this.codigo + " ]";
        }

        public void atualizarDados(DadosCastroCliente dados) {

            if(dados.codigo() != null){
                this.codigo = dados.codigo();
            }
            if (dados.nome() != null){
                this.nome = dados.nome();
            }

            if (dados.ativo() != null){
                this.ativo = dados.ativo();
            }

        }
    }
