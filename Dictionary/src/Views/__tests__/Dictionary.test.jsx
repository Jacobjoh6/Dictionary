
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { describe, it, expect } from "vitest";
import Dictionary from '../Dictionary';
import App from '../../App';


//Renders App component
describe('App', () => {
  it('renders component', () => {
    render(<App />);

    screen.debug();
  });
});

//checks if the word typed by user is displayed on page
  describe("getDefinition function", () => {
  it("searches and displays definition when word exists", async () => {
    render(<Dictionary />);
    const input = screen.getByPlaceholderText('Search');
    const btn = screen.getByRole("button");

    await userEvent.type(input, "hello");
    await userEvent.click(btn);

    await waitFor(() => {
      expect(screen.getByText("Word: hello")).toBeInTheDocument();
      expect(screen.getByText("Text: /həˈləʊ/")).toBeInTheDocument();
      expect(screen.getByText("Part of Speech: noun")).toBeInTheDocument();
      expect(screen.getByText("Synonyms: greeting")).toBeInTheDocument();
    });
  });

//Checks if user has typed a word 
  it("displays an error message when no word is entered", async () => {
    render(<Dictionary />);
    const btn = screen.getByRole("button");

    await userEvent.click(btn);

    // Assert that the error message is displayed
    await waitFor(() => {
      expect(screen.getByText("Error: Something went wrong")).toBeInTheDocument();
    });
  });

//checks if word exists or is spelled wrong
    it("displays an error message when word does not exist", async () => {
      render(<Dictionary />);
      const input = screen.getByPlaceholderText('Search');
      const btn = screen.getByRole("button");

      await userEvent.type(input, "asdds");
      await userEvent.click(btn);

      // Assert that the error message is displayed
      await waitFor(() => {
        expect(screen.getByText("Error: Something went wrong")).toBeInTheDocument();
      });
    });
  });

//checks if the value of input is the same as the word user typed
describe("Main content",  () => {
  it("renders the main content", async () => {
    render(<Dictionary />);
    const inputElement = screen.getByPlaceholderText('Search')
      await userEvent.type(inputElement, 'hello');

    expect(inputElement).toHaveValue('hello')

  });
});
