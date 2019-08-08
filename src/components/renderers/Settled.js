import React, { Component, Fragment } from 'react';
import propTypes from '@/utils/propTypes';
import renderProp from '@/utils/renderProp';

export default class Settled extends Component {
  static propTypes = propTypes;

  render() {
    const { settled } = this.props;

    if (!settled) {
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
