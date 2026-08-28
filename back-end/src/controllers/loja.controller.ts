import { Request, Response, NextFunction } from 'express';
import { LojaService } from '../services/loja.service';
import { AppError } from "../errors/AppError";
import { ajustaTimestampsManaus } from '../utils/timezone';


export default class LojaController {
    constructor(private readonly lojaService: LojaService) {}

    /**
     * @method create
     * /@description Cria um novo registro de loja
     */

    async create(req: Request, res:Response, next: NextFunction): Promise<Response | void> {
        try{
            const loja = await this.lojaService.createLoja(req.body);
            return res.status(201).json({
                status: 'success',
                mensagem: 'Loja criada com sucesso',
                data: ajustaTimestampsManaus(loja)
            });
        } catch (error) {
            next(error);
        }
    }

    async findAll(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const lojas = await this.lojaService.findAll();
            return res.status(200).json(ajustaTimestampsManaus(lojas));
        } catch (error) {
            next(error);
        }
    }


    async findById(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try{
            const { id } = req.params;
            if (!id || typeof id !== 'string') {
                throw new AppError("ID invalido ou ausente", 400);
            }
            const loja = await this.lojaService.findById(id);
            return res.status(200).json(ajustaTimestampsManaus(loja));
        } catch (error) {
            next(error);
        }
    }
    
    async update(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const id = req.params.id as string;
            const updateLoja = await this.lojaService.update(id, req.body);
            return res.status(200).json(ajustaTimestampsManaus(updateLoja));
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { id } = req.params;
            if (!id || typeof id !== 'string') {
                throw new AppError("ID invalido ou ausente", 400);
            }
            await this.lojaService.softDelete(id);
            return res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}