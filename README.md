React-portal
============
[![npm version](https://img.shields.io/npm/v/react-titled.svg?style=flat-square)](https://www.npmjs.com/package/react-titled)
[![npm downloads](https://img.shields.io/npm/dm/react-titled.svg?style=flat-square)](https://www.npmjs.com/package/react-titled)
[![Build Status](https://travis-ci.org/tajo/react-titled.svg?branch=master)](https://travis-ci.org/tajo/react-titled)

> To fully control document.title in your React app.

## Features

- **requires React v16.3+ and its new context API**
- **supports nesting, similar to react-router**
- updates document.title only when all react-titled instances are reconciled 
- flexible, it lets you to specify how different levels should be concatenated
- **no dependencies**, ~100 lines of code

## Installation

```shell
yarn add react react-dom react-titled
```

## Usage examples

### Basic

```jsx 
import { Titled } from 'react-titled';

<Titled title={() => 'Example.com'}>
  <h1>Welcome!</h1>
  <Titled title={title => `Homepage | ${title}`} />
</Titled>
```

outputs

```
Homepage | Example.com
```

### The deepest one wins

```jsx 
import { Titled } from 'react-titled';

<Titled title={() => 'Example.com'}>
  <Titled title={() => 'Homepage'} />
</Titled>
```

outputs

```
Homepage
```

### Subscribe to changes

```jsx 
import { Titled } from 'react-titled';

<Titled title={() => 'Example.com'} onChange={title => console.log(title)}>
  <h1>Welcome!</h1>
  <Titled title={title => `Homepage | ${title}`} />
</Titled>
```

## Run Examples

```shell
git clone https://github.com/tajo/react-titled
cd react-titled
yarn install
yarn build:examples
open examples/index.html
```

## Contributions Welcome!

```shell
git clone https://github.com/tajo/react-titled
cd react-titled
yarn install
yarn build:examples --watch
open examples/index.html
```

### Run Tests

```
yarn test
```

## Author

Vojtech Miksu 2018, [miksu.cz](https://miksu.cz), [@vmiksu](https://twitter.com/vmiksu)
