import { render, screen } from '@testing-library/react';
import ListItem from './ListItem';

test('renders learn react link', () => {
  render(<ListItem itemNumber={"1"}/>);
  const numberElement = screen.getByText(/1/i);
  expect(numberElement).toBeInTheDocument();
});
