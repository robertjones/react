// function Welcome(props) {
//   return <h1>Hello, {props.name}</h1>;
// }

// const element = <Welcome name="Sara" />;
// ReactDOM.render(
//   element,
//   document.getElementById('root')
// );

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

var data = [1, null, null,
        null, 2, null,
        null, null, 3,]

function Square(props) {
  return e('button', null, props.say)
};

function Board(props) {
  return e('div', null,
    ...[0,1,2].map(i => e('div', {id: 'row'}, 
      ...[0,1,2].map(j => e(Square, {id: data[j+i*3], say: 'hi'})))))
};


const domContainer = document.querySelector('#like_button_container');
ReactDOM.render(e(Board, data), domContainer);