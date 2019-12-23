import React from 'react';

const CommentList = ({ comments }) => {
    return (
        <>
            <h3>Comments:</h3>
            {comments.map((c, key) => {
                return (
                    <div className="comment" key={key}>
                        <h4>{c.username}</h4>
                        <p>{c.text}</p>
                    </div>
                )
            })}
        </>
    );
}

export default CommentList;