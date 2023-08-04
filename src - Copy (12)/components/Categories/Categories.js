import React , { useContext , useState } from 'react'
import AddCategory from './AddCategory.js'
import categoryContext from '../../context/categories/categoriesContext.js'
import { useNavigate, useParams } from "react-router-dom";
import Pagination from '../Products/Pagination';

const Categories = () => {   
  const navigate = useNavigate();
  const params = useParams();
  const categoryId = params.id;

  const context = useContext(categoryContext);
  const { categories , listCategories , deleteCategory , deleteMultipleCategories} = context;
///// Paginationn by Products 

const [searchApiData, setSearchApiData] = useState([]);
const [categoriesCurrentPage, setCategoriesCurrentPage] = useState(1);
const [categoriesPerPage, setCategoriesPerPage] = useState(15);
const [currentPage, setCurrentPage] = useState(1);
const categoryPaginate = pageNumber => setCategoriesCurrentPage(pageNumber);
const [categoryIds, setCategoryIds] = useState([]);

// For Multiple Checkboxes

 //// For checkbox multiple deletes 

 const handleCheck = (e) => {
  const { value, checked } = e.target
  
  if (checked) {
    setCategoryIds([...categoryIds, value]);
  } else {
      setCategoryIds(() => categoryIds.filter((e) => e !== value));
  }
}

  if(categoryId){
    return (
      <div>
          <AddCategory categoryId = {categoryId} categories = {categories} /> </div>
          )
  }else{
          
            // Get Current Products
            const indexOfLastCategory = categoriesCurrentPage * categoriesPerPage;
            const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
            const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);


              return (
                <div>
                    {/*
 {ids.length <= 1 ? (multiselect ?  :  : <button className='btn btn-danger fw-bold ms-2' onClick={deleteMultiple}>Delete All</button>}

                    <AddInspector inspectors={inspectors}/>*/}
                    
                    <div className ="row my-3">
                            <h2>Categories List { categoryIds.length > 1 ? <input type="button" value="Delete ALL " onClick={() => deleteMultipleCategories(categoryIds)}></input>  :  ''} </h2>
                            <div className="container">
                    {currentCategories.map((category, index) => {
                      return (<div className="row align-items-center">
                        <div className="col-sm">{categories.length}{category.category_name}</div>
                        <div className="col-sm">{category.category_code}</div>
                        <div className="col-sm">{category.category_description}</div>  

                      <div className="col-sm"><input type="button" id={index} value="Del" onClick={() => deleteCategory(category._id)} /> <input type="checkBox" name={category._id} value={category._id} onClick={(e) => handleCheck(e)}></input></div>
                      <div className="col-sm"><input type="button" id={category._id} value="Edit" onClick={() => navigate("/categories/" + category._id)} /></div>     
                        
                    
                    </div>)
                    })}
                  </div>
                    </div>
                    <Pagination setCurrentPage={setCurrentPage} currentPage={categoriesCurrentPage} postsPerPage={categoriesPerPage} totalPosts={categories.length} paginate={categoryPaginate} />
 
                </div>
              )
  }          
}

export default Categories
