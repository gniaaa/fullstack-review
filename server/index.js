const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const getReposByUsername = require('../helpers/github.js');
const db = require('../database/index.js');

let app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  let username = req.body.username;

  getReposByUsername(username, (error, response, body) => {
    if (error) {
      res.sendStatus(400).send('Failed to get repos');
      return;
    }

    let info = JSON.parse(body);
    let selectedInfo = info.map((repo) => {
      let headers = ['name', 'html_url', 'description', 'forks_count', 'stargazers_count'];
      let filteredRepo = {
        username,
        repo_id: repo['id'],
      };
      for (let header of headers) {
        filteredRepo[header] = repo[header];
      }
      return filteredRepo;
    })

    db.save(selectedInfo, (err) => {
      if (err) {
        res.sendStatus(500).send('Failed to write to database');
        return;
      }
      res.sendStatus(201);
    });
  })
});

app.get('/repos', function (req, res) {
  db.getRepos((err, data) => {
    if (err) {
      res.sendStatus(404).send('Failed to get latest repos');
      return;
    } else {
      res.json(data);
    }
  })
});

let port = 1128;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});

