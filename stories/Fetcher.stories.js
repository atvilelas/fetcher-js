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
        }, 6000);
      })
    );
    return (
      <Fetcher
        promisor={promisor}
        onStart={() => console.log('onStart')}
        onPending={() => console.log('onPending')}
        onResolve={() => console.log('onResolve')}
        onReject={() => console.log('onReject')}
        onSettle={() => console.log('onSettle')}
      >
        <div>Hi</div>
        <Fetcher.Begin>It starts</Fetcher.Begin><br/>
        <Fetcher.Pending>It pends</Fetcher.Pending><br/>
        <Fetcher.Resolved>It resolves</Fetcher.Resolved><br/>
        <Fetcher.Rejected>It rejects</Fetcher.Rejected><br/>
        <Fetcher.Settled>It settles</Fetcher.Settled><br/>
        <Fetcher.Resolved>{props => <div>Done: <pre>{JSON.stringify(props)}</pre></div>}</Fetcher.Resolved>
      </Fetcher>
    );
  });
