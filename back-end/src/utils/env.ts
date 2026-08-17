import dotenv from 'dotenv';

dotenv.config();

function obrigatoria(chave: string): string {
  const valor = process.env[chave];
  if (!valor) {
    throw new Error(`Variável de ambiente obrigatória ausente: ${chave}`);
  }
  return valor;
}

export const env = {
  db: {
    host: obrigatoria('DB_HOST'),
    port: Number(obrigatoria('DB_PORT')),
    username: obrigatoria('DB_USERNAME'),
    password: obrigatoria('DB_PASSWORD'),
    database: obrigatoria('DB_DATABASE'),
  },
  app: {
    port: Number(obrigatoria('PORT')),
  },
} as const;