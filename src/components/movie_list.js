import React, { Component } from 'react';
import { connect } from 'react-redux';

class MovieList extends Component {

  renderList(movie) {
    const title = movie.title;
    const poster = movie.poster;
      //<li key={movie.title} className="list-group-item"> {movie.title} </li>
      return (
        <tr key={title} >
          <td>
          <div>
          {title}
          <img src='/gotg.jpg' alt="moviebanner" />
          </div>
          </td>
        </tr>
      );
  }

  render() {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th> Movie </th>
          </tr>
        </thead>
        <tbody >
          {this.props.movies.map(this.renderList)}
        </tbody>
      </table>
    )
  }
}

function mapStatetoProps({movies}) {
  return { movies };
}

export default connect (mapStatetoProps)(MovieList);
