import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    OneToMany,
    Unique
} from 'typeorm';
import type { Loja } from './Loja';
import type { Cliente } from './Cliente';
import { StatusNota } from '../types/statusNotas';
import { FormaPagamento } from '../types/formaPagemento';
import { ItemNotaFiscal } from './item_nota_fiscal';

@Entity('nota_fiscal')
@Unique(['loja', 'numero'])
export class NotaFiscal {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @OneToMany("ItemNotaFiscal", "notaFiscal")
    itemNotaFiscal!: ItemNotaFiscal[];

    @ManyToOne("Loja")
    @JoinColumn({ name: 'loja_id' })
    loja!: Loja;

    @ManyToOne("Cliente")
    @JoinColumn({ name: 'cliente_id' })
    cliente!: Cliente;

    @Column({ type: 'varchar', length: 20, nullable: false })
    numero!: string;

    @Column({ type: 'varchar', length: 50, nullable: false })
    naturezaOperacao!: string;

    @Column({ type: 'enum', enum: FormaPagamento, nullable: false })
    formaPagamento!: FormaPagamento;

    @Column({ type: 'enum', enum: StatusNota, nullable: false })
    status!: StatusNota;

    @Column({ type: 'numeric', nullable: false })
    valorTotal!: number;

    @Column({ type: 'boolean', default: true })
    consumidor_final!: boolean;

    @Column({ type: 'timestamptz', default: () => 'NOW()' })
    emitida_em!: Date;
}