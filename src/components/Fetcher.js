import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Before extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    processing: PropTypes.bool.isRequired,
    pending: PropTypes.bool.isRequired,
    resolved: PropTypes.bool.isRequired,
    rejected: PropTypes.bool.isRequired,
    processed: PropTypes.bool.isRequired
  };

  render() {
    const {
      processing,
      pending,
      resolved,
      rejected,
      processed
    } = this.props;

    if (processing || pending || resolved || rejected || processed) {
      return null;
    }

    return <div>Before: {this.props.children}</div>;
  }
}

class Resolved extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    processing: PropTypes.bool.isRequired,
    pending: PropTypes.bool.isRequired,
    resolved: PropTypes.bool.isRequired,
    rejected: PropTypes.bool.isRequired,
    processed: PropTypes.bool.isRequired
  };

  render() {
    const {
      processing,
      pending,
      resolved,
      rejected
    } = this.props;

    if (processing || pending || !resolved || rejected) {
      return null;
    }

    return <div>Resolved: {this.props.children}</div>;
  }
}

const fetcherFactory = () => {
  const { Provider, Consumer } = React.createContext();
  class Fetcher extends Component {
    static propTypes = {
      children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
      promisor: PropTypes.func.isRequired
    };

    constructor(props) {
      super(props);

      this.state = {
        processing: false,
        pending: false,
        resolved: false,
        rejected: false,
        processed: false,
        data: null,
        error: null
      };

      this.setPromise = this.setPromise.bind(this);
      this.hasMounted = false;
    }

    componentDidMount() {
      this.hasMounted = true;
      this.setPromise();
    }

    setPromise() {
      this.promise = this.props.promisor();
      this.setState(
        {
          processing: true,
          pending: true,
          resolved: false,
          rejected: false,
          processed: false,
          data: null,
          error: null
        },
        () => {
          this.promise
            .then((...args) => {
              this.setState({
                processing: false,
                pending: false,
                resolved: true,
                rejected: false,
                processed: true,
                data: args,
                error: null
              });
              return args;
            })
            .catch((error) => {
              this.setState({
                processing: false,
                pending: false,
                resolved: false,
                rejected: true,
                processed: true,
                data: null,
                error
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

  const BeforeConsumer = props => <Consumer>{state => <Before {...props} {...state} />}</Consumer>;
  const ResolvedConsumer = props => <Consumer>{state => <Resolved {...props} {...state} />}</Consumer>;

  Fetcher.Before = BeforeConsumer;
  Fetcher.Resolved = ResolvedConsumer;
  return Fetcher;
};

export default fetcherFactory();
