import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Begin from '@Components/renderers/Begin';
import Pending from '@Components/renderers/Pending';
import Resolved from '@Components/renderers/Resolved';
import Rejected from '@Components/renderers/Rejected';
import Settled from '@Components/renderers/Settled';

const noOperation = () => undefined;

const fetcherFactory = () => {
  const Context = React.createContext();
  Context.displayName = 'Fetcher';

  const { Provider, Consumer } = Context;

  class Fetcher extends Component {
    static propTypes = {
      children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
      promisor: PropTypes.func.isRequired,
      defer: PropTypes.bool,

      onStart: PropTypes.func,
      onPending: PropTypes.func,
      onResolve: PropTypes.func,
      onReject: PropTypes.func,
      onSettle: PropTypes.func
    };

    static defaultProps = {
      defer: false,

      // Events
      onStart: noOperation,
      onPending: noOperation,
      onResolve: noOperation,
      onReject: noOperation,
      onSettle: noOperation
    };

    constructor(props) {
      super(props);

      this.state = {
        pending: false,
        resolved: false,
        rejected: false,
        result: null,
        error: null
      };

      this.getPromise = this.getPromise.bind(this);
      this.hasMounted = false;
    }

    componentDidMount() {
      this.hasMounted = true;
      if (!this.props.defer) {
        this.props.onStart();
        this.getPromise();
      }
    }

    componentDidUpdate(prevProps) {
      if (this.props.defer === false && prevProps.defer) {
        this.props.onStart();
        this.getPromise();
      }
    }

    getPromise = () => {
      this.promise = this.props.promisor();
      this.props.onPending(this.promise, this.state);
      this.setState(
        {
          pending: true,
          resolved: false,
          rejected: false,
          settled: false,
          result: null,
          error: null
        },
        () => {
          this.promise
            .then((...args) => {
              const updatedState = {
                pending: false,
                resolved: true,
                rejected: false,
                settled: true,
                result: args,
                error: null
              };
              this.props.onResolve(this.promise, updatedState);
              this.setState(updatedState, () => {
                this.props.onSettle(this.promise, this.state);
              });
              return args;
            })
            .catch((error) => {
              const updatedState = {
                pending: false,
                resolved: false,
                rejected: true,
                settled: true,
                result: null,
                error
              };
              this.props.onReject(this.promise, updatedState);
              this.setState(updatedState, () => {
                this.props.onSettle(this.promise, this.state);
              });
              return error;
            });
        }
      );
    }

    render() {
      return (
        <Provider value={this.state}>
          {this.props.children}
        </Provider>
      );
    }
  }

  const BeginConsumer = props => <Consumer>{state => <Begin {...props} {...state} />}</Consumer>;
  const PendingConsumer = props => <Consumer>{state => <Pending {...props} {...state} />}</Consumer>;
  const ResolvedConsumer = props => <Consumer>{state => <Resolved {...props} {...state} />}</Consumer>;
  const RejectedConsumer = props => <Consumer>{state => <Rejected {...props} {...state} />}</Consumer>;
  const SettledConsumer = props => <Consumer>{state => <Settled {...props} {...state} />}</Consumer>;

  BeginConsumer.displayName = 'Begin';
  PendingConsumer.displayName = 'Pending';
  ResolvedConsumer.displayName = 'Resolved';
  RejectedConsumer.displayName = 'Rejected';
  SettledConsumer.displayName = 'Settled';

  Fetcher.Begin = BeginConsumer;
  Fetcher.Pending = PendingConsumer;
  Fetcher.Resolved = ResolvedConsumer;
  Fetcher.Rejected = RejectedConsumer;
  Fetcher.Settled = SettledConsumer;

  return Fetcher;
};

export default fetcherFactory();
