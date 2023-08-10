import React, { useEffect, useState } from "react";
import ReviewsContext from "./ReviewsContext";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { confirm } from "react-confirm-box";

const ReviewsState = (props) => {
  const ownerToken = localStorage.getItem('token');
  const [reviews, setReviews] = useState([])
  const [apiResponseMessages, setApiResponseMessages] = useState([]);
  const initialValues = { review_description: "", review_owner: "", review_rating: "" };
  const [formValues, setFormValues] = useState(initialValues);

  //// Route 1 : This is useEffect , which calles everytime the page loads , it has State to display the clients List 

  useEffect(() => {

    /// Listing Clients 
    const fetchReviews = async () => {
      const getReviews = await axios.get(`http://localhost:5000/api/reviews/list`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "owner-token": ownerToken
        }
      });
      console.log(getReviews.data);
      return setReviews(getReviews.data);
    }
    fetchReviews();
  }, []);

  // Add Client State 

  const addReview = (text) => {
    const newReview = {
      review_description: text.review_description,
      review_owner: text.review_owner,
      review_rating: text.review_rating
    }
    axios.post('http://localhost:5000/api/reviews/create/', newReview, {
      headers: {
        'owner-token': ownerToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp => {
      console.log(resp.data._id);
      const newReview = {
        _id: resp.data._id,
        review_description: text.review_description,
        review_owner: text.review_owner,
        review_rating: text.review_rating       
      }
      {/* I managed "setInspectors" from my end to add immediate when successfully added into the database */ }
      setReviews((oldReviews) => {
        return [...oldReviews, newReview];
      })      
      ///return { message : text.review_description+" The New User has been successfully Added!!"};
      
      setApiResponseMessages(<div className="alert alert-success">
      <strong>Success! {text.review_description} </strong> The New User has been successfully Added!!
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

  const deleteReview = (getUserId) => {
    const userId = getUserId;
    //const result =  confirm("Are you sure?");
    const apiDelete = "http://localhost:5000/api/reviews/delete/" + userId;
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

        {/* I managed "setReviews" from my end to add immediate when successfully added into the database */ }
        setReviews((reviews) => {
          //alert("I am here in delete Immediate Statement")
          {/*return inspectors.filter((arrElem , _id) => { alert ('index:'+ _id +',inspectorId:'+inspectorId)
                        return _id !== inspectorId; 
              })*/}
          return reviews.filter((res) => res._id !== userId);
        })
      }).catch(error => {
        console.error('There was an error!', error);
      });
      const json = response.json;
      //listProducts()
    }
  }
  // Edit an Inspector 

  const editReview = (text, userId) => {

    console.log("I am in edit Text"+text.review_description);
    console.log("I am in edit client Id"+userId);
    console.log("I am checking ownerToken"+ownerToken);

    const newReview = {
      _id: userId,
      review_description: text.review_description,
      review_owner: text.review_owner,
      review_rating: text.review_rating
    }
    axios.put('http://localhost:5000/api/reviews/update/' + userId, newReview, {
      headers: {
        'owner-token': ownerToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp => {
      if (resp) {
        console.log(resp);
        {/* Managing for Edit */ }
        const updateReviews = reviews.map((user, index) => {
          //alert("I am in If condition of updatedInspectors"+index);
          if (user._id === userId) {
            // Increment the clicked counter
            return newReview;
          } else {
            // The rest haven't changed
            return user;
          }
        })
        console.log(updateReviews);
        setReviews(updateReviews);
      }
    }).catch(error => {
      console.error('There was an error!', error);
    });
    return 1;
  }

  /// Delete Multiple Clients 

  //for multiple deletion
  const deleteMultipleReviews = async (userIds) => {

    let userIdsr = { 'ids': userIds };
    let reviewsForRemove = JSON.stringify(userIdsr);
    //const inspectorIdsd = { ids : inspectorIds };
    //alert(typeof(inspectorIdsd));
    if (window.confirm("Do You Want To Delete Selected Clients")) {
      
        const res = await fetch("http://localhost:5000/api/reviews/deletemultiplereviews", {
          method: 'DELETE',
          body: reviewsForRemove,
          headers: {
            'owner-token': ownerToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(resp => {
            const updateReviews = reviews.filter((user) => !userIds.includes(user._id));
            setReviews(updateReviews);
        }).catch(error => {
          console.error('Error while deleting Multiple reviews', error);
        });
    }
  }

  return (
    <ReviewsContext.Provider value={{ setFormValues , formValues , reviews, addReview, deleteReview, editReview, deleteMultipleReviews, apiResponseMessages }}>
      {props.children}
    </ReviewsContext.Provider>

  )
}

export default ReviewsState;