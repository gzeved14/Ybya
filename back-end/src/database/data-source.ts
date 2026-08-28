import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { env } from '../utils/env';
import { Loja } from '../models/Loja';
import { Cliente } from '../models/Cliente';
import { Movimentacao } from '../models/Movimentacao';
import { NotaFiscal } from '../models/NotaFiscal';
import { Produto } from '../models/Produto';
import { Fornecedor } from '../models/Fornecedor';
import { ItemNotaFiscal } from '../models/Item_nota_fiscal';
import { SnakeNamingStrategy } from '../database/snake-naming-strategy'

export const AppDataSource = new DataSource({
  namingStrategy: new SnakeNamingStrategy(),
  type: 'postgres',
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
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