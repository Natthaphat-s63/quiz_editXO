import Square from "./Square";
import React from "react";

class Board extends React.Component {

  constructor(props){
    super(props)
   this.genBoard  = this.genBoard.bind(this)
  }
                    
  renderSquare(i) {
    let id = i
    return (
      <Square
        key = {id}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  genBoard(){
    let row_content=[]
    let full_board=[]
    let count = 0;
    for(let row = 0;row<this.props.n;row++){
      row_content.push([])
      for(let col =0;col<this.props.n;col++){
        row_content[row].push(this.renderSquare(count))
        count++;
      }
    }
    // console.log(r)
    for(let i = 0;i<this.props.n;i++){
      full_board.push(<div className="board-row">{
        row_content[i]
      }</div>)
    }
    return(full_board)
  }

 
  render() {
      
     let board = this.genBoard();
      return (
        <div>
      
          {board}
        
        </div>
      );
  }
}

export default Board;