import { render, screen } from '@testing-library/react';
import QuestionBox from './QuestionBox';
import ListItem from '../ListItem/ListItem';

test('renders covered list item', () => {
  render(<QuestionBox />);
  expect(true).toBeTruthy();
});

test('renders player view, discovered', async () => {
  render(<QuestionBox hostView={false} isDiscovered={true} coverText={"coverText"} text={"Question"}/>);
  const coverText = screen.queryByText(/coverText/i);
  expect(coverText).not.toBeInTheDocument()
  const text = screen.queryByText(/Question/i);
  expect(text).toBeInTheDocument();
});

test('renders player view, hidden', async () => {
  render(<QuestionBox hostView={false} isDiscovered={false} coverText={"coverText"} text={"Question"}/>);
  const coverText = screen.queryByText(/coverText/i);
  expect(coverText).toBeInTheDocument()
  const text = screen.queryByText(/Question/i);
  expect(text).not.toBeInTheDocument();
});

test('renders host view, discovered', async () => {
  render(<QuestionBox hostView={true} isDiscovered={true} coverText={"coverText"} text={"Question"}/>);
  const coverText = screen.queryByText(/coverText/i);
  expect(coverText).not.toBeInTheDocument()
  const text = screen.queryByText(/Question/i);
  expect(text).toBeInTheDocument();
});

test('renders host view, hidden', async () => {
  render(<QuestionBox hostView={true} isDiscovered={false} coverText={"coverText"} text={"Question"}/>);
  const coverText = screen.queryByText(/coverText/i);
  expect(coverText).not.toBeInTheDocument()
  const text = screen.queryByText(/Question/i);
  expect(text).toBeInTheDocument();
});


