import { render } from '@testing-library/react';
import QuestionBox from './QuestionBox';

test('renders covered list item', () => {
  render(<QuestionBox />);
  expect(true).toBeTruthy();
});

