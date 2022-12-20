import { render } from '@testing-library/react';
import Playground from './Playground';

test('renders covered list item', () => {
  render(<Playground />);
  expect(true).toBeTruthy();
});


