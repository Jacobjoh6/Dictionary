
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

