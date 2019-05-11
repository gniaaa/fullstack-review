const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  repo_id: Number,
  username: String,
  name: String,
  html_url: String,
  description: String,
  forks_count: Number,
  stargazers_count: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (data, callback) => {
  let count = 0;
  let errors = [];

  data.forEach(repo => {
    Repo.updateOne({ repo_id: repo['repo_id'] }, repo, { upsert: true }, (err) => {
      if (err) { errors.push(err); }
      count++;

      if (count === data.length) {
        if (errors[0]) {
          callback(errors[0]);
        } else {
          callback(null);
        }
      }

    });
  })
}

let getRepos = (callback) => {
  Repo.find({}).limit(25).sort({ createdAt: -1 }).exec(callback);
};

module.exports = {
  save,
  getRepos
}