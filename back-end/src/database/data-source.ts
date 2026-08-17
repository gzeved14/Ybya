import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { env } from '../utils/env';
import { Loja } from '../models/Loja';
import { Cliente } from '../models/Cliente';
import { Movimentacao } from '../models/Movimentacao';
import { NotaFiscal } from '../models/NotaFiscal';
import { Produto } from '../models/Produto';
import { Fornecedor } from '../models/Fornecedor';
import { ItemNotaFiscal } from '../models/item_nota_fiscal';
import { SnakeNamingStrategy } from '../database/snake-naming-strategy'

export const AppDataSource = new DataSource({
  namingStrategy: new SnakeNamingStrategy(),
  type: 'postgres',
  host: env.db.host,
  port: env.db.port,
  username: env.db.username,
  password: env.db.password,
  database: env.db.database,
  synchronize: false,
  logging: true,
  entities: [
    Loja,
    Cliente,
    Fornecedor,
    ItemNotaFiscal,
    Movimentacao,
    NotaFiscal,
    Produto
  ],
  migrations: ['src/database/migrations/*.ts'],
});