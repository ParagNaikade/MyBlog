import React, { useState, useEffect } from 'react'
import articles from './article-content';
import ArticlesList from '../components/ArticlesList';
import NotFound from './NotFoundPage';
import CommentList from '../components/CommentList';
import UpvotesSection from '../components/UpvotesSection';
import AddCommentForm from '../components/AddCommentForm';

const ArticlePage = (props) => {
    const { name } = props.match.params;
    const article = articles.find(a => a.name === name);

    const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });

    useEffect(() => {
        const fetchArticle = async () => {
            const result = await fetch(`/api/articles/${name}`);
            const body = await result.json();
            setArticleInfo(body)
        }

        fetchArticle();
        
    }, [name]);

    

    if (!article) {
        return <NotFound />
    }

    const otherArticles = articles.filter(a => a.name !== name);

    return (<>
        <h1>{article.title}</h1>
        
        <UpvotesSection setArticleInfo={setArticleInfo} articleName={name} upvotes={articleInfo.upvotes} />

        {article.content.map((para, key) => <p key={key}>{para}</p>)}
        <hr />
        <CommentList comments={articleInfo.comments} />
        <AddCommentForm articleName={name} setArticleInfo={setArticleInfo} />
        <h3>Other articles</h3>
        <ArticlesList articles={otherArticles} />
    </>)
}

export default ArticlePage;