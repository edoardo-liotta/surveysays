import { render, screen } from '@testing-library/react';
import ListItem from './ListItem';

test('renders covered list item', () => {
  render(<ListItem isDiscovered={false} itemNumber={"1"}/>);
  const numberElement = screen.getByText(/1/i);
  expect(numberElement).toBeInTheDocument();
});

test('renders discovered list item', () => {
  render(<ListItem isDiscovered={true} text={"Sample"} points={"2"}/>);
  const text = screen.getByText(/Sample/i);
  expect(text).toBeInTheDocument();
  const points = screen.getByText(/2/i);
  expect(points).toBeInTheDocument();
});
