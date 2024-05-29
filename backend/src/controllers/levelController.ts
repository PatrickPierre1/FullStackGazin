import { Request, Response } from "express";
import knex from "../database/knex";
import AppError from "../utils/AppError";

type Niveis = {
    id: number;
    nivel: string;
};

export const getNiveis = async (req: Request, res: Response) => {
    const niveis: Niveis = await knex("niveis");

    if (!niveis) {
        throw new AppError("Nenhum nivel cadastrado!");
    }
    res.json({ niveis });
};

export const postNiveis = async (req: Request, res: Response) => {
    const obj: Niveis = req.body;

    if (!obj?.nivel) {
        throw new AppError(
            "Nivel é obrigatório ou o Corpo da requisição está errado!"
        );
    }

    const id_nivel = await knex("niveis").insert(obj);

    res.json({ niveis: obj });
};

export const putNiveis = async (req: Request, res: Response) => {
    const obj = req.body;
    const { id } = req.params;

    let nivel = await knex("niveis").where({ id }).first();

    if (!nivel?.id) {
        throw new AppError("Nivel não encontrado");
    }
    nivel = {
        ...nivel,
        ...obj,
    };
    await knex("niveis").update(nivel).where({ id: nivel.id });

    return res.json({
        nivel: nivel,
    });
};

export const deleteNiveis = async (req: Request, res: Response) => {
    const { id } = req.params;

    let nivel: Niveis = await knex("niveis").where({ id }).first();

    if (!nivel?.id) {
        throw new AppError("Nivel não encontrado");
    }
    const desenvolvedores = await knex("desenvolvedores").where({
        nivel_id: id,
    });

    if (desenvolvedores.length > 0) {
        throw new AppError(
            "Não é possivel deletar pois há um desenvolvedor associado ao nivel"
        );
    }

    await knex("niveis").where({ id }).delete();

    return res.json({ message: "Nivel deletado com sucesso!" });
};
