const express = require('express');
const app = express();
const PORT = 8080;
const fs = require('fs');

app.get('/commits-unregistered',(req,res) => {

    const commits_folder = '../commits-register/';
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

app.get('/commits-unregistered',(req,res) => {

    const commits_folder = '../commits-register/';
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

app.get('/register-commit', (req,res) =>
{
    res.sendFile(__dirname+'/register-commit.html');
})

app.listen(PORT ,()=>console.log(`Connected to ${PORT}`))