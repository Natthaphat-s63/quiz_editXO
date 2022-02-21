import Board from "./Board"
import React from "react";


function checkRow(sqr,n){
  let checkList=Array(n).fill(null)
  // console.log(checkList)
  let result=null;
  let idxOfChkList=0;
  for(let i =n-1;i<n*n;i+=n)
  {   
    let dupAllEachRow;
    let row=sqr.slice(i-(n-1),i+1);
    // console.log(i+row)
    let first=row[0]
    dupAllEachRow = row.every((elem)=>{
      return elem === first;
    })
    if(dupAllEachRow){
      checkList[idxOfChkList]=first
    }
    idxOfChkList++;
  }
  checkList.forEach((elem)=>{
    if(elem!=null){
      result = elem
    }
  })
  //console.log(checkList)
  return result
}

function checkCol(sqr,n){
  let checkList=Array(n).fill(null);
  // console.log(checkList)
  let result = null;
  let idxOfChkList =0;
  for(let i =0;i<n;i++)
  {
    let tmp = sqr[i]
    let dupAllEachCol=true;
    for(let j = i;j<n*n;j+=n){
      dupAllEachCol = (dupAllEachCol&&(sqr[j]===tmp))
      tmp = sqr[j]
    }
    if(dupAllEachCol){
      checkList[idxOfChkList]=tmp;
    }
    idxOfChkList++;
  }
  checkList.forEach((elem)=>{
    if(elem!=null){
      result = elem
    }
  })
  // console.log(checkList)
  return result
}

function checkL_Obliq(sqr,n){
  let tmp = sqr[0]
  if(tmp === null)return null;
  let dupAll= true
  for(let i =0;i<n*n;i+=n+1){
    dupAll = (dupAll&&(sqr[i]===tmp))
    tmp = sqr[i]
  }
  if(dupAll){
    return tmp
  }
  else {
    return null
  }
}
function checkR_Obliq(sqr,n){
  let tmp = sqr[n-1]
  if(tmp === null)return null;
  let dupAll = true
  for(let i =n-1;i<n*n-n+1;i+=n-1){
    dupAll = (dupAll&&(sqr[i]===tmp))
    tmp=sqr[i]
  }
  if(dupAll){
    return tmp
  }
  else {
    return null
  }
}

class Game extends React.Component {

   calculateWinner(squares) {
    let n_dim = this.state.n
    let row = checkRow(squares,n_dim)
    let col = checkCol(squares,n_dim)
    let left = checkL_Obliq(squares,n_dim);
    let right = checkR_Obliq(squares,n_dim);
    if(row!=null){
      return row
    }else if(col!=null){
      return col
    }else if(left!=null){
      return left
    }else if(right!=null){
      return right
    }else{
      return null
    }
  }

    constructor(props) {
        super(props);
        this.state = {
          history: [{
            squares: Array(9).fill(null),
          }],
          stepNumber: 0,
          xIsNext: true,
          n:3,
          nOnChange:3,
          showBoard:false
        };
        this.submitDim  = this.submitDim.bind(this)
        this.changeN  = this.changeN.bind(this)
        this.calculateWinner=this.calculateWinner.bind(this)
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        //console.log(squares[i])
        if (this.calculateWinner(squares) || squares[i]) {
          return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
          history: history.concat([{
            squares: squares,
          }]),
          stepNumber: history.length,
          xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
      });
    }
    changeN(e){
      this.setState({...this.state,nOnChange:parseInt(e.target.value)})
    }
    submitDim(e){
      e.preventDefault()
      let num = this.state.nOnChange
      //console.log(num)
      if (this.state.nOnChange >=3){
        this.setState({
          ...this.state,
          history: [{
            squares: Array(num*num).fill(null),
          }],
          stepNumber: 0,
          xIsNext: true,
          n:this.state.nOnChange,
          showBoard:false
        },()=>{
          // console.log(this.state.history)
        })
        
      }
    }
    
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = this.calculateWinner(current.squares);

        const moves = history.map((step, move) => {
          const desc = move ?
            'Go to move #' + move :
            'Go to game start';
          return (
            <li>
              <button onClick={() => this.jumpTo(move)}>{desc}</button>
            </li>
          );
        });

        let status;
        if (winner) {
        status = 'Winner: ' + winner;
        } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
              <div className="game-info">
              <form>
              <h4>Enter n Dimensions</h4>
              <input id ="dim" type="number" onChange={this.changeN} min={3}/>
              <button onClick={this.submitDim}> Submit</button>
              </form><br/>
                <div>{status}</div>
                <ol>{moves}</ol>
              </div>
              <div className="game-board" style={{margin:"20px"}}>
                <Board
                  n={this.state.n}
                  squares={current.squares}
                  onClick={(i) => this.handleClick(i)}
                />
              </div>
              
            </div>
        );
    }
  }

export default Game;