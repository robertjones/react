'use strict';

const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

    return e(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'Like'
    );
  }
}

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
  if (Data[id] != '_' || isWinner(Data, 'X') || isWinner(Data, 'O')) { return 0 };
  const player = isXTurn ? 'X' : 'O';
  Data[id] = isXTurn ? 'X' : 'O';
  const msg = isWinner(Data, player) ? player + ' wins!' : ''
  ReactDOM.render(
    e(()=>Board({msg: msg})), 
    domContainer);
  isXTurn = !isXTurn;
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