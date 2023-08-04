import React, { useEffect, useState } from "react";
import CategoriesContext from "./categoriesContext";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { confirm } from "react-confirm-box";

const CategoriesState = (props) => {
const ownerToken = localStorage.getItem('token');
const [categories, setCategories] = useState([]);

  useEffect(() => {

    /// Listing Employees 
    const fetchCategories = async () => {
      const getCategories = await axios.get(`http://localhost:5000/api/categories/list`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "owner-token": ownerToken
        }
      });
      console.log(getCategories.data);
      return setCategories(getCategories.data);
      //alert(listConsultants);
    }
    fetchCategories();
  }, []);

  // Add an Inspector
  const addCategory = (text) => {
   // alert(text.category_name + ownerToken);
    const newCategory = {
      category_name: text.category_name,
      category_code: text.category_code,
      category_description: text.category_description,
      category_consultant_id: '64941b2f530f65c747903b83'
    }
    axios.post('http://localhost:5000/api/categories/create/', newCategory, {
      headers: {
        'owner-token': ownerToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp => {
      console.log(resp.data._id);
      const newCategory = {
        _id: resp.data._id,
        category_name: text.category_name,
        category_code: text.category_code,
        category_description: text.category_description,
        category_consultant_id: '64941b2f530f65c747903b83'
      }
      {/* I managed "setCategories" from my end to add immediate when successfully added into the database */}
      setCategories((oldCategories) =>{
            return [...oldCategories,newCategory];
      })
      
    }).catch(error => {
      console.error('There was an error!', error);
    });
    return 1;
  }
 
  // Delete an Inspector 

  const deleteCategory = (getCategoryId) => {
    const categoryId = getCategoryId;
    //const result =  confirm("Are you sure?");
    const apiDelete = "http://localhost:5000/api/categories/delete/" + categoryId;  
    //alert("resule of Confirm"+result);  
    if (window.confirm('Are you sure, want to delete the selected Inspector?')) {
      console.log("You click yes!" + categoryId);
      const response =  fetch(apiDelete, {
        method: 'DELETE',
        headers: {
          'owner-token': ownerToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(resp => {
       
        {/* I managed "setCategories" from my end to add immediate when successfully added into the database */}
        setCategories((categories) =>{
          //alert("I am here in delete Immediate Statement")
              {/*return employees.filter((arrElem , _id) => { alert ('index:'+ _id +',employeeId:'+employeeId)
                        return _id !== employeeId; 
              })*/}
              return categories.filter((res) => res._id !== categoryId);

        })
      }).catch(error => {
        console.error('There was an error!', error);
      });
      const json = response.json;
      //listProducts()
    }
  }
    // Edit an Inspector 

    const editCategory = (text, categoryId) => {
      const newCategory = {
        _id: categoryId,
        category_name: text.category_name,
        category_code: text.category_code,
        category_description: text.category_description
      }
      axios.put('http://localhost:5000/api/categories/update/' + categoryId, newCategory, {
        headers: {
          'owner-token': ownerToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(resp => {
        if (resp) {
          console.log(resp);
          
          {/* Managing for Edit */}
        const updateCategories =  categories.map((category , index) => {
          //alert("I am in If condition of updateCategories"+index);
            if (category._id === categoryId) {             
              // Increment the clicked counter
              return newCategory;
            } else {
              // The rest haven't changed
              return category;
            }
          })
          console.log(updateCategories);
          setCategories(updateCategories);
        }
      }).catch(error => {
        console.error('There was an error!', error);
      });
      return 1;
    }

    /// Delete Multiple Inspectors 

    //for multiple deletion
  const deleteMultipleCategories = async (categoryIds) => {
    
    let categoryIdsr = { 'ids': categoryIds };
    let categoriesForRemove = JSON.stringify(categoryIdsr);
      
    if (window.confirm("Do You Want To Delete Selected Inspectors")) {
      
        await fetch("http://localhost:5000/api/categories/deletemultiplecategory", {     
          method: 'DELETE',
          body:  categoriesForRemove,     
          headers: {
            'owner-token': ownerToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          } 
        }).then((response) => response.json()).then((data) => {
            const updatedCategories = categories.filter(
              (category) => !categoryIds.includes(category._id)
              );
              setCategories(updatedCategories); 
        }).catch((error) => console.error('Error deleting tasks:', error));
    }
  }

    return (
      <CategoriesContext.Provider value={{ categories, addCategory, deleteCategory, editCategory , deleteMultipleCategories }}>
        {props.children}
      </CategoriesContext.Provider>

    )
  }

  export default CategoriesState;