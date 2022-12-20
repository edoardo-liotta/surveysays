import { act, render, screen } from '@testing-library/react';
import ListItem from './ListItem';
import { click } from '@testing-library/user-event/dist/click';

test('renders covered list item, player view', async () => {
  render(<ListItem hostView={false} isDiscovered={false} coverText={"1"} text={"Sample"} points={"2"} />);
  const number = screen.getByText(/1/i);
  expect(number).toBeInTheDocument()
  const text = screen.queryByText(/Sample/i);
  expect(text).not.toBeInTheDocument();
  //expect(text).not.toBeVisible()
  const points = screen.queryByText(/2/i);
  expect(points).not.toBeInTheDocument();
  //expect(points).not.toBeVisible();
});

test('renders covered list item, host view', () => {
  render(<ListItem hostView={true} isDiscovered={false} coverText={"1"} text={"Sample"} points={"2"} />);
  const text = screen.getByText(/Sample/i);
  expect(text).toBeInTheDocument();
  expect(text).toBeVisible();
  const points = screen.getByText(/2/i);
  expect(points).toBeInTheDocument();
  expect(points).toBeVisible();
});

test('renders discovered list item', () => {
  render(<ListItem hostView={false} isDiscovered={true} coverText={"1"} text={"Sample"} points={"2"} />);
  const text = screen.getByText(/Sample/i);
  expect(text).toBeInTheDocument();
  expect(text).toBeVisible();
  const points = screen.getByText(/2/i);
  expect(points).toBeInTheDocument();
  expect(points).toBeVisible();
});

test('toggles discovered state', async () => {
  render(<ListItem hostView={false} isDiscovered={false} coverText={"1"} text={"Sample"} points={"2"} />);
  const number = screen.getByText(/1/i);
  expect(number).toBeInTheDocument()
  const text = screen.queryByText(/Sample/i);
  expect(text).not.toBeInTheDocument();
  const points = screen.queryByText(/2/i);
  expect(points).not.toBeInTheDocument();
  await click(number);
  await act(() => {
    const number = screen.getByText(/1/i);
    expect(number).toBeInTheDocument()
    const text = screen.getByText(/Sample/i);
    expect(text).toBeInTheDocument();
    const points = screen.getByText(/2/i);
    expect(points).toBeInTheDocument();
  })
})