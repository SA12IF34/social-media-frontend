// responsible for home content component and post component
import {render, screen} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import Adapter from 'axios-mock-adapter';

import MainContent, {api as homeApi} from '../HomeContent';
import {api as postApi} from '../Post';

const homeMockApi = new Adapter(homeApi);
const postMockApi = new Adapter(postApi);

const mockPosts = [
    {
        'post_id': 1,
        'content': 'hello my friends',
        'edit_content': '<p>hello my friends</p>',
        'author': 3,
        'likes': 1,
        'dislikes': 0,
        'file': null
    },
    {
        'post_id': 2,
        'content': 'WEeeeeeeeeeeeeeee',
        'edit_content': '<p>WEeeeeeeeeeeeeeee</p>',
        'author': 2,
        'likes': 19,
        'dislikes': 26,
        'file': null
    }
]

homeMockApi.onGet('posts/type/latest/').reply(200, mockPosts);
homeMockApi.onGet('posts/type/foryou/').reply(200, mockPosts);

const mockAccount = {
    'id': 1,
    'fname': 'saif',
    'lname': 'chan',
    'username': 'saifChan',
    'email': 'saifchan@mail.com',
    'profile_img': null,
    'followers': [2],
    'user': 1
}

postMockApi.onGet(/accoutns\/[1-9]\d*\//).reply(200, mockAccount);

describe(`testing home content component and its child & grandchild components`, () => {

    it('should render the component', async () => {
        await act(async () => render(<MainContent />));

        let container = screen.getByTestId('container');
        let posts = screen.getAllByTestId('post');

        expect(container).toBeInTheDocument();
        expect(posts.length).toBe(2);

    });

    it('should convert to foryou posts', async () => {

    })


})
