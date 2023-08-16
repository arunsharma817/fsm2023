import React , { useContext } from 'react'
import productsContext from '../../context/products/productsContext'
import { useNavigate, useParams } from "react-router-dom";

const Productsitem = (props) => {
  const navigate = useNavigate();
  const context = useContext(productsContext)
    const { product } = props;
    const { deleteProduct } = context;
  return (
    <div className="row align-items-center">
      <div className="col-sm">{product.product_name} </div>
      <div className="col-sm">   {product.product_capacity} </div>
      <div className="col-sm">  {product.product_type} </div>
      
      <div className="col-sm"><input type="button" id={product._id} value="Del" onClick={() => deleteProduct(product._id)} /></div>
      <div className="col-sm"><input type="button" id={product._id} value="Edit" onClick={() => navigate("/products/" + product._id)} /></div>
    </div>   
  )
}

export default Productsitem

