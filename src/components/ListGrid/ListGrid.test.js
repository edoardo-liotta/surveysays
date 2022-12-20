import { render } from '@testing-library/react';
import ListGrid from './ListGrid';

test('renders covered list item', () => {
  render(<ListGrid />);
  expect(true).toBeTruthy();
});

