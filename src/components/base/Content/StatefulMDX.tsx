import {
  Component,
  createContext,
  Fragment,
  FunctionComponent,
  ReactNode
} from 'react';

interface StateProps<T = any> {
  initial: T;
  children: ReactNode|((state: T) => ReactNode);
}

const StoreContext = createContext({
  setState: () => void 0
});

const Observe: FunctionComponent<any> = ({ children }) => (
  <StoreContext.Consumer>
    {({ setState, ...state }) => (
      children({ state, setState })
    )}
  </StoreContext.Consumer>
);

class State extends Component<StateProps> {
  static Observe: FunctionComponent<any>;

  static defaultProps = {
    initial: {}
  };

  state = {
    ...this.props.initial,
    setState: this.setState.bind(this)
  };

  render() {
    const state = this.state;
    const { children } = this.props;
    return (
      <StoreContext.Provider value={this.state}>
        <Fragment>
          {
            typeof children !== 'function'
              ? children
              : children({
                ...state,
                setState: state.setState
              })
          }
        </Fragment>
      </StoreContext.Provider>
    );
  }
}

State.Observe = Observe;

export default State;
