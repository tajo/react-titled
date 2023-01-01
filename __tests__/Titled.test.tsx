import React from 'react';
import { render } from '@testing-library/react';
import { beforeEach, expect, test, vi } from 'vitest';
import { Titled } from '../src/Titled';

beforeEach(() => {
  document.title = '';
});

test('should output single title', () => {
  const handleChange = vi.fn();
  render(
    <Titled title={() => 'Foo'} onChange={handleChange}>
      Child
    </Titled>
  );
  expect(handleChange).toHaveBeenCalledTimes(1);
  expect(handleChange.mock.calls[0][0]).toBe('Foo');
});

test('should override change handler', () => {
  let titleToSet = '';
  render(
    <Titled title={() => 'Foo'} onChange={(title) => (titleToSet = title)}>
      Child
    </Titled>
  );
  expect(titleToSet).toBe('Foo');
});

test('should output nested title', () => {
  const handleChange = vi.fn();
  render(
    <Titled title={() => 'A'} onChange={handleChange}>
      <Titled title={(title) => `B | ${title}`}>
        <Titled title={(title) => `C | ${title}`}>Child</Titled>
      </Titled>
    </Titled>
  );
  expect(handleChange).toHaveBeenCalledTimes(1);
  expect(handleChange.mock.calls[0][0]).toBe('C | B | A');
});

test('should renrender nested title', () => {
  const handleChange = vi.fn();
  render(
    <Titled title={() => 'A'} onChange={handleChange}>
      <Titled title={(title) => `B | ${title}`}>Child</Titled>
    </Titled>
  );
  expect(handleChange).toHaveBeenCalledTimes(1);
  expect(handleChange.mock.calls[0][0]).toBe('B | A');

  render(<Titled title={() => 'A'} onChange={handleChange} />);
  expect(handleChange).toHaveBeenCalledTimes(2);
  expect(handleChange.mock.calls[1][0]).toBe('A');
});

test('should handle string literal title', () => {
  const handleChange = vi.fn();
  render(<Titled title={'A'} onChange={handleChange}></Titled>);
  expect(handleChange).toHaveBeenCalledTimes(1);
  expect(handleChange.mock.calls[0][0]).toBe('A');
});

test('should handle nested string literal title', () => {
  const handleChange = vi.fn();
  render(
    <Titled title={() => 'A'} onChange={handleChange}>
      <Titled title={'B'}>
        <Titled title={(title) => `C | ${title}`}>Child</Titled>
      </Titled>
    </Titled>
  );
  expect(handleChange).toHaveBeenCalledTimes(1);
  expect(handleChange.mock.calls[0][0]).toBe('C | B');
});
