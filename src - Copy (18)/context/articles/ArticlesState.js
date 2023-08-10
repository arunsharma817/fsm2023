import React, { useEffect, useState } from "react";
import ArticlesContext from "./ArticlesContext";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { confirm } from "react-confirm-box";

const ArticlesState = (props) => {
  const ownerToken = localStorage.getItem('token');
  const [articles, setArticles] = useState([])
  const [apiResponseMessages, setApiResponseMessages] = useState([]);
  const initialValues = { article_title: "", article_description: "", article_author: "" };
  const [formValues, setFormValues] = useState(initialValues);

  //// Route 1 : This is useEffect , which calles everytime the page loads , it has State to display the clients List 

  useEffect(() => {

    /// Listing Clients 
    const fetchArticles = async () => {
      const getArticles = await axios.get(`http://localhost:5000/api/articles/list`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "owner-token": ownerToken
        }
      });
      console.log(getArticles.data);
      return setArticles(getArticles.data);
    }
    fetchArticles();
  }, []);

  // Add Client State 

  const addArticle = (text) => {
    const newArticle = {
      article_title: text.article_title,
      article_description: text.article_description,
      article_author: text.article_author
    }
    axios.post('http://localhost:5000/api/articles/create/', newArticle, {
      headers: {
        'owner-token': ownerToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp => {
      console.log(resp.data._id);
      const newArticle = {
        _id: resp.data._id,
        article_title: text.article_title,
        article_description: text.article_description,
        article_author: text.article_author       
      }
      {/* I managed "setInspectors" from my end to add immediate when successfully added into the database */ }
      setArticles((oldArticles) => {
        return [...oldArticles, newArticle];
      })      
      ///return { message : text.article_title+" The New User has been successfully Added!!"};
      
      setApiResponseMessages(<div className="alert alert-success">
      <strong>Success! {text.article_title} </strong> The New User has been successfully Added!!
      </div>);
      setFormValues(initialValues);
    }).catch(error => {
      console.error('There was an error!', "Error Name:"+error.name +" , Error Code :"+error.message );
      
      setApiResponseMessages(<div className="alert error">     
      <strong>Error!</strong>Error Name:{error.name} Error Code :{error.message}
    </div>);
      //return { message : 'There was an error!' };      
    });
   return 1;
  }

  // Delete Client State 

  const deleteArticle = (getUserId) => {
    const userId = getUserId;
    //const result =  confirm("Are you sure?");
    const apiDelete = "http://localhost:5000/api/articles/delete/" + userId;
    //alert("resule of Confirm"+result);  
    if (window.confirm('Are you sure, want to delete the selected Client?')) {
      console.log("You click yes!" + userId);
      const response = fetch(apiDelete, {
        method: 'DELETE',
        headers: {
          'owner-token': ownerToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(resp => {

        {/* I managed "setArticles" from my end to add immediate when successfully added into the database */ }
        setArticles((articles) => {
          //alert("I am here in delete Immediate Statement")
          {/*return inspectors.filter((arrElem , _id) => { alert ('index:'+ _id +',inspectorId:'+inspectorId)
                        return _id !== inspectorId; 
              })*/}
          return articles.filter((res) => res._id !== userId);
        })
      }).catch(error => {
        console.error('There was an error!', error);
      });
      const json = response.json;
      //listProducts()
    }
  }
  // Edit an Inspector 

  const editArticle = (text, userId) => {

    console.log("I am in edit Text"+text.article_title);
    console.log("I am in edit client Id"+userId);
    console.log("I am checking ownerToken"+ownerToken);

    const newArticle = {
      _id: userId,
      article_title: text.article_title,
      article_description: text.article_description,
      article_author: text.article_author
    }
    axios.put('http://localhost:5000/api/articles/update/' + userId, newArticle, {
      headers: {
        'owner-token': ownerToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp => {
      if (resp) {
        console.log(resp);
        {/* Managing for Edit */ }
        const updateArticles = articles.map((user, index) => {
          //alert("I am in If condition of updatedInspectors"+index);
          if (user._id === userId) {
            // Increment the clicked counter
            return newArticle;
          } else {
            // The rest haven't changed
            return user;
          }
        })
        console.log(updateArticles);
        setArticles(updateArticles);
      }
    }).catch(error => {
      console.error('There was an error!', error);
    });
    return 1;
  }

  /// Delete Multiple Clients 

  //for multiple deletion
  const deleteMultipleArticles = async (userIds) => {

    let userIdsr = { 'ids': userIds };
    let articlesForRemove = JSON.stringify(userIdsr);
    //const inspectorIdsd = { ids : inspectorIds };
    //alert(typeof(inspectorIdsd));
    if (window.confirm("Do You Want To Delete Selected Clients")) {
      
        const res = await fetch("http://localhost:5000/api/articles/delmultiplearticles", {
          method: 'DELETE',
          body: articlesForRemove,
          headers: {
            'owner-token': ownerToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(resp => {
            const updateArticles = articles.filter((user) => !userIds.includes(user._id));
            setArticles(updateArticles);
        }).catch(error => {
          console.error('Error while deleting Multiple articles', error);
        });
    }
  }

  return (
    <ArticlesContext.Provider value={{ setFormValues , formValues , articles, addArticle, deleteArticle, editArticle, deleteMultipleArticles, apiResponseMessages }}>
      {props.children}
    </ArticlesContext.Provider>

  )
}

export default ArticlesState;