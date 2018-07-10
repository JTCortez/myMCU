import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

  //reorders data when dragged
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    //takes out the data that was clicked
    const [removed] = result.splice(startIndex, 1);
    //inste the data and insert it at the indexed where it was dropped
    result.splice(endIndex, 0, removed);

    return result;
  };

  const grid = 8;

  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',

    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    background: isDragging ? 'lightblue' : 'crimson',

    ...draggableStyle,

  })

  const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightgreen' : 'white',
    padding: grid,
  })

class MovieList extends Component {

  constructor(props) {
    super(props);
    console.log(this.props.movies)
    this.state = {
      movies: this.props.movies,
    };
    console.log(this.state.movies);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    const movie = reorder(
      this.state.movies,
      result.source.index,
      result.destination.index
    );

    this.setState({
      movies: movie
    });
  }

  renderList(movie) {
    const title = movie.title;
    const poster = movie.poster;
      //<li key={movie.title} className="list-group-item"> {movie.title} </li>
      return (
        <tr key={title} >

          <td>
            <div>
              {title}
            </div>
          </td>
        </tr>
      );
  }

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {this.state.movies.map((movie, index) => (
                <Draggable key={movie.title} draggableId={movie.title} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      {movie.title}
                      <img src={movie.poster} alt="poser" />

                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

function mapStatetoProps({movies}) {
  return { movies };
}

/*
  <table className="table table-hover">
    <thead>
      <tr>
        <th> Movie </th>
      </tr>
    </thead>
    <tbody >
      {this.props.movies.map(this.renderList)}
    </tbody>
  </table>*/

export default connect (mapStatetoProps)(MovieList);
