import React, { Component, Fragment } from 'react';
import propTypes from '@/utils/propTypes';
import renderProp from '@/utils/renderProp';

export default class Pending extends Component {
  static propTypes = propTypes;

  render() {
    const { pending } = this.props;

    if (!pending) {
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
