import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

export default class Fetcher extends Component {
  static propTypes = {
    promisor: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      loaded: false,
      failed: false,
      data: null,
      error: null
    };

    this.setPromise = this.setPromise.bind(this);
  }

  componentDidMount() {
    this.setPromise();
  }

  setPromise() {
    this.promise = this.props.promisor();
    this.setState({
      loading: true,
      loaded: false,
      failed: false,
      data: null,
      error: null
    }, () => {
      this.promise
        .then((...args) => {
          this.setState({
            loading: false,
            loaded: true,
            failed: false,
            data: args
          });
          return args;
        })
        .catch((error) => {
          this.setState({
            loading: false,
            loaded: false,
            failed: true,
            data: null,
            error
          });
          return error;
        });
    });
  }

  render() {
    return (
      <Fragment>
        {this.state.loading && <div>Loading</div>}
        {this.state.loaded && <div>{this.state.data}</div>}
        {this.state.failed && <div>{this.state.error}</div>}
      </Fragment>
    );
  }
}
