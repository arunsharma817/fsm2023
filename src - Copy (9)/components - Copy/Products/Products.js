import React, { useContext, useEffect } from 'react'
import productsContext from '../../context/products/productsContext'
import Productitem from './Productsitem'
import Addproduct from './AddProduct'
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { confirm } from "react-confirm-box";
import ReactPaginate from 'react-paginate';
import Pagination from './Pagination'
import ListItems from './ListProducts'


const Products = () => {
  const context = useContext(productsContext);
  const { products, listProducts, getProduct } = context;
  const navigate = useNavigate();
  const params = useParams();
  const productId = params.id;
  const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb25zdWx0YW50cyI6eyJpZCI6IjY0OTQxYjJmNTMwZjY1Yzc0NzkwM2I4MyJ9LCJpYXQiOjE2ODc0Mjc5MTZ9._iF_uKOR8nN_qOWSEzFqNhBfUbq4kGlCC_XcYOGxT0o";
  const [formValues, setFormValues] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  /// pagination by Posts
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(15);
  const paginate = pageNumber => setCurrentPage(pageNumber);


///// Paginationn by Products 

 const [allProducts, setAllProducts] = useState([]);
 const [searchApiData, setSearchApiData] = useState([]);

 const [productsLoading, setProductsLoading] = useState(false);
 const [productsCurrentPage, setProductsCurrentPage] = useState(1);
 const [productsPerPage, setPoductsPerPage] = useState(15);
 const productPaginate = pageNumber => setProductsCurrentPage(pageNumber);

///search Product
const [searchProduct , setSearchProduct] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const inputEvent = (event) => {
    const data = event.target.value;
    console.log(data);
    setSearchProduct(data);
    //const resu = allProducts.filter(function(item) {
      //if(item.product_name == data){
       // console.log(item.product_name);
      //}
    //});
    if(data == ''){
      setAllProducts(searchApiData);
    } else {
      const filterResult = searchApiData.filter((product) => product.product_name.toLowerCase().includes(searchProduct));
      setAllProducts(filterResult);
    }
  };
  //console.log(res[0].product_name);
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    ///pagination by posts
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/products/list', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "consultant-token": authToken
        }
      });
      setPosts(res.data);
      setLoading(false);
    }
    fetchPosts();

    ///pagination by products
    const fetchProducts = async () => {
      setProductsLoading(true);
      const getProducts = await axios.get(`http://localhost:5000/api/products/list?q=${searchProduct}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "consultant-token": authToken
        }
      });
      setAllProducts(getProducts.data);
      setSearchApiData(getProducts.data);
      setProductsLoading(false);
    }
    fetchProducts();

    //listProducts()
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }


  }, [formErrors, searchProduct]);


  const validate = async (values) => {

    const errors = {};

    if (!values.product_name) {
      errors.product_name = "Product Name is required";
      console.log(errors.product_name);
    }
    if (!values.product_capacity) {
      errors.product_capacity = "Product Capacity is required";
      console.log(errors.product_capacity);
    }
    if (!values.product_type) {
      errors.product_type = "Product Type is required";
      console.log(errors.product_type);
    }
    //alert(errors.tag);
    if (values.product_name === "" || values.product_capacity === "" || values.product_type === "") {
      return errors;
    } {
      const text = {
        product_name: formValues.product_name,
        product_capacity: formValues.product_capacity,
        product_type: formValues.product_type
      }
      alert(authToken)
      if (productId) {
        await axios.put('http://localhost:5000/api/products/update/' + productId, text, {
          headers: {
            'consultant-token': authToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(resp => {
          if (resp) {
            navigate("/products/");
          }
        }).catch(error => {
          console.error('There was an error!', error);
        });
        //listProducts()
      }
    }
  };
 

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
      //listProducts()
    }
    console.log("You click No!");
  }

  if (productId) {
    
    return (
      <div>
        {allProducts.map((product) => {
          if (product._id === productId) {
            console.log("I am here in If Condition" + productId)
            return (<div className="container my-3">
              <div>
                <form onSubmit={handleSubmit}>
                  <label>Enter Product Name:
                    <input type="text" name="product_name" id="product_name" defaultValue={product.product_name} onChange={(e) => handleInputChange(e)} />
                  </label>
                  <p>{formErrors.product_name}</p>
                  <label>Enter product capacity:
                    <input type="text" name="product_capacity" id="product_capacity" defaultValue={product.product_capacity} onChange={(e) => handleInputChange(e)} />
                  </label>
                  <p>{formErrors.product_capacity}</p>
                  <label>Enter product type:
                    <input type="text" name="product_type" id="product_type" defaultValue={product.product_type} onChange={(e) => handleInputChange(e)} />
                  </label>
                  <p>{formErrors.product_type}</p>
                  <input type="submit" value="Update Product" />
                </form>
              </div>
            </div>
            )
          }
        })} </div>)
  } else {
    //console.log(posts);
     // Get Current Posts
     const indexOfLastPost = currentPage * postsPerPage;
     const indexOfFirstPost = indexOfLastPost - postsPerPage;
     const currentPosts = posts.slice(indexOfFirstPost ,indexOfLastPost);



       // Get Current Products
       const indexOfLastProduct = productsCurrentPage * productsPerPage;
      const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
      const currentProducts = allProducts.slice(indexOfFirstProduct ,indexOfLastProduct);
     
      
    return (
      <div className="container my-3">
        <input type="search" name="searchbox" value = {searchProduct} placeholder='Search Here' onChange={(e) => inputEvent(e)}/>
        <div className="container">
          {currentProducts.filter((product) => product.product_name.toLowerCase().includes(searchProduct)).map((product) => {
            return (<div className="row align-items-center">
              <div className="col-sm">{product.product_name} </div>
              <div className="col-sm">   {product.product_capacity} </div>
              <div className="col-sm">  {product.product_type} </div>
              <div className="col-sm"><input type="button" id={product._id} value="Del" onClick={() => deleteProduct(product._id)} /></div>
              <div className="col-sm"><input type="button" id={product._id} value="Edit" onClick={() => navigate("/products/" + product._id)} /></div>

            </div>)
          })}
        </div>

        <Pagination setCurrentPage = {setCurrentPage} currentPage = {productsCurrentPage} postsPerPage={productsPerPage} totalPosts={allProducts.length} paginate= {productPaginate}  />
{/*
          <h2>Your Products</h2>
        <div className="container">
          {currentPosts.map((post) => {
            return (<div className="row align-items-center">
              <div className="col-sm">{post.product_name} </div>
              <div className="col-sm">   {post.product_capacity} </div>
              <div className="col-sm">  {post.product_type} </div>
              <div className="col-sm"><input type="button" id={post._id} value="Del" onClick={() => deleteProduct(post._id)} /></div>
              <div className="col-sm"><input type="button" id={post._id} value="Edit" onClick={() => navigate("/products/" + post._id)} /></div>

            </div>)
          })}
        </div>
        <Pagination setCurrentPage = {setCurrentPage} currentPage = {currentPage} postsPerPage={postsPerPage} totalPosts={posts.length} paginate= {paginate}  />
        */}
        </div>
    )
  }
}

export default Products

