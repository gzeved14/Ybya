import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
    Unique,
    UpdateDateColumn
} from 'typeorm';
import type { Loja } from './Loja';
import { Produto } from './Produto';

@Entity('fornecedor')
@Unique(['loja', 'cnpj'])
@Unique(['loja', 'email'])
export class Fornecedor {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    nome!: string;

    @Column({ type: 'varchar', length: 18, nullable: false })
    cnpj!: string;
    
    @Column({ type: 'varchar', length: 20, nullable: true })
    telefone?: string;

    @Column({ type: 'varchar', length: 254, nullable: true })
    email?: string;
   
    @Column({ type: 'timestamptz', default: () => 'NOW()' })
    criado_em!: Date;

    @UpdateDateColumn({ name: 'atualizado_em' })
    atualizadoEm!: Date;

    @ManyToOne("Loja")
    @JoinColumn({ name: 'loja_id' })
    loja!: Loja;

    @OneToMany (() => Produto, produto => produto.fornecedor)
    produtos!: Produto[];

}