import React from 'react';
import { storiesOf } from '@storybook/react';
import { Fetcher } from '../dist/index';

storiesOf('Fetcher', module)
  .add('with text', () => (
    <Fetcher>Hello Button</Fetcher>
  ))
  .add('with emoji', () => {
    const promisor = () => (
      new Promise((resolve, reject) => {
        window.setTimeout(() => {
          const random = Math.floor(Math.random() * 10);
          if (random % 2 === 0) {
            resolve('done');
          } else {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject('failed');
          }
        }, 1000);
      })
    );
    return (
      <Fetcher promisor={promisor}>
        <Fetcher.Before>It starts</Fetcher.Before>
        <Fetcher.Resolved>Done</Fetcher.Resolved>
      </Fetcher>
    );
  });
