import React , { useContext , useState } from 'react'
import AddArticles from './AddArticles.js'
import ArticlesContext from '../../context/articles/ArticlesContext.js'
import { useNavigate, useParams , Link } from "react-router-dom";
import Pagination from '../Products/Pagination';


const ListArticles = () => {
   
  const navigate = useNavigate();
  const params = useParams();
  const articleId = params.id;

  const context = useContext(ArticlesContext);
  const { articles ,  deleteArticle , deleteMultipleArticles} = context;
///// Paginationn by Products 

const [searchApiData, setSearchApiData] = useState([]);
const [articleCurrentPage, setArticlesCurrentPage] = useState(1);
const [articlePerPage, setArticlesPerPage] = useState(15);
const [currentPage, setCurrentPage] = useState(1);
const articlePaginate = pageNumber => setArticlesCurrentPage(pageNumber);
const [articleIds, setArticleIds] = useState([]);

// For Multiple Checkboxes

 //// For checkbox multiple deletes 

 const handleCheck = (e) => {
  const { value, checked } = e.target
  
  if (checked) {
    setArticleIds([...articleIds, value]);
  } else {
    setArticleIds(() => articleIds.filter((e) => e !== value));
  }
}

  if(articleId){
    //console.log("I am here before sending to edit"+users.article_title);
    return (
      <div>
          <AddArticles articleId = {articleId} articles = {articles} /> </div>
          )
  }else{
          
            // Get Current Clients
            const indexOfLastArticle = articleCurrentPage * articlePerPage;
            const indexOfFirstArticle = indexOfLastArticle - articlePerPage;
            const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);


              return (
                <div class="tab-pane fade show active" id="ntarget-1" role="tabpanel" aria-labelledby="ntab-1">
                <h4 class="heading-h4">!! Articles List !!</h4> { articleIds.length > 1 ? <input type="button" value="Delete ALL " onClick={() => deleteMultipleArticles(articleIds)}></input>  :  ''}
                <div class="table-container">
                    <table id="client-list" class="table table-bordered display">  
                        <thead>
                            <tr>                                                                    
                    <th> Name</th>
                                <th> Email ID</th>
                                <th> Mobile</th>
                                <th>Action</th>                                                                    
                            </tr>
                        </thead>  
                    <tbody>                 
                            
                            {currentArticles.map((article , index) => {
                              return (<tr>
                                <td>{articles.length}{article.article_title}</td>
                                <td>{article.article_description}</td>
                                <td>{article.article_author}</td>  
                                <td>
                                  <div class="btn-group">
                                  <span  class="btn btn-success btn-xs" onClick={() => navigate("/articles/" + article._id)}><i class="bi bi-pencil"></i></span>
                                  <Link  class="btn btn-danger btn-xs" onClick={() => deleteArticle(article._id)}><i class="bi bi-trash"></i></Link>
        
                                    <div className="col-sm"> <input type="checkBox" checked={articleIds.includes(article._id)} name={article._id} value={article._id} onClick={(e) => handleCheck(e)}></input></div>
                                  </div>
                                </td> 
                            
                            </tr>)
                            })} 
        
              </tbody>
              </table>
                </div>					
                             <Pagination setCurrentPage={setCurrentPage} currentPage={articleCurrentPage} postsPerPage={articlePerPage} totalPosts={articles.length} paginate={articlePaginate} />
        
        </div>
              )
  }          
}

export default ListArticles
