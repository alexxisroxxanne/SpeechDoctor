import React from 'react';

export default class InputForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dummyState: false,
    };
  }

  handleClick() {
    this.setState({
      dummyState: true,
    });
  }

  render() {
    return (
      <div>
        <textarea rows="30" cols="150" className="inputForm">
          The doctor will see you now!  Type or paste in your text sample here!
        </textarea>
      </div>
    );
  }
}

