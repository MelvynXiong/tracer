import React, { Component } from '../packages/react';
import ReactDOM from '../packages/react-dom';

// interface IProps {
//   name: string;
// }
// class Welcome extends Component<IProps, any> {
//   render() {
//     return <h1>Hello, {this.props.name}</h1>;
//   }
// }

// function App() {
//   return (
//     <div>
//       <Welcome name="Sara" />
//       <Welcome name="Cahal" />
//       <Welcome name="Edite" />
//     </div>
//   );
// }
// ReactDOM.render(<App />, document.getElementById('root'));

interface IState {
  num: number;
}
class Counter extends Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      num: 0,
    };
  }

  componentWillUpdate() {
    console.log('update');
  }

  componentWillMount() {
    console.log('mount');
  }

  onClick() {
    this.setState({ num: this.state.num + 1 });
  }

  render() {
    return (
      <div onClick={() => this.onClick()}>
        <h1>number: {this.state.num}</h1>
        <button>add</button>
      </div>
    );
  }
}

ReactDOM.render(<Counter />, document.getElementById('root'));
