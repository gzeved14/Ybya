import {  DataSource } from 'typeorm';
import { AppError } from '../errors/AppError';
import { Loja } from '../models/Loja';

export class LojaService {
    constructor(private readonly dataSource: DataSource) {}

    /**
     * @method findById
     * @description Busca uma loja pelo seu ID (RF24).
     * @param id - O ID da loja a ser buscada.
     * @returns Promise<Loja> - A loja encontrada.
     * @throws AppError se a loja não for encontrada.
     */
    async findById(id: string){
        const lojaRepository = this.dataSource.getRepository(Loja);
        const loja = await lojaRepository.findOneBy({ id });
        if (!loja) {
            throw new AppError('Loja não encontrada', 404);
        }
        return loja;
    } 

    /**
     * @method findAll
     * @description Busca todas as lojas.
     * @returns Promise<Loja[]> - A lista de lojas encontradas.
     * @throws AppError se nenhuma loja for encontrada.
     */
    async findAll() {
        const lojaRepository = this.dataSource.getRepository(Loja);
        const lojas = await lojaRepository.find();
        return lojas;
    }

     /**
     * @method createLoja
     * @description Cria uma nova loja após validar unicidade do CNPJ e subdomínio.
     * @throws AppError se nome/cnpj/subdomínio ausentes ou loja já existente.
     */
    async createLoja(lojaData: Partial<Loja>): Promise<Loja> {
        const lojaRepository = this.dataSource.getRepository(Loja);
        if (!lojaData.nome || !lojaData.cnpj|| !lojaData.subdominio) {
            throw new AppError('Campos obrigatórios ausentes', 400);
        }

        const existingLoja = await lojaRepository.findOne({
            where: [
                { cnpj: lojaData.cnpj },
                { subdominio: lojaData.subdominio }
            ]
        });
        if (existingLoja) {
            throw new AppError('Não foi possivel criar a loja: Loja já existe', 400);
        }

        const newLoja = lojaRepository.create({
            ...lojaData,
            ativo: true
        })
        return await lojaRepository.save(newLoja);
    }

    async update(id: string, dados: Partial<Loja>){
        const lojaRepository = this.dataSource.getRepository(Loja);
        const loja = await this.findById(id);

        Object.assign(loja, dados);

        const lojaResult = await lojaRepository.save(loja);
        return lojaResult;
    }

    async softDelete(id: string){
        const lojaRepository = this.dataSource.getRepository(Loja);
        const loja = await this.findById(id);
        loja.ativo = false;
        const deleteResult = await lojaRepository.save(loja);
        return deleteResult;
    }

}