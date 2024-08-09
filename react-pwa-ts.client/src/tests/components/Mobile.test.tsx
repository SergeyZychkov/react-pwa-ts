import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Mobile from '../../components/Mobile';

describe('Renders Mobile component correctly', async () => {
    it('Should render the page correctly', async () => {
        render(<Mobile />);

        const locationButton = await screen.getByText('Get current user location');

        expect(locationButton).not.toBeNull();
    });
});