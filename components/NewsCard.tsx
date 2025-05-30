
import React from 'react';
import { NewsArticle } from '../types';
import { ExternalLinkIcon } from './IconComponents';

interface NewsCardProps {
  article: NewsArticle;
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  return (
    <div className="bg-gray-700 p-4 rounded-lg shadow-md hover:bg-gray-650 transition-colors duration-150">
      <h4 className="text-md font-semibold text-blue-300 mb-1">{article.headline}</h4>
      <p className="text-xs text-gray-400 mb-2">
        {article.source} - {new Date(article.date).toLocaleDateString()}
      </p>
      <a
        href={article.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300 hover:underline"
      >
        Read more
        <ExternalLinkIcon />
      </a>
    </div>
  );
};

export default NewsCard;
