"use client";
import { useEffect, useState } from "react";
import { format } from "date-fns";

export const Devs = () => {
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
  const [devs, setDevs] = useState<Desenvolvedores[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/desenvolvedores")
      .then((res) => res.json())
      .then((json) => {
        setDevs(json.desenvolvedores);
      });
  }, []);

  return (
    <div className="flex justify-center">
      <table className="table-fixes border-separate border-spacing-5 border border-slate-500 rounded">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Idade</th>
            <th>Sexo</th>
            <th>Data de Nascimento</th>
            <th>Hobby</th>
            <th>Nivel</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          {devs.map((item) => (
            <tr key={item.id}>
              <td className="text-center">{item.id}</td>
              <td className="text-center">{item.nome}</td>
              <td className="text-center">{item.idade}</td>
              <td className="text-center">{item.sexo}</td>
              <td className="text-center">{format(new Date(item.data_nascimento), "dd/MM/yyyy")}</td>
              <td className="text-center">{item.hobby}</td>
              <td className="text-center">{item.nivel_id}</td>
              <td className="flex row">
                <svg
                  className="fill-white"
                  width="30"
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                  stroke-linejoin="round"
                  stroke-miterlimit="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m11.25 6c.398 0 .75.352.75.75 0 .414-.336.75-.75.75-1.505 0-7.75 0-7.75 0v12h17v-8.75c0-.414.336-.75.75-.75s.75.336.75.75v9.25c0 .621-.522 1-1 1h-18c-.48 0-1-.379-1-1v-13c0-.481.38-1 1-1zm-2.011 6.526c-1.045 3.003-1.238 3.45-1.238 3.84 0 .441.385.626.627.626.272 0 1.108-.301 3.829-1.249zm.888-.889 3.22 3.22 8.408-8.4c.163-.163.245-.377.245-.592 0-.213-.082-.427-.245-.591-.58-.578-1.458-1.457-2.039-2.036-.163-.163-.377-.245-.591-.245-.213 0-.428.082-.592.245z"
                    fill-rule="nonzero"
                  />
                </svg>
                <svg
                  className="fill-white"
                  width="30"
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                  stroke-linejoin="round"
                  stroke-miterlimit="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v15.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z"
                    fill-rule="nonzero"
                  />
                </svg>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
