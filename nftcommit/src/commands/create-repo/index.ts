import { Command, Flags, } from '@oclif/core'
import * as inquirer from 'inquirer'
import * as fs from 'fs';
const fetch = require("node-fetch");
const { exec, spawn } = require("child_process");

export default class CreateRepo extends Command {
    static description = 'Criar Repositório NFTCommit'

    static examples = [`$ nftcommit signup`]

    async run(): Promise<void> {
        this.log('Vamos criar o MELHOR repositório!')

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
        ])

        let response = await fetch('http://localhost:8080/create-repo', {
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
                    this.log(`Repositório criado com sucesso!`);
                    spawn('git', [
                        'clone',
                        `ssh://git@localhost:2222/git-server/repos/${user_responses.name}.git`
                    ])
                }
                else if(res.status === 500)
                {
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
