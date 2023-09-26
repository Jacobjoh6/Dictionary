
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Dictionary from './Dictionary';

// Mock the fetch function
global.fetch = jest.fn();

describe('Dictionary', () => {
  beforeEach(() => {
    // Clear any previous fetch mock calls
    global.fetch.mockClear();
  });

  it('renders the component', () => {
    render(<Dictionary />);
    const header = screen.getByText('Dictionary');
    expect(header).toBeInTheDocument();
  });

  it('fetches data when the search button is clicked', async () => {
    const word = 'example';
    const mockData = [{ word: 'example' }];
    const mockResponse = { ok: true, json: () => Promise.resolve(mockData) };
    global.fetch.mockResolvedValue(mockResponse);

    render(<Dictionary />);

    const input = screen.getByPlaceholderText('Search word');
    const searchButton = screen.getByText('Search');

    fireEvent.change(input, { target: { value: word } });
    fireEvent.click(searchButton);

    // Wait for the fetch and state updates
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
    });

    const wordElement = screen.getByText('Word: example');
    expect(wordElement).toBeInTheDocument();
  });

  it('handles errors when fetching data', async () => {
    const word = 'error';
    const mockResponse = { ok: false };
    global.fetch.mockResolvedValue(mockResponse);

    render(<Dictionary />);

    const input = screen.getByPlaceholderText('Search word');
    const searchButton = screen.getByText('Search');

    fireEvent.change(input, { target: { value: word } });
    fireEvent.click(searchButton);

    // Wait for the fetch and state updates
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
    });

    const errorElement = screen.getByText('Error: Something went wrong');
    expect(errorElement).toBeInTheDocument();
  });
});