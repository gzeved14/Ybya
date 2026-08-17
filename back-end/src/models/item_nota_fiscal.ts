import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import type { NotaFiscal } from './NotaFiscal';
import type { Produto } from './Produto';

@Entity('item_nota_fiscal')
export class ItemNotaFiscal {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
    
    @ManyToOne("NotaFiscal")
    @JoinColumn({name:"nota_fiscal_id"})
    notaFiscal!: NotaFiscal;

    @ManyToOne("Produto")
    produto!: Produto;

    @Column({ type: 'numeric', nullable: false })
    quantidade!: number;

    @Column({ type: 'numeric', nullable: false })
    valorUnitario!: number;
}