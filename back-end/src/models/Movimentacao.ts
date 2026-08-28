import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import type { Produto } from './Produto';
import type { Loja } from './Loja';
import { Movimento } from '../types/tipo';
import { Usuario } from './Usuario';
@Entity('movimentacao') 
export class Movimentacao {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @ManyToOne("Loja")
    @JoinColumn({ name: 'loja_id' })
    loja!: Loja;

    @ManyToOne("Usuario")
    @JoinColumn({ name: 'usuario_id' })
    usuario!: Usuario;

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

    @ManyToOne("Usuario")
    @JoinColumn({ name: 'registrado_por_id' })
    registrado_por!: Usuario;
}
