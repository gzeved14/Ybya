import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import type { Produto } from './Produto';
import type { Loja } from './Loja';
import { Movimento } from '../types/tipo';

@Entity('movimentacao') 
export class Movimentacao {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @ManyToOne("Loja")
    loja!: Loja;
    
    @ManyToOne("Produto")
    produto!: Produto;

    @Column({ type: 'enum', enum: Movimento, nullable: false })
    tipo!: Movimento;

    @Column({ type: 'varchar', length: 100, nullable: true})
    motivo?: string;

    @Column({ type: 'numeric', nullable: false })
    quantidade!: number;

    @Column({ type: 'timestamptz', default: () => 'NOW()' })
    registrado_em!: Date;
}
