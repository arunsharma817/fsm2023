import React , { useContext , useState } from 'react'
import AddMainProductsForm from './AddMainProductsForm.js'
import mainProductsContext from '../../context/MainProducts/mainProductsContext.js'
import { useNavigate, useParams } from "react-router-dom";
import Pagination from '../Products/Pagination';


const MainProducts = () => {
   
  const navigate = useNavigate();
  const params = useParams();
  const mainProductId = params.id;

  const context = useContext(mainProductsContext);
  const { mainProducts ,  deleteMainProducts , deleteMultipleMainProducts} = context;

///// Paginationn by Products 

const [searchApiData, setSearchApiData] = useState([]);
const [mainProductsCurrentPage, setMainProductsCurrentPage] = useState(1);
const [mainProductsPerPage, setMainProductsPerPage] = useState(15);
const [currentPage, setCurrentPage] = useState(1);
const mainProductsPaginate = pageNumber => setMainProductsCurrentPage(pageNumber);
const [mainProductsIds, setMainProductsIds] = useState([]);

// For Multiple Checkboxes

 //// For checkbox multiple deletes 

 const handleCheck = (e) => {
  const { value, checked } = e.target
  
  if (checked) {
    setMainProductsIds([...mainProductsIds, value]);
  } else {
    setMainProductsIds(() => mainProductsIds.filter((e) => e !== value));
  }
}
  if(mainProductId){
    console.log("I am here before sending to edit"+mainProductId);
    return (
      <div>
          <AddMainProductsForm mainProductId = {mainProductId} mainProducts= {mainProducts} /> </div>
          )
  }else{
          
            // Get Current Clients
            const indexOfMainProducts = mainProductsCurrentPage * mainProductsPerPage;
            const indexOfFirstMainProducts = indexOfMainProducts - mainProductsPerPage;
            const currentMainProducts = mainProducts.slice(indexOfFirstMainProducts, indexOfMainProducts);

              return (
                <div>                    
                    <div className ="row my-3">
                            <h2>Products List { mainProductsIds.length > 1 ? <input type="button" value="Delete ALL " onClick={() => deleteMultipleMainProducts(mainProductsIds)}></input>  :  ''} </h2>
                            <div className="container">
                    {currentMainProducts.map((mainProduct , index) => {
                      return (<div className="row align-items-center">
                        <div className="col-sm">{mainProducts.length}{mainProduct.main_products_name}</div>
                        <div className="col-sm">{mainProduct.main_products_description}</div>
                        <div className="col-sm">{mainProduct.main_products_capacity}</div>  

                      <div className="col-sm"><input type="button" id={index} value="Del" onClick={() => deleteMainProducts(mainProduct._id)} /> <input type="checkBox" name={mainProduct._id} value={mainProduct._id} onClick={(e) => handleCheck(e)}></input></div>
                      <div className="col-sm"><input type="button" id={mainProduct._id} value="Edit" onClick={() => navigate("/mainproducts/" + mainProduct._id)} /></div>  
                        
                    
                    </div>)
                    })}
                  </div>
                    </div>
                    <Pagination setCurrentPage={setCurrentPage} currentPage={mainProductsCurrentPage} postsPerPage={mainProductsPerPage} totalPosts={mainProducts.length} paginate={mainProductsPaginate} />
 
                </div>
              )
  }          
}

export default MainProducts
