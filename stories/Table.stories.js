import React from 'react';
import { storiesOf } from '@storybook/react';
import { Table } from '../dist/index';

storiesOf('Button', module)
  .add('with text', () => (
    <Table>Hello Button</Table>
  ))
  .add('with emoji', () => (
    <Table><span role="img" aria-label="so cool">😀 😎 👍 💯</span></Table>
  ));
