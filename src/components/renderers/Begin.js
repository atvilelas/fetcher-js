import React, { Component, Fragment } from 'react';
import propTypes from '@/utils/propTypes';
import renderProp from '@/utils/renderProp';

export default class Begin extends Component {
  static propTypes = propTypes;

  render() {
    const {
      pending,
      resolved,
      rejected,
      settled
    } = this.props;

    if (pending || resolved || rejected || settled) {
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
