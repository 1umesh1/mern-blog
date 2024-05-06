import React, {useState} from 'react'
import { useParams } from 'react-router-dom'
import articleContent from './article-content'
import CommentsList from '../components/CommentsList'
import AddCommentForm from '../components/AddCommentForm'
//Pages
import NotFound from './NotFound'
//Components
import Articles from '../components/Articles'
import { useEffect } from 'react'

const Article = () => {
    const {name} = useParams();
    const article = articleContent.find((article)=> article.name===name); 
   const [articleInfo, setArticleInfo] = useState({comments:[]});

//    useEffect(()=> {
//     const fetchdata = async()=>{
//         const result = await fetch(`/api/articles/${name}`
//         , {  
//             headers: {  
//               Accept: "application/json"  
//             }});
//         const body= await result.json();
//         console.log(body);
//         setArticleInfo(body);
//     }; fetchdata()},[name]);


useEffect(() => {
    const fetchData = async () => {
        try {
            const result = await fetch(`/api/articles/${name}`, {
                headers: {
                    Accept: "application/json"
                }
            });
            
            if (!result.ok) {
                throw new Error('Failed to fetch data');
            }
            
            const contentType = result.headers.get('content-type');
            
            if (contentType && contentType.includes('application/json')) {
                const body = await result.json();
                console.log(body);
                if (Array.isArray(body)) {
                    setArticleInfo(body);
                } else {
                    throw new Error('Response is not an array');
                }
            } else {
                throw new Error('Response is not in JSON format');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle the error here
        }
    };

    fetchData();

    // Clean up function
    return () => {
        // Cleanup code here if needed
    };
}, [name]);



    if(!article){
        return <NotFound/>
     }
     const otherArticles = articleContent.filter(article=> article.name!== name)
  return (
    <> 
        <h1 className='sm:text-4xl text-2xl font-bold my-6 text-gray-900'> 
        {article.title}</h1>
    {article.content.map((paragraph,index) => (
        <p className='mx-auto leading-relaxed text-base mb-4' key={index}>
            {paragraph}
        </p>
       
    ))}
    <CommentsList comments={articleInfo.comments}/>
    <AddCommentForm articleName={name} setArticleInfo={setArticleInfo}/>
    <h1 className='sm:text-2xl text-xl font-bold my-4 text-gray-900'> Other Articles</h1>
    <div className='flex flex-wrap -m-4'>
        <Articles articles={otherArticles}/>

    </div>



     </>
  )
}

export default Article