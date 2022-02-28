const express = require('express');
const app = express();
const PORT = 8080;
const fs = require('fs');
const path_to_repos = '..';

app.use(express.json());

app.get('/:repo/commits-unregistered',(req,res) => {

    const commits_folder = `${path_to_repos}/${req.params.repo}.git/commits-register/`;
    const commits_files = [];

    fs.readdir(commits_folder, (err, files) => {
        files.forEach(file => {
            if(file.endsWith('.json'))
            {
                commits_files.push(JSON.parse(fs.readFileSync(commits_folder+file)));
            }
        });
        res.json(JSON.stringify(commits_files.filter(commit => commit.commit_status === 'unregistered')));
    });
    
})

app.get('/:repo/commits-unregistered',(req,res) => {

    const commits_folder = `${path_to_repos}/${req.params.repo}.git/commits-register/`;
    const commits_files = [];

    fs.readdir(commits_folder, (err, files) => {
        files.forEach(file => {
            if(file.endsWith('.json'))
            {
                commits_files.push(JSON.parse(fs.readFileSync(commits_folder+file)));
            }
        });
        res.json(JSON.stringify(commits_files.filter(commit => commit.commit_status === 'registered')));
    });
})

app.get('/:repo/register-commit', (req,res) =>
{
    res.sendFile(__dirname+'/register-commit.html');
})

app.post('/:repo/register-commits', (req,res) =>
{
    const commit_data = req.body;
    const commits_folder = `${path_to_repos}/${req.params.repo}.git/commits-register/`;

    for(const commit_id of commit_data)
    {
        const commit_file = commits_folder+commit_id+'.json';
        const commit_json = JSON.parse(fs.readFileSync(commit_file));
        commit_json.commit_status = 'registered';
        fs.writeFileSync(commit_file,JSON.stringify(commit_json));
    }
    res.send('Commit(s) registered!');
})

app.get('/commit.js', (req,res) =>
{
    res.sendFile(__dirname+'/commit.js');
})

app.listen(PORT ,()=>console.log(`Connected to ${PORT}`))