import Square from "./Square";
import React from "react";

class Board extends React.Component {

  constructor(props){
    super(props)
   this.submitDim  = this.submitDim.bind(this)
   this.changeN  = this.changeN.bind(this)
   this.gen_board  = this.gen_board.bind(this)
   this.state={showBoard:false,n:3,noc:3}
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

  gen_board(){
    let r=[]
    let B=[]
    let count = 0;
    for(let row = 0;row<this.props.n;row++){
      r.push([])
      for(let col =0;col<this.props.n;col++){
        r[row].push(this.renderSquare(count))
        count++;
      }
    }
    console.log(r)
    for(let i = 0;i<this.props.n;i++){
      B.push(<div className="board-row">{
        r[i]
      }</div>)
    }
    return(B)
  }

 
  render() {
      
     let V = this.gen_board();
     if (!this.state.showBoard){
      V = "Please Select dimension";
     }
      return (
        <div>
          {/* <form>
          <input id ="dim" type="number" minlength="0" onChange={this.changeN}></input>
          <button onClick={this.submitDim}> Submit Dim</button>
          </form> */}
          {V}
          {/* <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div> */}
        </div>
      );
  }
}

export default Board;