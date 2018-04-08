import React from 'react';
import Titled from '../src/Titled';
import TestRenderer from 'react-test-renderer';

test('should output single title', () => {
  const handleChange = jest.fn();
  const renderer = TestRenderer.create(
    <Titled title={() => 'Foo'} onChange={handleChange} />
  );
  expect(handleChange).toHaveBeenCalledTimes(1);
  expect(handleChange.mock.calls[0][0]).toBe('Foo');
});

test('should output nested title', () => {
  const handleChange = jest.fn();
  const renderer = TestRenderer.create(
    <Titled title={() => 'A'} onChange={handleChange}>
      <Titled title={title => `B | ${title}`}>
        <Titled title={title => `C | ${title}`} />
      </Titled>
    </Titled>
  );
  expect(handleChange).toHaveBeenCalledTimes(1);
  expect(handleChange.mock.calls[0][0]).toBe('C | B | A');
});

test('should renrender nested title', () => {
  const handleChange = jest.fn();
  const renderer = TestRenderer.create(
    <Titled title={() => 'A'} onChange={handleChange}>
      <Titled title={title => `B | ${title}`} />
    </Titled>
  );
  expect(handleChange).toHaveBeenCalledTimes(1);
  expect(handleChange.mock.calls[0][0]).toBe('B | A');

  renderer.update(<Titled title={() => 'A'} onChange={handleChange} />);
  expect(handleChange).toHaveBeenCalledTimes(2);
  expect(handleChange.mock.calls[1][0]).toBe('A');
});
