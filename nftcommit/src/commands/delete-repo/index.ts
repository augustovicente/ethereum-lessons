import { Command, Flags, } from '@oclif/core'
import * as inquirer from 'inquirer'
import * as fs from 'fs';
const fetch = require("node-fetch");
const { exec, spawn } = require("child_process");

export default class DeleteRepo extends Command {
    static description = 'Deletar Repositório Existente'

    static examples = [`$ nftcommit signup`]

    async run(): Promise<void> {
        let user_responses: any = await inquirer.prompt([
            {
                name: 'name',
                message: 'Qual o nome do repositório?',
                type: 'input',
                validate: (value: string) => {
                    if (value.length) {
                        return true
                    } else {
                        return 'Nome inválido'
                    }
                }
            },
            {
                name: 'confirm',
                message: 'Você tem certeza que deseja deletar o repositório?',
                type: 'confirm',
                default: false
            }
        ])
        
        if(user_responses.confirm)
        {
            this.log(`Deletando...`);
            let response = await fetch('http://localhost:8080/delete-repo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: user_responses.name
                }),
            })
                .then((res:any) => {
                    if(res.status === 200)
                    {
                        this.log(`Repositório deletado com sucesso! Caso deseje remover localmente, execute o comando: rm -R ${user_responses.name}`);
                    }
                    else if(res.status === 500)
                    {
                        this.log(`Erro ao deletar!`);
                        res.json().then((json:any) => {
                            this.log(json);
                        })  
                    }
                })
                .catch((err:any) => {
                    this.error(err)
                });
        }
    }
}
