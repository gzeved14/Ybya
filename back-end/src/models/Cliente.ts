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
import { NotaFiscal } from './NotaFiscal';
import { TipoDoc } from '../types/docID';

@Entity('cliente')
@Unique(['loja', 'doc'])
export class Cliente {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @ManyToOne("Loja")
    @JoinColumn({ name: 'loja_id' })
    loja!: Loja;

    @Column({ type: 'varchar', length: 150, nullable: false })
    nome!: string;

    @Column({ type: 'enum', enum: TipoDoc, nullable: true })
    tipoDoc!: TipoDoc;

    @Column({ type: 'varchar', length: 18, nullable: true })
    doc?: string;

    @Column({ type: 'varchar', length: 254, nullable: true })
    email?: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    telefone?: string;

    @Column({ type: 'timestamptz', default: () => 'NOW()' })
    criado_em!: Date;

    @OneToMany(() => NotaFiscal, notaFiscal => notaFiscal.cliente )
    notaFiscal!: NotaFiscal[];

}