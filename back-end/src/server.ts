import 'reflect-metadata'; 
import  express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './utils/env';
import rateLimit from 'express-rate-limit';
import routes from './routes'; 
import { errorHandler } from './errors/errosHandler'; 
import { AppDataSource } from './database/data-source'; 

//instancia o express
const app = express();
//nginx repassa o ip real do usuario ao Node
app.set('trust proxy', 1); 

//logs de requisição
app.use(( req, res, next) => {
    console.log(`[DEBUG] Recebido: ${req.method} ${req.path} com body:`, JSON.stringify(req.body));
    next();
});

//segurança e CORS
app.use(helmet());
app.use(cors({
    origin: env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-type', 'Authorization'],
    credentials: true
}));

app.use(express.json());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Muitas requisições vindas do mesmo IP, por favor tente novamente mais tarde.'
})
app.use('/api/auth/login', limiter);
//app.use('/api/auth/recuperarSenha', limiter);

//toda arquitetura passa por aqui 
app.use('/api', routes);

//tratamento de erros capturados do controller
app.use(errorHandler);

const appPort = env.PORT;

AppDataSource.initialize()
  .then(() => {
    console.log("[BANCO] Conexão com PostgreSQL via TypeORM estabelecida!");
    app.listen(Number(appPort), "0.0.0.0", () => {
        console.log(`[SERVIDOR] Servidor rodando na porta ${appPort}`);
    });
  })
  .catch((error) => {
    console.error("[BANCO] Erro ao conectar com o banco de dados:", error);
    process.exit(1);
  });