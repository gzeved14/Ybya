import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
} from 'typeorm';
import { Fornecedor } from './Fornecedor';
import { Produto } from './Produto';
import { Cliente } from './Cliente';
import { NotaFiscal } from './NotaFiscal';

@Entity('loja')
export class Loja {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'varchar', length: 150, nullable: false})
    nome!: string;

    @Column({ type: 'varchar', length: 18, unique: true, nullable: false })
    cnpj!: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    telefone?: string;

    @Column({ type: 'varchar', length: 254, unique: true, nullable: false })
    email!: string;

    @Column({ type: 'boolean', default: true})
    ativo!: boolean;

    @Column({ type: 'timestamptz', default: () => 'NOW()' })
    criado_em!: Date;
    @Column({ name: 'subdominio', type: 'varchar', length: 63, unique: true, nullable: false })
    subdominio!: string;

    @OneToMany(() => Fornecedor, (fornecedor) => fornecedor.loja)
    fornecedor!: Fornecedor[];

    @OneToMany(() => Produto, (produto) => produto.loja)
    produtos!: Produto[];

    @OneToMany(() => Cliente, (cliente) => cliente.loja)
    cliente!: Cliente[];

    @OneToMany(() => NotaFiscal, (notaFiscal) => notaFiscal.loja)
    notaFiscal!: NotaFiscal[];
}