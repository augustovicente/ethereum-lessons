import { Command, Flags, } from '@oclif/core'
import * as inquirer from 'inquirer'
import * as fs from 'fs';
const fetch = require("node-fetch");

export default class Signup extends Command {
    static description = 'Inscrever-se no sistema'

    static examples = [`$ nftcommit signup`]

    async run(): Promise<void> {
        this.log('Bem-vindo ao nftcommit!')

        let user_responses: any = await inquirer.prompt([
            {
                name: 'name',
                message: 'Qual seu nome?',
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
                name: 'email',
                message: 'Qual seu email?',
                type: 'input',
                validate: (value: string) => {
                    if (value.length) {
                        return true
                    } else {
                        return 'Email inválido'
                    }
                }
            },
            {
                name: 'sshkeypath',
                message: 'Qual o caminho da sua chave ssh? (Default: ~/.ssh/id_rsa.pub)',
                type: 'input',
            },
        ])

        // recebendo dados da chave ssh
        let sshkeypath = user_responses.sshkeypath
        if(!sshkeypath)
        {
            sshkeypath = `${process.env.HOME}/.ssh/id_rsa.pub`
        }

        // verificando se a chave existe
        if(!fs.existsSync(sshkeypath))
        {
            this.error(`Chave ssh não encontrada: ${sshkeypath}`)
        }

        // lendo a chave
        let sshkey = fs.readFileSync(sshkeypath).toString()
        
        // enviando dados para o servidor
        let response = await fetch('http://localhost:8080/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: user_responses.name,
                email: user_responses.email,
                sshkey: sshkey,
            }),
        })
            .then((res:any) => {
                this.log(`Usuário criado com sucesso!`)
            })
            .catch((err:any) => {
                this.error(err)
            });
    }
}
