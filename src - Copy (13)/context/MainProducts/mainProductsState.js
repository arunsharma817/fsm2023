import React, { useEffect, useState } from "react";
import mainProductsContext from "./mainProductsContext";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { confirm } from "react-confirm-box";

const MainProductsState = (props) => {
const ownerToken = localStorage.getItem('token');
const [mainProducts, setMainProducts] = useState([])


  //// Route 1 : This is useEffect , which calles everytime the page loads , it has State to display the clients List 

  useEffect(() => {

    /// Listing Clients 
    const fetchMainProducts = async () => {
      const getMainProducts = await axios.get(`http://localhost:5000/api/mainproducts/list`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "owner-token": ownerToken
        }
      });
      console.log(getMainProducts.data);
      return setMainProducts(getMainProducts.data);
    }
    fetchMainProducts();
  }, []);

  // Add Client State 

  const addMainProducts = (text) => {
    const newMainProducts = {
      main_products_name: text.main_products_name,
      main_products_description: text.main_products_description,
      main_products_capacity: text.main_products_capacity
    }
    axios.post('http://localhost:5000/api/mainproducts/create/', newMainProducts, {
      headers: {
        'owner-token': ownerToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp => {
      console.log(resp.data._id);
      const newMainProducts = {
        _id: resp.data._id,
        main_products_name: text.main_products_name,
        main_products_description: text.main_products_description,
        main_products_capacity: text.main_products_capacity       
      }
      {/* I managed "setInspectors" from my end to add immediate when successfully added into the database */ }
      setMainProducts((oldMainProducts) => {
        return [...oldMainProducts, newMainProducts];
      })

    }).catch(error => {
      console.error('There was an error!', error);
    });
    return 1;
  }

  // Delete Client State 

  const deleteMainProducts = (getMainProductsId) => {
    const mainProductId = getMainProductsId;
    //const result =  confirm("Are you sure?");
    const apiDelete = "http://localhost:5000/api/mainproducts/delete/" + mainProductId;
    //alert("resule of Confirm"+result);  
    if (window.confirm('Are you sure, want to delete the selected Client?')) {
      console.log("You click yes!" + mainProductId);
      const response = fetch(apiDelete, {
        method: 'DELETE',
        headers: {
          'owner-token': ownerToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(resp => {

        {/* I managed "setMainProducts" from my end to add immediate when successfully added into the database */ }
        setMainProducts((mainProduct) => {
          //alert("I am here in delete Immediate Statement")
          {/*return inspectors.filter((arrElem , _id) => { alert ('index:'+ _id +',inspectorId:'+inspectorId)
                        return _id !== inspectorId; 
              })*/}
          return mainProducts.filter((res) => res._id !== mainProductId);
        })
      }).catch(error => {
        console.error('There was an error!', error);
      });
      const json = response.json;
      //listProducts()
    }
  }
  // Edit an Inspector 

  const editMainProducts = (text, mainProductId) => {

    console.log("I am in edit Text"+text.main_products_name);
    console.log("I am in edit client Id"+mainProductId);
    console.log("I am checking ownerToken"+ownerToken);

    const newMainProducts = {
      _id: mainProductId,
      main_products_name: text.main_products_name,
      main_products_description: text.main_products_description,
      main_products_capacity: text.main_products_capacity
    }
    axios.put('http://localhost:5000/api/mainproducts/update/' + mainProductId, newMainProducts, {
      headers: {
        'owner-token': ownerToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp => {
      if (resp) {
        console.log(resp);
        {/* Managing for Edit */ }
        const updatedMainProducts = mainProducts.map((mainProduct, index) => {
          //alert("I am in If condition of updatedInspectors"+index);
          if (mainProduct._id === mainProductId) {
            // Increment the clicked counter
            return newMainProducts;
          } else {
            // The rest haven't changed
            return mainProduct;
          }
        })
        console.log(updatedMainProducts);
        setMainProducts(updatedMainProducts);
      }
    }).catch(error => {
      console.error('There was an error!', error);
    });
    return 1;
  }

  /// Delete Multiple Clients 

  //for multiple deletion
  const deleteMultipleMainProducts = async (mainProductIds) => {

    let mainProductIdsr = { 'ids': mainProductIds };
    let mainProductsForRemove = JSON.stringify(mainProductIdsr);
    
    if (window.confirm("Do You Want To Delete Selected Clients")) {      
        const res = await fetch("http://localhost:5000/api/mainproducts/deletemultiplemainproducts", {
          method: 'DELETE',
          body: mainProductsForRemove,
          headers: {
            'owner-token': ownerToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(resp => {
                  const updatedMainProducts= mainProducts.filter((mainProduct) => !mainProductIds.includes(mainProduct._id));
                  setMainProducts(updatedMainProducts);
        }).catch(error => {
          console.error('There was an error!', error);
        });
    }
  }

  return (
    <mainProductsContext.Provider value={{ mainProducts, setMainProducts,  addMainProducts, deleteMainProducts, editMainProducts, deleteMultipleMainProducts }}>
      {props.children}
    </mainProductsContext.Provider>

  )
}

export default MainProductsState;