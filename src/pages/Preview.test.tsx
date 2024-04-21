import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Preview } from './Preview';

const mockProfiles = [
    {
        name: 'John Doe',
        gender: 'Male',
        durations: [{ sleepTimeDuration: 8, date: '2024-04-20' }],
    },
    {
        name: 'Jane Doe',
        gender: 'Female',
        durations: [{ sleepTimeDuration: 7, date: '2024-04-21' }],
    },
];


describe('Preview', () => {
    beforeEach(() => {
        
    });
   

    it('navigates to home page when "Return to Home" button is clicked', async () => {
        const { getByText } = render(
            <MemoryRouter initialEntries={['/preview']}>
                <Preview />
            </MemoryRouter>
        );

        // Click on the "Return to Home" button
        fireEvent.click(getByText('Return to Home'));

        // Assert that it navigates to the home page
        expect(window.location.pathname).toBe('/');
    });
});
