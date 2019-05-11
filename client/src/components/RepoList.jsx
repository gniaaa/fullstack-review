import React from 'react';
import RepoTable from './RepoTable.jsx'

const RepoList = ({ repos }) => (
  <div>
    <h4> Repo List Component </h4>
    There are {repos.length} repos.
    {repos.length > 0 && <RepoTable repos={repos} />}
  </div>
)

export default RepoList;