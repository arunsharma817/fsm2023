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

const Products = () => {
  const context = useContext(productsContext);
  const { products, listProducts,  getProduct } = context;
  const navigate = useNavigate();
  const params = useParams();
  const productId = params.id;
  const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb25zdWx0YW50cyI6eyJpZCI6IjY0OTQxYjJmNTMwZjY1Yzc0NzkwM2I4MyJ9LCJpYXQiOjE2ODc0Mjc5MTZ9._iF_uKOR8nN_qOWSEzFqNhBfUbq4kGlCC_XcYOGxT0o";
  const [formValues, setFormValues] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  
  // Pagination Variables
  const { data } = [
    {
      "_id": "64997832216584c2fad842a8",
      "product_name": "ooooooooooooooooo",
      "product_type": "ooooooooooooo",
      "product_capacity": "ooooooooooooooooooooo",
      "product_consultant_id": "64941b2f530f65c747903b83",
      "product_manufactured_date": "2023-06-26T11:36:18.409Z",
      "product_due_date": "2023-06-26T11:36:18.409Z",
      "__v": 0
    },
    {
      "_id": "64998a8e5a0ea29cfc3e89b0",
      "product_name": "AfterUseEffecta",
      "product_type": "AfterUseEffecta",
      "product_capacity": "AfterUseEffecta",
      "product_consultant_id": "64941b2f530f65c747903b83",
      "product_manufactured_date": "2023-06-26T12:54:38.887Z",
      "product_due_date": "2023-06-26T12:54:38.887Z",
      "__v": 0
    },
    {
      "_id": "6499947636e1a338d6cb7fb0",
      "product_name": "sddddddddddddd",
      "product_type": "aaaaaaaaddddddddddddddddddddddddddddaaaaaaa",
      "product_capacity": "aaaaaddddddddddddddddddddddddddddddddddaaaaaaaaaaaaaaa",
      "product_consultant_id": "64941b2f530f65c747903b83",
      "product_manufactured_date": "2023-06-26T13:36:54.601Z",
      "product_due_date": "2023-06-26T13:36:54.601Z",
      "__v": 0
    },
    {
      "_id": "6499975e579df75a39d548a6",
      "product_name": "errrrrrre",
      "product_type": "errrrrrrrrrrrr",
      "product_capacity": "errrrrrrrrrr",
      "product_consultant_id": "64941b2f530f65c747903b83",
      "product_manufactured_date": "2023-06-26T13:49:18.363Z",
      "product_due_date": "2023-06-26T13:49:18.363Z",
      "__v": 0
    },
    {
      "_id": "6499b7b1a57a8bb1bd8a6571",
      "product_name": "teeeeeeeeee",
      "product_type": "etertertre",
      "product_capacity": "eretertet",
      "product_consultant_id": "64941b2f530f65c747903b83",
      "product_manufactured_date": "2023-06-26T16:07:13.263Z",
      "product_due_date": "2023-06-26T16:07:13.263Z",
      "__v": 0
    },
    {
      "_id": "6499b7caa57a8bb1bd8a6575",
      "product_name": "xxxxxxxxxxxxxxxxxxxxx",
      "product_type": "xxxxxxxxxxxxxxxxxx",
      "product_capacity": "xxxxxxxxxxxxxxxxxxxxxxx",
      "product_consultant_id": "64941b2f530f65c747903b83",
      "product_manufactured_date": "2023-06-26T16:07:38.053Z",
      "product_due_date": "2023-06-26T16:07:38.053Z",
      "__v": 0
    },
    {
      "_id": "6499b7d9a57a8bb1bd8a6577",
      "product_name": "yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy",
      "product_type": "xxxxyyyyyyyyyyyyyxxxxxxxxxxxxxx",
      "product_capacity": "xxxxyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyxxxxxxxxxxxxxxxxxxx",
      "product_consultant_id": "64941b2f530f65c747903b83",
      "product_manufactured_date": "2023-06-26T16:07:53.811Z",
      "product_due_date": "2023-06-26T16:07:53.811Z",
      "__v": 0
    },
    {
      "_id": "649c3b47d137fdea6f2a05c1",
      "product_name": "erererererer",
      "product_type": "erereerere",
      "product_capacity": "ererere",
      "product_consultant_id": "64941b2f530f65c747903b83",
      "product_manufactured_date": "2023-06-28T13:53:11.298Z",
      "product_due_date": "2023-06-28T13:53:11.298Z",
      "__v": 0
    },
    {
      "_id": "649d5936702ceacbd02d1a32",
      "product_name": "ssssssssssssss",
      "product_type": "sssssssssssssssssssss",
      "product_capacity": "ssssssssssssssssss",
      "product_consultant_id": "64941b2f530f65c747903b83",
      "product_manufactured_date": "2023-06-29T10:13:10.347Z",
      "product_due_date": "2023-06-29T10:13:10.347Z",
      "__v": 0
    },
    {
      "_id": "649d5f48b47b87f6340e0c2a",
      "product_name": "yyyyyyyyyyyyyyyyy",
      "product_type": "yyyyyyyyyyyyy",
      "product_capacity": "yyyyyyyyyyyyyyyyy",
      "product_consultant_id": "64941b2f530f65c747903b83",
      "product_manufactured_date": "2023-06-29T10:39:04.547Z",
      "product_due_date": "2023-06-29T10:39:04.547Z",
      "__v": 0
    },
    {
      "_id": "649d6dc60e1807d0fc2b52ac",
      "product_name": "Fire Extinguisher 1",
      "product_type": "Fire Extinguisher 1",
      "product_capacity": "Fire Extinguisher 1",
      "product_consultant_id": "64941b2f530f65c747903b83",
      "product_manufactured_date": "2023-06-29T11:40:54.097Z",
      "product_due_date": "2023-06-29T11:40:54.097Z",
      "__v": 0
    }
  ];

  const [currentItems  , setCurrentItems ] = useState([]);
  const [pageCount , setPageCount ] = useState(0);
  const [itemOffset , setItemOffset ] = useState(0);
  const itemsPerPage = 6;

  const handleInputChange = (e) => {
    const { name, value } = e.target;   
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    listProducts()
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }

    //Pagination
    const endOffset = itemOffset + itemsPerPage;
    const { products } = data.slice(itemOffset, endOffset);
    setPageCount(Math.ceil(data.length / itemsPerPage ))
  }, [formErrors , itemOffset , itemsPerPage , data]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

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
        listProducts()
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
      listProducts()
    }
    console.log("You click No!");  
  }

  if (productId) {
    return (
      <div>
        {products.map((product) => {
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
    return (
      <div className="container my-3">
        <h2>Your Products</h2>
        <div className="container">
          {products.map((product) => {
            return (<div className="row align-items-center">
              <div className="col-sm">{product.product_name} </div>
              <div className="col-sm">   {product.product_capacity} </div>
              <div className="col-sm">  {product.product_type} </div>
              <div className="col-sm"><input type="button" id={product._id} value="Del" onClick={() => deleteProduct(product._id)} /></div>
              <div className="col-sm"><input type="button" id={product._id} value="Edit" onClick={() => navigate("/products/" + product._id)} /></div>

            </div>)
          })}
        </div>


        <ReactPaginate  
        breakLabel="..."  
        nextLabel="next >"  
        onPageChange={handlePageClick}  
        pageRangeDisplayed= {2}  
        pageCount={pageCount}  
        previousLabel="< previous"  
        renderOnZeroPageCount={null}
		containerClassName="pagination"
		pageLinkClassName="page-num"
		previousLinkClassName="page-num"
		nextLinkClassName="page-num"
		activeLinkClassName="active"
      />

      </div>
    )
  }
}

export default Products

