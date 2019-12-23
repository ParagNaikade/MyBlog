import React, { useState } from 'react';

const AddCommentForm = (props) => {
    const { articleName, setArticleInfo } = props;

    const [username, setUsername] = useState('');
    const [comment, setComment] = useState('');

    const onUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const onCommentChange = (event) => {
        setComment(event.target.value);
    }

    const onAddButonClick = async () => {
        const result = await fetch(`/api/articles/${articleName}/add-comment`, {
            method: 'post',
            body: JSON.stringify({username, text: comment}),
            headers: {
                'Content-Type' : 'application/json'
            }
        } );
        const body = await result.json();
        setArticleInfo(body);

        setUsername('');
        setComment('');
    }

    return (
        <div id="add-comment-form">
            <h3>Add a comment</h3>
            <label>
                Name: <input type="text" value={username} onChange={onUsernameChange} />
            </label>
            <label>
                Comment: <textarea value={comment} rows="4" cols="50" onChange={onCommentChange} />
            </label>
            <button onClick={onAddButonClick}>Add comment</button>
        </div>
    );
}

export default AddCommentForm;