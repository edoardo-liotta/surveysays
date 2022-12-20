import { act, render, screen } from '@testing-library/react';
import QuestionBox from './QuestionBox';
import { click } from '@testing-library/user-event/dist/click';

test('renders player view, revealed', async () => {
  const item = { text: "Question", coverText: "coverText", isRevealed: true }
  render(<QuestionBox hostView={false} item={item} />);
  const coverText = screen.queryByText(/coverText/i);
  expect(coverText).not.toBeInTheDocument()
  const text = screen.queryByText(/Question/i);
  expect(text).toBeInTheDocument();
});

test('renders player view, hidden', async () => {
  const item = { text: "Question", coverText: "coverText", isRevealed: false }
  render(<QuestionBox hostView={false} item={item} />);
  const coverText = screen.queryByText(/coverText/i);
  expect(coverText).toBeInTheDocument()
  const text = screen.queryByText(/Question/i);
  expect(text).not.toBeInTheDocument();
});

test('renders host view, revealed', async () => {
  const item = { text: "Question", coverText: "coverText", isRevealed: true }
  render(<QuestionBox hostView={true} item={item} />);
  const coverText = screen.queryByText(/coverText/i);
  expect(coverText).not.toBeInTheDocument()
  const text = screen.queryByText(/Question/i);
  expect(text).toBeInTheDocument();
});

test('renders host view, hidden', async () => {
  const item = { text: "Question", coverText: "coverText", isRevealed: false }
  render(<QuestionBox hostView={true} item={item} />);
  const coverText = screen.queryByText(/coverText/i);
  expect(coverText).not.toBeInTheDocument()
  const text = screen.queryByText(/Question/i);
  expect(text).toBeInTheDocument();
});


test('toggles revealed state', async () => {
  const item = { text: "Question", coverText: "coverText", isRevealed: false }
  render(<QuestionBox hostView={true} item={item} />);
  const coverText = screen.queryByText(/coverText/i);
  expect(coverText).not.toBeInTheDocument()
  const text = screen.queryByText(/Question/i);
  expect(text).toBeInTheDocument();

  await click(text);
  await act(() => {
    const coverText = screen.queryByText(/coverText/i);
    expect(coverText).not.toBeInTheDocument()
    const text = screen.queryByText(/Question/i);
    expect(text).toBeInTheDocument();
  })
});


