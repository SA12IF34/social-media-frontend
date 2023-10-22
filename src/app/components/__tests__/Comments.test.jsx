// responsible for comments component
import {render, screen, waitFor} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import Adapter from 'axios-mock-adapter';

import Comments, {api} from '../Comments';

const mockApi = new Adapter(api);

mockApi.onPost(/comments\/[1-9]\d*\//).reply(201, {
    'id': 3,
    'content': 'new comment',
    'post': 1,
    'author': 'saifChan'
});
mockApi.onDelete(/comment\/[1-9]\d*\//).reply(204);

const mockComments = [
    {
        'id': 1,
        'content': 'hello',
        'post': 1,
        'author': 'saifChan'
    },
    {
        'id': 2,
        'content': 'welcome',
        'post': 1,
        'author': 'salmoon'
    }
]

describe('testing comments component', () => {

    it('should render comments component', async () => {
        await act(async () => render(<Comments postId={4} comments={mockComments} username={'saifChan'} />))
    
        let element = screen.getByTestId('comments-component');
        let comments = screen.getAllByTestId('comment');
        
        expect(element).toBeInTheDocument();
        expect(comments.length).toBe(2);

    });

    it('should post a new comment', async () => {
        await act(async () => render(<Comments postId={4} comments={mockComments} username={'saifChan'} />))

        let input = screen.getByTestId('comment-input');
        let btn = screen.getByTestId("comment-btn");

        await userEvent.type(input, 'new comment');
        await userEvent.click(btn);

        let commentsContainer = await screen.findByTestId('comments');
        expect(commentsContainer.childNodes.length).toBe(3);

    })

    it('should delete a comment', async () => {
        await act(async () => render(<Comments postId={4} comments={mockComments} username={'saifChan'} />))
    
        let btns = screen.getAllByTestId('menu-btn');
        expect(btns.length).toBe(1);

        await userEvent.click(btns[0]);
        
        let deleteBtn = screen.getByTestId('delete-btn');    
        await userEvent.click(deleteBtn);

        let comments = screen.getAllByTestId('comment');
        expect(comments.length).toBe(1);

        
    })
})