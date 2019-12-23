import React from 'react';

const UpvotesSection = (props) => {
    const {articleName, upvotes, setArticleInfo} = props;
    
    const addUpvote = async () => {
        const result = await fetch(`/api/articles/${articleName}/upvote`, { method : 'post' });
        const body = await result.json();
        setArticleInfo(body);
    }

    return (
        <div id="upvotes-section">
            <button onClick={addUpvote}>Add upvote</button>
            <p>This post has been upvoted {upvotes} times.</p>
        </div>
    );
}

export default UpvotesSection;