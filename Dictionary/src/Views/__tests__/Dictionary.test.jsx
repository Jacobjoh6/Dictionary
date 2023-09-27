
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Dictionary from '../Dictionary';



describe('Dictionary', () => {
  it('renders component', () => {
    render(<Dictionary />);

    screen.debug();

    // check if App components renders headline
  });
});

test('search for a word', async () => {
  // Find input and button elements
  const input = getByPlaceholderText('Search word');
  const searchButton = getByText('Search');

  // Type a word in the input and click the search button
  await type(input, 'testword');
  await click(searchButton);

  // Wait for data to be loaded (assuming your component uses async API calls)
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Adjust the delay as needed

  // Check if the word is displayed in the result
  const wordResult = getByText('Word: testword');
  expect(wordResult).not.toBeNull();

  // Check if the error message is not displayed
  const errorMessage = queryByText(/Error:/);
  expect(errorMessage).toBeNull();
});

