import { DataSource } from 'typeorm';
import { AppError } from '../errors/AppError';
import { Fornecedor } from '../models/Fornecedor';

export class FornecedorService {
    constructor(private readonly dataSource: DataSource) {}

    /**
     * @method findById
     * @description Busca um fornecedor pelo seu ID.
     * @param id - O ID do fornecedor a ser buscado.
     * @returns Promise<Fornecedor> - O fornecedor encontrado.
     * @throws AppError se o fornecedor não for encontrado.
     */
    async findById(id: string, lojaId: string) {
        const fornecedorRepository = this.dataSource.getRepository(Fornecedor);
        const fornecedor = await fornecedorRepository.findOne({
            where: { id, loja: { id: lojaId } },
          });
        if (!fornecedor) {
            throw new AppError('Fornecedor não encontrado', 404);
        }
        return fornecedor;
    }

    /**
     * @method findAll
     * @description Busca todos os fornecedores.
     * @returns Promise<Fornecedor[]> - A lista de fornecedores encontrados.
     */
    async findAll(lojaId: string) {
        const fornecedorRepository = this.dataSource.getRepository(Fornecedor);
        const fornecedores = await fornecedorRepository.find({
            where: { loja:
                 { id: lojaId }
                },
            });
        return fornecedores;
    }

    /**
     * @method createFornecedor
     * @description Cria um novo fornecedor após validar unicidade do CNPJ.
     * @throws AppError se nome/cnpj ausentes ou fornecedor já existente.
     */
    async createFornecedor(dados: Partial<Fornecedor>, lojaId: string): Promise<Fornecedor> {
        const fornecedorRepository = this.dataSource.getRepository(Fornecedor);
        if (!dados.nome || !dados.cnpj ) {
            throw new AppError('Campos obrigatórios ausentes', 400);
        }
        const existingFornecedor = await fornecedorRepository.findOne({
            where: [
                { cnpj: dados.cnpj, loja: { id: lojaId } },
                { email: dados.email, loja: { id: lojaId } },
            ]
        });
        if (existingFornecedor) {
            throw new AppError('Fornecedor já existe', 400);
        }
        const newFornecedor = fornecedorRepository.create({
            ...dados,
            loja: { id: lojaId }
        });
        return await fornecedorRepository.save(newFornecedor);
    }

    /**
     * @method update
     * @description Atualiza os dados de um fornecedor existente.
     * @param id - O ID do fornecedor a ser atualizado.
     * @param dados - Os novos dados do fornecedor.
     * @returns Promise<Fornecedor> - O fornecedor atualizado.
     * @throws AppError se o fornecedor não for encontrado.
     */
    async update(id: string, lojaId: string, dados: Partial<Fornecedor>): Promise<Fornecedor> {
        const fornecedor = await this.findById(id, lojaId);
        Object.assign(fornecedor, dados);
        const repo = this.dataSource.getRepository(Fornecedor);
        return repo.save(fornecedor);
    }

    /**
     * @method softDelete
     * @description Remove logicamente um fornecedor.
     * @param id - O ID do fornecedor a ser removido.
     * @returns Promise<void> - Uma promessa que resolve quando o fornecedor é removido.
     * @throws AppError se o fornecedor não for encontrado.
     */
    async softDelete(id: string, lojaId: string) {
        const fornecedorRepository = this.dataSource.getRepository(Fornecedor);
        const fornecedor = await this.findById(id, lojaId);
        fornecedor.ativo = false;
        return fornecedorRepository.save(fornecedor);
    }
}