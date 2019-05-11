import React from 'react';

class RepoTable extends React.Component {
  constructor(props) {
    super(props);

    this.headers = ['index', 'username', 'name', 'forks', 'stars'];
    this.renderHeaders = this.renderHeaders.bind(this);
  }

  renderHeaders() {
    let headerRow = [];
    this.headers.forEach((header, col) => {
      headerRow.push(<th key={col} className={`table-col-${col}`}>{header}</th>);
    })
    return headerRow;
  }

  renderRow(repo, index) {
    let row = [];
    let data = [index + 1, repo['username'], repo['name'], repo['forks_count'], repo['stargazers_count']];
    data.forEach((cell, col) => {
      row.push(<td key={col} className={`table-col-${col}`}>{cell}</td>);
    })
    return row;
  }

  render() {

    return (
      <table className="repo-table">
        <thead className="headers">
          <tr>{this.renderHeaders()}</tr>
        </thead>
        <tbody>
          {this.props.repos.map((repo, index) => {
            return <tr key={index}>{this.renderRow(repo, index)}</tr>
          })}
        </tbody>

      </table>
    );
  }
}


export default RepoTable;