// responsible for side bar component
import {render, screen} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import Adapter from 'axios-mock-adapter';

import SideBar, {api} from '../SideBar';

const mockApi = new Adapter(api);

const mockNotifications = [
    {
        'id': 1,
        'notification_type': 'follow',
        'account': 2,
        'username': 'salmoon',
        'target': 1
    },
    {
        'id': 2,
        'notification_type': 'unfollow',
        'account': 3,
        'username': 'shareef',
        'target': 1
    }
]

const mockSearchResults = [
    {
        'id': 2,
        'fname': 'salmoon',
        'lname': 'unknown',
        'username': 'salmoon',
        'email': 'salmoon@mail.com',
        'profile_img': null,
        'followers_number': 2,
        'followers': [
            1, 3
        ],
        'user': 2
    },
    {
        'id': 3,
        'fname': 'shareef',
        'lname': 'saleem',
        'username': 'shareef',
        'email': 'shareef@mail.com',
        'profile_img': null,
        'followers_number': 1,
        'followers': [
            1
        ],
        'user': 3
    }
]

mockApi.onGet('notifications/').reply(200, mockNotifications);
mockApi.onGet(/search\/.+\//).reply(200, mockSearchResults);
mockApi.onDelete(/notification\/[1-9]\d*\/delete\//).reply(205, [mockNotifications[0]]);


describe('testing side bar component', () => {
    it('should render the component', async () => {
        await act(async () => render(<SideBar />));
        
        
        let element = screen.getByTestId('side-bar');

        expect(element).toBeInTheDocument();

    })

    it('should get the 2 notifications', async () => {
        await act(async () => render(<SideBar />));

        let notifications = screen.getAllByTestId('notification');

        expect(notifications.length).toBe(2);
    })

    it('should delete a notification', async () => {
        await act(async () => render(<SideBar />));

        let btns = screen.getAllByTestId('delete-notification');

        expect(btns.length).toBe(2);

        await userEvent.click(btns[1]);

        let notifications = screen.getAllByTestId('notification');
        expect(notifications.length).toBe(1);
    })

    it('should get search results', async () => {
        await act(async () => render(<SideBar />));

        let input = screen.getByTestId('search-input');
        expect(input).toBeInTheDocument();

        await userEvent.type(input, 's');

        let searchResuls = screen.getAllByTestId('search-result');
        expect(searchResuls.length).toBe(2)
    })
})