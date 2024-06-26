import React from 'react'
import { Link } from 'react-router-dom'
import articleContent from "./article-content"
// Componenets
import Articles from '../components/Articles'


const ArticlesList = () => {
  return (
    <div>
        <h1 className='sm:text-4xl text-2xl font-bolde my-6 text-gray-900'> Articles</h1>
        <div className='container py-4 mx-auto'>
            <div className='flex flex-wrap m-4'>
         <Articles articles={articleContent}/>  
    </div> 
    </div>
    </div>
)}

export default ArticlesList;