
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { describe, it, expect } from "vitest";
import Dictionary from '../Dictionary';
import App from '../../App';



describe('App', () => {
  it('renders component', () => {
    render(<App />);

    screen.debug();
  });
  });

  describe("getDefinition function", () => {
  it("searches and displays definition when word exists", async () => {
    render(<Dictionary />);
    const input = screen.getByPlaceholderText('Search');
    const btn = screen.getByRole("button");

    await userEvent.type(input, "food");
    await userEvent.click(btn);

    // Use waitFor to wait for the text "food" to appear
    await waitFor(() => {
      expect(screen.getByText("Word: food")).toBeInTheDocument();
    });
  });

  it("displays an error message when no word is entered", async () => {
    render(<Dictionary />);
    const btn = screen.getByRole("button");

    await userEvent.click(btn);

    // Assert that the error message is displayed
    await waitFor(() => {
      expect(screen.getByText("Error: Something went wrong")).toBeInTheDocument();
    });
  });

    it("displays an error message when word does not exist", async () => {
      render(<Dictionary />);
      const input = screen.getByPlaceholderText('Search');
      const btn = screen.getByRole("button");

      await userEvent.type(input, "halw");
      await userEvent.click(btn);

      // Assert that the error message is displayed
      await waitFor(() => {
        expect(screen.getByText("Error: Something went wrong")).toBeInTheDocument();
      });
    });
  });

describe("Main content",  () => {
  it("renders the main content", async () => {
    render(<Dictionary />);
    const inputElement = screen.getByPlaceholderText('Search')
      await userEvent.type(inputElement, 'Hello');

    expect(inputElement).toHaveValue('Hello')

  });
  });
