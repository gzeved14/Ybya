import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { PerfilUsuario } from "../types/perfilUser";
import { OneToMany } from "typeorm";
import { Movimentacao } from "./Movimentacao";

@Entity("usuario")
export class Usuario {
    
    @PrimaryGeneratedColumn("uuid") //faz o banco de dados gerencia automaticamente um id único para cada usuário
    id!: string;

    @Column({ type: 'text', nullable: false })
    nome!: string;

    @Column({ type: 'text', unique: true, nullable: false })
    matricula!: string;

    @Column({ type: 'text', unique: true, nullable: false })
    email!: string;

    @Column({ type: 'text', nullable: false, select: false })
    senha_hash!: string;
    
    @Column({ type: 'text', nullable: false })
    setor!: string;

    @Column({ type: 'enum', enum: PerfilUsuario, nullable: false })
    cargo!: PerfilUsuario;

    @Column({ type: 'timestamptz', default: () => 'NOW()' })
    criado_em!: Date;

    @OneToMany(() => Movimentacao, (movimento) => movimento.registrado_por)
    registros_realizados!: Movimentacao[]; //um usuário  pode realizar milhares de registros no sistema
}