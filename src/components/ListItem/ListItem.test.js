import { render, screen } from '@testing-library/react';
import ListItem from './ListItem';

test('renders covered list item, player view', () => {
  render(<ListItem hostView={false} isDiscovered={false} itemNumber={"1"} text={"Sample"} points={"2"}/>);
  const text = screen.getByText(/Sample/i);
  expect(text).toBeInTheDocument()
  //expect(text).not.toBeVisible()
  const points = screen.getByText(/2/i);
  expect(points).toBeInTheDocument();
  //expect(points).not.toBeVisible();
});

test('renders covered list item, host view', () => {
  render(<ListItem hostView={true} isDiscovered={false} itemNumber={"1"} text={"Sample"} points={"2"}/>);
  const text = screen.getAllByText(/Sample/i);
  expect(text[0]).toBeInTheDocument();
  expect(text[0]).toBeVisible();
  const points = screen.getByText(/2/i);
  expect(points).toBeInTheDocument();
  expect(points).toBeVisible();
});

test('renders discovered list item', () => {
  render(<ListItem hostView={false} isDiscovered={true} itemNumber={"1"} text={"Sample"} points={"2"}/>);
  const text = screen.getAllByText(/Sample/i);
  expect(text[0]).toBeInTheDocument();
  expect(text[0]).toBeVisible();
  const points = screen.getByText(/2/i);
  expect(points).toBeInTheDocument();
  expect(points).toBeVisible();
});
