const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/fetcher');
mongoose.connect('mongodb://heroku_b0p7w1dz:68ukfe2rathqmo2r6himb2e5up@ds155516.mlab.com:55516/heroku_b0p7w1dz')

let repoSchema = mongoose.Schema({
  repo_id: Number,
  username: String,
  name: String,
  html_url: String,
  description: String,
  forks_count: Number,
  stargazers_count: Number,
  createdAt: Date
});

repoSchema.index({ repo_id: 1 });

let Repo = mongoose.model('Repo', repoSchema);

let save = (data, callback) => {
  let count = 0;
  let errors = [];

  data.forEach(repo => {
    Repo.findOneAndUpdate({ repo_id: repo['repo_id'] }, repo, { upsert: true }, (err) => {
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
  Repo.find({}).sort({ createdAt: -1 }).limit(25).exec(callback);
};

module.exports = {
  save,
  getRepos
}