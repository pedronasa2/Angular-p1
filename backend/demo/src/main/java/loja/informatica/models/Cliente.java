    package loja.informatica.models;

    import com.fasterxml.jackson.annotation.JsonIgnore;
    import jakarta.persistence.*;
    import jakarta.validation.constraints.NotBlank;
    import jakarta.validation.constraints.NotNull;
    import lombok.Data;
    import lombok.NoArgsConstructor;

    import java.math.BigDecimal;
    import java.time.LocalDateTime;
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

        public static record DadosNotafiscal(

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

        public static record DadosProduto(

                @NotBlank
                String codigo,

                @NotBlank
                String nome,

                @NotNull
                BigDecimal valorUnitario,

                String descricao,

                Long id,

                Boolean ativo
        ) {
            public DadosProduto(Produto p) {
                this(p.getCodigo(), p.getNome(), p.getValorUnitario(), p.getDescricao(), p.getId(), p.getAtivo());
            }
        }
    }
