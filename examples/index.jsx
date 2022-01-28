import React from 'react';
import ReactDOM from 'react-dom';
import { Titled } from '../src/Titled';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: 'Middle',
      showLeaf: true
    };
  }

  toggleButton = () =>
    this.setState(prevState => ({ showLeaf: !prevState.showLeaf }));

  render() {
    const { inputValue, showLeaf } = this.state;
    return (
      <React.Fragment>
        <h1>React Titled Example</h1>
        <input
          type="text"
          value={inputValue}
          onChange={e => this.setState({ inputValue: e.target.value })}
        />
        <button onClick={this.toggleButton}>Toggle Leaf</button>
        <Titled
          title={() => 'Example.com'}
          onChange={title => console.log(title)}
        >
          <h1>Example.com</h1>
          <Titled title={title => `${inputValue} | ${title}`}>
            <h2>{inputValue}</h2>
            {showLeaf && (
              <Titled title={title => `Leaf | ${title}`}>
                <h3>Leaf</h3>
              </Titled>
            )}
          </Titled>
        </Titled>
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
