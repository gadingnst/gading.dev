'use client';

import { Component, createContext } from 'react';

type StateValue = Record<string, unknown>;

interface StateContextType {
  state: StateValue;
  // eslint-disable-next-line no-unused-vars
  setState: (state: StateValue) => void;
}

const StateContext = createContext<StateContextType>({
  state: {},
  setState: () => {}
});

interface StateProps {
  children: React.ReactNode;
  initial?: StateValue;
}

interface StateState {
  state: StateValue;
}

class State extends Component<StateProps, StateState> {
  constructor(props: StateProps) {
    super(props);
    this.state = {
      state: props.initial || {}
    };
  }

  updateState = (newState: StateValue) => {
    super.setState((prevState: StateState) => ({
      state: { ...prevState.state, ...newState }
    }));
  };

  render() {
    return (
      <StateContext.Provider
        value={{
          state: this.state.state,
          setState: this.updateState
        }}
      >
        {this.props.children}
      </StateContext.Provider>
    );
  }
}

interface ObserveProps {
  // eslint-disable-next-line no-unused-vars
  children: (context: StateContextType) => React.ReactNode;
}

const Observe: React.FC<ObserveProps> = ({ children }) => {
  return (
    <StateContext.Consumer>
      {(context) => children(context)}
    </StateContext.Consumer>
  );
};

// Create a compound component structure
const StateWithObserve = State as typeof State & {
  Observe: typeof Observe;
};

StateWithObserve.Observe = Observe;

export default StateWithObserve;
