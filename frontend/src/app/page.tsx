"use client";
import { useEffect, useState } from "react";

export default function App() {
  type CharString = "M" | "F";
  type Desenvolvedores = {
    id: number;
    nivel_id: number;
    nome: string;
    sexo: CharString;
    data_nascimento: Date;
    idade: number;
    hobby: string;
  };
  const [users, setUsers] = useState<Desenvolvedores[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/desenvolvedores")
      .then((res) => res.json())
      .then((json) => {
        setUsers(json.desenvolvedores);
      });
  }, []);

  return (
    <div>
      <h1>Lista de usuarios</h1>
      {users.length <= 0 && "Carregando..."}
      {users.length > 0 && (
        <ul>
          {users.map((item) => (
            <li key={item.id}>{
              "Nome: " + item.nome +
              "Nivel id: " + item.nivel_id + 
              "Idade: " + item.idade +
              "Sexo: " + item.sexo +
              "Data de Nascimento: " + item.data_nascimento +
              "Hobby: " + item.hobby}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
