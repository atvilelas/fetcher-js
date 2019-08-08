import React, { Component, Fragment } from 'react';
import propTypes from '@/utils/propTypes';
import renderProp from '@/utils/renderProp';

export default class Rejected extends Component {
  static propTypes = propTypes;

  render() {
    const { rejected } = this.props;

    if (!rejected) {
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
