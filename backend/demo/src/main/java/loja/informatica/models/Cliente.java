    package loja.informatica.models;

    import jakarta.persistence.*;
    import jakarta.validation.constraints.NotBlank;
    import jakarta.validation.constraints.NotNull;
    import lombok.Data;
    import lombok.NoArgsConstructor;

    import java.math.BigDecimal;
    import java.time.LocalDateTime;
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


        public Cliente(DadosCastroCliente dados) {
            this.codigo = dados.codigo();
            this.nome = dados.nome();
        }

        @Override
        public String toString() {
            return "[ nome: " + this.nome + "| codigo: " + this.codigo + " ]";
        }

        public void atualizarDados(DadosCastroCliente dados) {

            if (dados.codigo() != null) {
                this.codigo = dados.codigo();
            }
            if (dados.nome() != null) {
                this.nome = dados.nome();
            }

            if (dados.ativo() != null) {
                this.ativo = dados.ativo();
            }

        }


    }
