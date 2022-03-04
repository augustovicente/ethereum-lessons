import { Command, Flags, } from '@oclif/core'
import * as inquirer from 'inquirer'
import * as fs from 'fs';
const fetch = require("node-fetch");
const { exec, spawn } = require("child_process");

export default class ListRepos extends Command {
    static description = 'Listar Repositórios Existentes'

    static examples = [`$ nftcommit signup`]

    async run(): Promise<void> {
        let response = await fetch('http://localhost:8080/list-repos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(async (res:any) => {
                if(res.status === 200)
                {
                    this.log(await res.json());
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
