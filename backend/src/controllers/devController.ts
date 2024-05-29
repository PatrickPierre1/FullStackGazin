import { Request, Response } from "express";
import knex from "../database/knex";
import AppError from "../utils/AppError";

type CharString = "M" | "F";
type Desenvolvedores = {
    nivel_id: number;
    nome: string;
    sexo: CharString;
    data_nascimento: Date;
    idade: number;
    hobby: string;
};


export const getDev = async (req: Request, res: Response) => {
    const desenvolvedores: Desenvolvedores = await knex("desenvolvedores");

    if (!desenvolvedores) {
        throw new AppError("Nenhum desenvolvedor cadastrado!");
    }
    res.json({ desenvolvedores });
};

export const postDev = async (req: Request, res: Response) => {
    const obj: Desenvolvedores = req.body;

    if (!obj?.nome) {
        throw new AppError("Nome é obrigatório");
    }
    if (!obj?.nivel_id) {
        throw new AppError("Nivel é obrigatório");
    }
    if (!obj?.sexo) {
        throw new AppError("Sexo é obrigatório");
    }
    if (!obj?.data_nascimento) {
        throw new AppError("Data de nascimento é obrigatório");
    }
    if (!obj?.hobby) {
        throw new AppError("Hobby é obrigatório");
    }
    // Guardando a data original para poder inserir no banco depois do modo correto
    const dataNascimentoOriginal = obj.data_nascimento;

    const dataNascimento = new Date(obj.data_nascimento);

    const dataAtual = new Date();
    const diferenca = dataAtual.getTime() - dataNascimento.getTime();
    const idade = Math.floor(diferenca / (1000 * 60 * 60 * 24 * 365.25));
    obj.idade = idade;

    // Inserindo novamente no objeto data nascimento a data original
    obj.data_nascimento = dataNascimentoOriginal;

    // Verificando se existe algum nivel cadastrado
    const niveis = await knex("niveis");
    if (niveis.length === 0) {
        throw new AppError("Nenhum nivel cadastrado!");
    }

    // Verificando se existe o nivel enviado pelo usuario
    const nivelExistente = await knex("niveis")
        .where({ id: obj.nivel_id })
        .first();
    if (!nivelExistente) {
        throw new AppError("Nivel fornecido não é válido.");
    }

    const id_desenvolvedor = await knex("desenvolvedores").insert(obj);

    res.json({
        desenvolvedores: obj,
    });
};

export const putDev = async (req: Request, res: Response) => {
    const obj: Desenvolvedores = req.body;
    const { id } = req.params;

    let desenvolvedor = await knex("desenvolvedores").where({ id }).first();

    if (!desenvolvedor?.id) {
        throw new AppError("Usuario não encontrado");
    }

    //concatena o objeto
    desenvolvedor = {
        ...desenvolvedor,
        ...obj,
    };
    await knex("desenvolvedores")
        .update(desenvolvedor)
        .where({ id: desenvolvedor.id });

    return res.json({
        message: "Editado usuario com sucesso!",
        desenvolvedor: desenvolvedor,
    });
};

export const deleteDev = async (req: Request, res: Response) => {
    const { id } = req.params;

    let desenvolvedores = await knex("desenvolvedores").where({ id }).first();

    if (!desenvolvedores?.id) {
        throw new AppError("Desenvolvedor não encontrado");
    }

    await knex("desenvolvedores").where({ id }).delete();

    return res.json({
        message: "Desenvolvedor deletado com sucesso!",
    });
};
