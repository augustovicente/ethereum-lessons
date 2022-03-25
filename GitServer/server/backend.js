const express = require('express');
const app = express();
const PORT = 8080;
const fs = require('fs');
const path_to_repos = '..';
const { exec } = require("child_process");

app.use(express.json());

// FILES
app.get('/:repo/register-commit', (req,res) =>
{
    res.sendFile(__dirname+'/register-commit.html');
})

app.get('/:repo/repo-info.html', (req,res) =>
{
    res.sendFile(__dirname+'/repo-info.html');
})

app.get('/commit.js', (req,res) =>
{
    res.sendFile(__dirname+'/commit.js');
})

// CONTROLLERS
app.get('/:repo/commit-info/:commit', (req,res) =>
{
    fs.readFile(`${path_to_repos}/${req.params.repo}.git/commits-register/${req.params.commit}.json`, 'utf8' , (err, data) => {
        if (err) {
            console.error(err);
            return
        }
        res.json(JSON.parse(data));
    });
})
app.get('/commit-info/:commit', (req,res) =>
{
    const getDirectories = (source, callback) => {
        return fs.readdir(source, { withFileTypes: true }, (err, files) => {
            if(err)
            {
                callback(err)
            }
            else
            {
                callback(null, files.filter(f => !["server", "users"].includes(f)))
            }
        })
    }
    getDirectories(path_to_repos+'/', (err, repos) => {
        if(err)
        {
            console.log(err);
            res.status(500).send(err);
        }
        else
        {
            for(const repo of repos)
            {
                if(fs.existsSync(`${path_to_repos}/${repo}/commits-register/${req.params.commit}.json`))
                {
                    fs.readFile(`${path_to_repos}/${repo}/commits-register/${req.params.commit}.json`, 'utf8' , (err, data) => {
                        if (err) {
                            console.error(err);
                            return
                        }
                        res.json(JSON.parse(data));
                    });
                    return;
                }
            }
            res.status(404).send("Commit not found");
        }
    })
})
app.get('/:repo/commits-unregistered',(req,res) => {

    const commits_folder = `${path_to_repos}/${req.params.repo}.git/commits-register/`;
    const commits_files = [];

    fs.readdir(commits_folder, (err, files) => {
        if(files && files.length !== 0)
        {
            files.forEach(file => {
                if(file.endsWith('.json'))
                {
                    commits_files.push(JSON.parse(fs.readFileSync(commits_folder+file)));
                }
            });
            res.json(JSON.stringify(commits_files.filter(commit => commit.commit_status === 'unregistered')));
        }
    });
    
})

app.get('/:repo/commits-registered',(req,res) => {

    const commits_folder = `${path_to_repos}/${req.params.repo}.git/commits-register/`;
    const commits_files = [];

    fs.readdir(commits_folder, (err, files) => {
        if(files && files.length !== 0)
        {
            files.forEach(file => {
                if(file.endsWith('.json'))
                {
                    commits_files.push(JSON.parse(fs.readFileSync(commits_folder+file)));
                }
            });
            res.json(JSON.stringify(commits_files.filter(commit => commit.commit_status === 'registered')));
        }
        else
        {
            res.json(JSON.stringify(commits_files));
        }
    });
})

app.get('/:repo/repo-info', (req,res) =>
{
    fs.stat(`${path_to_repos}/${req.params.repo}.git/`, (err, stats) => {
        if(err)
        {
            console.log(err);
            throw err;
        }
    
        res.json(JSON.stringify({
            repo_name: req.params.repo,
            repo_creation_date: stats.birthtime,
        }));
    });
})

app.post('/:repo/register-commits', (req,res) =>
{
    const {commit_ids: commit_data, account} = req.body;
    const commits_folder = `${path_to_repos}/${req.params.repo}.git/commits-register/`;

    for(const commit_id of commit_data)
    {
        const commit_file = commits_folder+commit_id+'.json';
        const commit_json = JSON.parse(fs.readFileSync(commit_file));
        commit_json.commit_status = 'registered';
        commit_json.commit_repo = req.params.repo;
        commit_json.commit_owner = account;
        fs.writeFileSync(commit_file,JSON.stringify(commit_json));
    }
    res.send('Commit(s) registered!');
})

