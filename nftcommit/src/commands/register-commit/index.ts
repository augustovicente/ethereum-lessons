import { Command } from '@oclif/core'
import { cli } from 'cli-ux'
import inquirer = require('inquirer')
const fetch = require("node-fetch");
import { api } from '../../api'
import * as fs from 'fs-extra';
import * as path from 'path';

export default class RegisterCommit extends Command {
    static description = 'Registrar um commit como NFT pela NFTCommit'

    static examples = [`$ nftcommit signup`]

    async run(): Promise<void> {
        let user_mail = fs.readJSONSync(path.join(this.config.configDir, 'config.json')).NFTCOMMIT_USER;
        let response = await fetch(api+'list-repos/'+user_mail, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(async (res:any) => {
                if(res.status === 200)
                {
                    let repos = JSON.parse(await res.json());

                    let user_responses: any = await inquirer.prompt([
                        {
                            name: 'names',
                            message: 'Qual o nome do repositório?',
                            type: 'checkbox',
                            choices: repos,
                            validate: (value: string) => {
                                if (value.length) {
                                    return true
                                } else {
                                    return 'Nome inválido'
                                }
                            }
                        }
                    ]);

                    for(const name of user_responses.names)
                    {
                        await cli.open(api+name.replace('.git', '')+'/register-commit');
                    }
                }
                else if(res.status === 500)
                {
                    this.log(`Erro ao listar!`);
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
