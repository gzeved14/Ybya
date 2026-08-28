import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    ManyToOne,
    JoinColumn, 
    Unique
} from 'typeorm';
import type { Fornecedor } from './Fornecedor';
import type { Loja } from './Loja'; 
import { Movimentacao } from './Movimentacao';

@Entity('produto')
@Unique(['loja', 'codigo'])
export class Produto {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column ({ type: 'varchar', length: 50, nullable: false })
    codigo!: string;

    @Column ({ type: 'varchar', length: 150, nullable: false })
    nome!: string;

    @Column ({ type: 'text', nullable: true })
    descricao?: string;

    @Column ({ type: 'varchar', length: 10, nullable: false })
    unidade_medida!: string;

    @Column ({ type: 'numeric', nullable: false })
    preco_venda!: number;

    @Column ({ type: 'boolean', default: true })
    ativo!: boolean;

    @Column({ type: 'numeric', default: 0 })
    estoque_atual!: number;

    @ManyToOne("Fornecedor", { nullable: true })
    @JoinColumn({ name: 'fornecedor_id' })
    fornecedor?: Fornecedor;

    @UpdateDateColumn({ name: 'atualizado_em' })
    atualizadoEm!: Date;

    @ManyToOne("Loja")
    @JoinColumn({ name: 'loja_id' })
    loja!: Loja;

    @OneToMany(() => Movimentacao, movimentacao => movimentacao.produto)
    movimentacao!: Movimentacao[];

    @Column({ type: 'timestamptz', default: () => 'NOW()' })
    criado_em!: Date;
}