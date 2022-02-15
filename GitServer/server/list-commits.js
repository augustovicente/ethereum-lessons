const express = require('express');
const app = express();
const PORT = 8080;
const fs = require('fs');

app.get('/',(req,res) => {

    const commits_folder = '../commits-register/';
    const commits_files = [];

    fs.readdir(commits_folder, (err, files) => {
        files.forEach(file => {
            if(file.endsWith('.json'))
            {
                commits_files.push(JSON.parse(fs.readFileSync(commits_folder+file)));
            }
            res.json(JSON.stringify(commits_files))
        });
    });
    
})

app.listen(PORT ,()=>console.log(`Connected to ${PORT}`))