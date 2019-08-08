import React, { Component, Fragment } from 'react';
import propTypes from '@/utils/propTypes';
import renderProp from '@/utils/renderProp';

export default class Resolved extends Component {
  static propTypes = propTypes;

  render() {
    const { resolved } = this.props;

    if (!resolved) {
      return null;
    }

    const { children, ...props } = this.props;
    return (
      <Fragment>
        {renderProp(children, props)}
      </Fragment>
    );
  }
}
