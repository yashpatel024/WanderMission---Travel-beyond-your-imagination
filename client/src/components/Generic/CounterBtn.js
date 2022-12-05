import React from "react";

import { Button } from "@mui/material";
import {ButtonGroup} from "@mui/material";

class CounterBtn extends React.Component {
  state = { counter: 0 };

  handleIncrement = () => {
    this.setState(state => ({ counter: state.counter + 1 }));
  };

  handleDecrement = () => {
    this.setState(state => ({ counter: state.counter - 1 }));
  };
  render() {
    const displayCounter = this.state.counter > 0;

    return (
      <ButtonGroup  size="small" variant="contained" aria-label="outlined primary button group">
        <Button onClick={this.handleIncrement} >+</Button>
        {displayCounter && <Button disabled>{this.state.counter}</Button>}
        {displayCounter && <Button onClick={this.handleDecrement}>-</Button>}
      </ButtonGroup>
    );
  }
}

export default CounterBtn;
