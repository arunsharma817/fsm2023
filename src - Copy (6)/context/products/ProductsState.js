import React , { useState , useEffect } from "react";
import ProductsContext from "./productsContext";
import axios from 'axios';
import { confirm } from "react-confirm-box";

const ProductsState = (props) => {
  const [products, setProducts] = useState([])
  const [formValues, setFormValues] = useState([])



  const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb25zdWx0YW50cyI6eyJpZCI6IjY0OTQxYjJmNTMwZjY1Yzc0NzkwM2I4MyJ9LCJpYXQiOjE2ODc0Mjc5MTZ9._iF_uKOR8nN_qOWSEzFqNhBfUbq4kGlCC_XcYOGxT0o";
  
  //useEffect(()=> {
  //  axios.get('http://localhost:5000/api/products/list', { headers: { "Content-Type" : "application/json","consultant-token": authToken } }).then((res) => {
  //  setProducts(res.data);       
  //  })},[]);

    const listProducts = async () =>{
      const response = await fetch('http://localhost:5000/api/products/list',{
              method: 'GET',
              headers:{
                "Content-Type" : "application/json",
                "consultant-token": authToken 
              } 
      });
      const json = await response.json();
      setProducts(json)
    }

    const getProduct = async (productid) =>{
      const productId = productid;
      const res =   await  axios.get('http://localhost:5000/api/products/getProduct/'+productId,  {
        headers: {
          'consultant-token': authToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      const singleProduct =  res.data;
      //return //singleProduct;
      //const json = await res.json();
      console.log("I am in Axis AddProduct"+singleProduct.product_name);
      const ProductValues = { product_name: singleProduct.product_name, product_capacity: singleProduct.product_capacity, product_type: singleProduct.product_type };
      console.log(ProductValues);
      setFormValues(ProductValues);
    }

    const deleteProduct = async (productid) => {
      const productId = productid;
      const result = await confirm("Are you sure?");
      const apiDelete = "http://localhost:5000/api/products/delete/" + productId;
      if (result) {
        console.log("You click yes!" + productId);     
  
        const response = await fetch(apiDelete, {
          method: 'DELETE',
          headers: {
            'consultant-token': authToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        const json = response.json;
        console.log(json);
      }
      console.log("You click No!");  
    }

    return(
        <ProductsContext.Provider value={{ products , listProducts , deleteProduct , getProduct, formValues }}>
            {props.children}
        </ProductsContext.Provider>
    )  
}





export default ProductsState;