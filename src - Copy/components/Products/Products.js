import React , { useContext, useEffect } from 'react'
import productsContext from '../../context/products/productsContext'
import Productitem from './Productsitem'
import Addproduct from './AddProduct'
import Editproduct from './EditProduct'
import { useNavigate, useParams } from "react-router-dom";


const Products = () => {
  const context = useContext(productsContext);
  const {products , listProducts , deleteProduct , getProduct , formValues } = context;

  const navigate = useNavigate();
  const params = useParams();
  const productId = params.id;    

  useEffect(() => {
      listProducts()
      //getProduct(productId)
  },[])

        if(productId){
          
          return ( <div className ="container my-3">
              <Addproduct />
           </div>   
          )
        }else{
          return (
            <div className ="container my-3">
              <Addproduct />
              <h2>Your Products</h2>      
              <div className="container">
                {products.map((product)=>{
                      //return <Productitem key={product._id} product={product} />
                      return (<div className="row align-items-center">
                      <div className="col-sm">{product.product_name} </div>
                      <div className="col-sm">   {product.product_capacity} </div>
                      <div className="col-sm">  {product.product_type} </div>                      
                      <div className="col-sm"><input type="button" id={product._id} value="Del" onClick={() => deleteProduct(product._id)} /></div>
                      <div className="col-sm"><input type="button" id={product._id} value="Edit" onClick={() => getProduct(product._id)} /></div>
                      <div className="col-sm"><input type="button" id={product._id} value="Edit Navigate" onClick={() => navigate("/products/"+product._id)} /></div>

                    </div>   )
                })}
              </div>
      
            </div>
          )
              }
}

export default Products
  
     