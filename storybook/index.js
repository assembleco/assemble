import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Logo from "../client/components/logo"
import Link from "../client/components/link"

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

storiesOf("Link", module)
  .add("internal", () => (
    <Link to="/foo">Go to /foo</Link>
  ))
  .add("external", () => (
    <Link external to="https://github.com">GitHub</Link>
  ))
