import React , {useEffect , useState} from 'react'
import { useNavigate , useParams} from "react-router-dom";
import { confirm } from "react-confirm-box";
import axios from 'axios';

const ListProducts = () => {
    const params = useParams();
    const productId = params.id;
    const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb25zdWx0YW50cyI6eyJpZCI6IjY0OTQxYjJmNTMwZjY1Yzc0NzkwM2I4MyJ9LCJpYXQiOjE2ODc0Mjc5MTZ9._iF_uKOR8nN_qOWSEzFqNhBfUbq4kGlCC_XcYOGxT0o";
    const [formErrors, setFormErrors] = useState({});

     /// pagination
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(5);
    const paginate = pageNumber => setCurrentPage(pageNumber);


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

      useEffect(() => {
        ///pagination
        const fetchProducts = async () => {
          setLoading(true);
          const res = await axios.get('http://localhost:5000/api/products/list', {
            method: 'GET',
            headers: {
              "Content-Type": "application/json",
              "consultant-token": authToken
            }
          });
          setProducts(res.data);
          setLoading(false);
        }      
        fetchProducts();     
    
      }, [formErrors]);
  
  const navigate = useNavigate();
  console.log(currentProducts);
   // Get Current Posts
   const indexOfLastProduct = currentPage * productsPerPage;
   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
   const currentProducts = products.slice(indexOfFirstProduct ,indexOfLastProduct);

  return (
    <div>
      <h2>Your Products</h2>
      <div className="container">
          {currentProducts.map((product) => {
            return (<div className="row align-items-center">
              <div className="col-sm">{product.product_name} </div>
              <div className="col-sm">   {product.product_capacity} </div>
              <div className="col-sm">  {product.product_type} </div>
              <div className="col-sm"><input type="button" id={product._id} value="Del" onClick={() => deleteProduct(product._id)} /></div>
              <div className="col-sm"><input type="button" id={product._id} value="Edit" onClick={() => navigate("/products/" + product._id)} /></div>

            </div>)
          })}
        </div>
    </div>
  )
}

export default ListProducts
