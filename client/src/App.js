//Pages
import Home from './pages/Home'; 
import About from './pages/About';
import Article from './pages/Article';
import ArticlesList from './pages/ArticlesList';
import Navbar from './components/Navbar';
import NotFound from './pages/NotFound';

import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';


function App() {
  return (
    <Router>  
      <Navbar/>  
    <div className="max-w-screen-md mx-auto pt-20">
      <Routes>
        <Route path='/' element={<Home/>} /> 
        <Route path='/article/:name' element={<Article/>} />
        <Route path='/articles' element={<ArticlesList/>} />
        <Route path='/about' element={<About/>} />
        <Route path='*' element={<NotFound/>} />
      </Routes>
     
    </div>
    </Router>
  );
}

export default App;
