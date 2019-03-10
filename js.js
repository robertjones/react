'use strict';

const e = React.createElement;

var Data = Array(9).fill('_');
var isXTurn = true;

function isWinner(data, player) {
  const moves = [[0,1,2],
           [3,4,5],
           [6,7,8],
           [0,3,6],
           [1,4,7],
           [2,5,8],
           [0,4,8],
           [2,4,6]];
  return moves
    .map(cells => 
      cells.every(
        x => data[x]==player))
    .some(x => x)
};
        
function clicky(id) {
  var msg = ''
  if (Data[id] != '_' || isWinner(Data, 'X') || isWinner(Data, 'O')) { return 0 };
  // const player = isXTurn ? 'X' : 'O';
  Data[id] = 'X';
  if (isWinner(Data, 'X')) {
    msg = 'X wins!';
  } else {
    Data[CompTurn(Data)] = 'O';
    msg = isWinner(Data, 'O') ? 'O wins!' : ''
  };
  ReactDOM.render(
    e(()=>Board({msg: msg})), 
    domContainer);
};

function CompTurn(board) {
  return board[4] == '_' ? 4 : false 
  || takeWin(board, 'O')
  || takeWin(board, 'X')
  || emptyIds(board)[0]
  // || choice(emptyIds(board))
  ;
};

function choice(arr) {
  return arr[
    Math.floor(Math.random()*arr.length)]
};

function block(board, p) {
  board.forEach((el,id)=>
    Array(9).forEach((_,j)=>
      isWinner([...board.slice(0,j), p, ...board.slice(j,10)])
    )
  );
  return false
};

function place(arr, id, el) {
  return [...arr.slice(0,id), el, ...arr.slice(id+1,9)]
};

function takeWin(board, player) {
  return emptyIds(board)
    .filter(id => 
      isWinner(place(board, id, player), player))[0];
};

function emptyIds(data) {
  return data
    .map((el,id)=>[el,id])
    .filter(([el,id])=>el=='_')
    .map(([el,id])=>id);
};

function Square(props) {
  return e('button', 
           {style: {width: '100px', height: '100px'}, 
           onClick: () => clicky(props.id)}, 
           Data[props.id])
};

function Board(props) {
  return e('div', null,
    ...[0,1,2].map(i => e('div', {id: 'row'}, 
      ...[0,1,2].map(j => e(Square, 
        {id: j+i*3})))),
        MsgBox(props.msg))
};

function MsgBox(msg) {
  return e('div', null, msg)
};

const domContainer = document.querySelector('#app');
ReactDOM.render(e(Board), domContainer);