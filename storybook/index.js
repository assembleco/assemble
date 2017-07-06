import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Logo from "../client/components/logo"
// import BlockSource from "../client/pages/block_page/block_source"

storiesOf('Button', module)
  .add('with text', () => (
    <button onClick={action('clicked')}>Hello Button</button>
  ))
  .add('with no emoji', () => (
    <button onClick={action('clicked')}>no emojis</button>
  ))
  .add('with bold text', () => (
    <button onClick={action('clicked')}>Some <strong>more</strong> text</button>
  ))
  .add('with italic text', () => (
    <button onClick={action('clicked')}>Some <strong>more</strong> text</button>
  ))

storiesOf("Logo", module)
  .add("stationary", () => (
    <Logo />
  ))
  .add("rotating", () => (
    <Logo continuous />
  ))

/*
storiesOf("Block source", module)
  .add("not editable", () => (
    <BlockSource
      id="1"
      source="echo 'foobar'"
      environment={{ id: "1" }}
    />
  ))
  .add("editable", () => (
    <BlockSource
      editable
      id="1"
      source="echo 'foobar'"
      environment={{ id: "1" }}
    />
  ))
*/
