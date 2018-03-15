import React, {Component} from 'react';


class Welcome extends Component {
  state = {
    selectedIndex: 0,
  };

  select = (index) => this.setState({selectedIndex: index});

  render() {
    return (
      <div>
        <h1>Welcome</h1>
    </div>
    );
  }
}
export default Welcome;