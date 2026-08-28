import { Request, Response, NextFunction } from 'express';
import { Fornecedor } from  '../models/Fornecedor';
import { FornecedorService } from '../services/fornecedor.service';
import { AppError } from "../errors/AppError";
import { ajustaTimestampsManaus } from '../utils/timezone';


export class FornecedorController {
    constructor (private readonly fornecedorService: FornecedorService) {}

     //TEMPORARIO: lojaId vem de req.body/params ate o resolveTenantId ser implementado
    //Depois vira: const lojaId = req.lojaId
    private extrairLojaId(req: Request): string {
        const lojaId = (req.auth?.lojaId || req.headers['x-loja-id']) as string;
        if (!lojaId) throw new AppError('lojaId é obrigatório (temporário, envie via header x-loja-id)', 400);
        return lojaId;
    }
    /**
     * @method create
     * @description Cria um novo fornecedor.
     * @param req - Objeto de requisição do Express.
     * @param res - Objeto de resposta do Express.
     * @param next - Função de próxima etapa do Express.
     */
    async create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try{
            const lojaId = this.extrairLojaId(req);
            const fornecedor = await this.fornecedorService.createFornecedor(req.body, lojaId);
            return res.status(201).json({
                status: 'success',
                mensagem: 'Fornecedor criado com sucesso',
                data: ajustaTimestampsManaus(fornecedor)
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * @method findAll
     * @description Busca todos os fornecedores.
     * @param req - Objeto de requisição do Express.
     * @param res - Objeto de resposta do Express.
     * @param next - Função de próxima etapa do Express.
     */
    async findAll(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const lojaId = this.extrairLojaId(req);
            const fornecedores = await this.fornecedorService.findAll(lojaId);
            return res.status(200).json({
                status: 'success',
                data: fornecedores.map(ajustaTimestampsManaus)
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * @method findById
     * @description Busca um fornecedor pelo seu ID.
     * @param req - Objeto de requisição do Express.
     * @param res - Objeto de resposta do Express.
     * @param next - Função de próxima etapa do Express.
     */
    async findById(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { id } = req.params;
            if (!id || typeof id !== 'string') {
                throw new AppError('ID inválido ou ausente', 400);
            }
            const lojaId = this.extrairLojaId(req);
            const fornecedor = await this.fornecedorService.findById(id, lojaId);
           return res.status(200).json(ajustaTimestampsManaus(fornecedor));
        } catch (error) {
            next(error);
        }
    }

    /**
     * @method update
     * @description Atualiza um fornecedor existente.
     * @param req - Objeto de requisição do Express.
     * @param res - Objeto de resposta do Express.
     * @param next - Função de próxima etapa do Express.
     */
    async update(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try{
            const id = req.params.id as string;
            const lojaId = this.extrairLojaId(req);
            if(!lojaId || typeof lojaId !== 'string') {
                throw new AppError('Loja não identificada', 401);
            }
            const updateFornecedor = await this.fornecedorService.update(id, lojaId, req.body);
            return res.status(200).json({
                status: 'success',
                mensagem: 'Fornecedor atualizado com sucesso',
                data: ajustaTimestampsManaus(updateFornecedor)
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * @method delete
     * @description Remove um fornecedor existente.
     * @param req - Objeto de requisição do Express.
     */
    async softDelete(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { id } = req.params;
            const lojaId = this.extrairLojaId(req);
            if(!lojaId || typeof lojaId !== 'string') {
                throw new AppError('Loja não identificada', 401);
            }
            await this.fornecedorService.softDelete(id as string, lojaId);
            return res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}