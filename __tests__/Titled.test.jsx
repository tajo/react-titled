import React from 'react';
import { render } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { Titled } from '../src/Titled';

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

test('should output nested title', () => {
  const handleChange = vi.fn();
  render(
    <Titled title={() => 'A'} onChange={handleChange}>
      <Titled title={title => `B | ${title}`}>
        <Titled title={title => `C | ${title}`}>Child</Titled>
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
      <Titled title={title => `B | ${title}`}>Child</Titled>
    </Titled>
  );
  expect(handleChange).toHaveBeenCalledTimes(1);
  expect(handleChange.mock.calls[0][0]).toBe('B | A');

  render(<Titled title={() => 'A'} onChange={handleChange} />);
  expect(handleChange).toHaveBeenCalledTimes(2);
  expect(handleChange.mock.calls[1][0]).toBe('A');
});