app.post('/signup', (req,res) =>
{
    const {name, email, sshkey} = req.body;

    if(!fs.existsSync(`${path_to_repos}/users/${email}.json`))
    {
        // save data
        fs.writeFileSync(`${path_to_repos}/users/${email}.json`, JSON.stringify({
            name,
            email,
            sshkey,
            repos: []
        }));
    
        // save new ssh in authorized_keys
        fs.appendFileSync(`${path_to_repos}/../keys/id_rsa.pub`, `\n${sshkey}`);
        // atualizando as chaves ssh 
        exec("sh /git-server/start.sh");
    
        res.send('User registered!');
    }
    else
    {
        res.status(500).send('User already registered!');
    }
})

app.post('/create-repo/:user', (req,res) =>
{
    const {name: repo_name} = req.body;

    let commands = [
        'mkdir ../'+repo_name,
        `cd ../${repo_name} && git init --shared=true `,
        `cd ../ && git clone --bare ${repo_name} ${repo_name}.git`,
        `cd ../${repo_name}.git && cp ../server/update ./hooks/`,
    ]
    
    exec(commands[0], (err, stdout, stderr) => {
        if(err)
        {
            res.status(500).send("Nome do repositório não é válido! Por favor, selecione outro.");
        }
        else
        {
            console.log(`Pasta criada com sucesso!`);
            exec(commands[1], (err, stdout, stderr) => {
                if(err)
                {
                    exec("rm -R ../"+repo_name);
                    res.status(500).send("Não foi possível iniciar o repositório. Tente novamente mais tarde.");
                }
                else
                {
                    console.log(`Repositório iniciado com sucesso!`);
                    exec(commands[2], (err, stdout, stderr) => {
                        if(err)
                        {
                            exec("rm -R ../"+repo_name);
                            res.status(500).send("Não foi possível clonar o repositório. Tente novamente mais tarde.");                                            
                        }
                        else
                        {
                            exec(commands[3], (err, stdout, stderr) => {
                                if(err)
                                {
                                    exec("rm -R ../"+repo_name);
                                    res.status(500).send("Não foi possível criar o hook. Tente novamente mais tarde.");                                            
                                }
                                else
                                {
                                    exec("rm -R ../"+repo_name);
                                    console.log(`Hook Criado!`);
                                    // atualizando repos do usuário
                                    let user_data = JSON.parse(fs.readFileSync(`${path_to_repos}/users/${req.params.user}.json`));
                                    user_data.repos.push(repo_name);
                                    fs.writeFileSync(`${path_to_repos}/users/${decodeURI(req.params.user)}.json`, JSON.stringify(user_data));
                                    fs.mkdirSync(`${path_to_repos}/${repo_name}.git/commits-register`);

                                    res.send('Repositório criado com sucesso!');
                                }
                            });
                        }
                    });
                }
            });
        }
    });
})

app.post('/delete-repo/:user', (req,res) =>
{
    const {name: repo_name} = req.body;
    let user_data = JSON.parse(fs.readFileSync(`${path_to_repos}/users/${req.params.user}.json`));

    if(!user_data.repos.includes(repo_name))
    {
        return res.status(500).send({erro: 'Repositório não encontrado!'});
    }
    else
    {
        let commands = [
            'rm -R ../'+repo_name+'.git',
        ]
        
        exec(commands[0], (err, stdout, stderr) => {
            if(err)
            {
                res.status(500).send("Nome do repositório não é válido! Por favor, selecione outro.");
            }
            else
            {
                console.log(`Repositório removido com sucesso!`);
                res.send('Repositório removido com sucesso!');
            }
        });
    }
})

app.get('/list-repos/:user', (req,res) =>
{
    // returning only user repos
    let user_data = JSON.parse(fs.readFileSync(`${path_to_repos}/users/${req.params.user}.json`));
    res.json(JSON.stringify(user_data.repos.map(repo => (repo+".git") )));

    // in the past used to list all repos
    // const getDirectories = (source, callback) => {
    //     return fs.readdir(source, { withFileTypes: true }, (err, files) => {
    //         if(err)
    //         {
    //             callback(err)
    //         }
    //         else
    //         {
    //             callback(null, files.filter(f => !["server", "users"].includes(f)))
    //         }
    //     })
    // }
    // getDirectories(path_to_repos+'/', (err, files) => {
    //     if(err)
    //     {
    //         console.log(err);
    //         res.status(500).send(err);
    //     }
    //     else
    //     {
    //         res.json(JSON.stringify(files));
    //     }
    // })
})

app.listen(PORT ,()=>console.log(`Connected to ${PORT}`))