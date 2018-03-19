import React, {Component} from 'react';
import axios from 'axios';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


class Welcome extends Component {
  constructor(props) {
    super(props);
}

  render() {
    return (
      <div>
        <h1>Welcome</h1>
    </div>
    );
  }
}
export default Welcome;