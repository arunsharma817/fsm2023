import React, { useEffect, useState } from "react";
import SocialLinksContext from "./SocialLinksContext";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { confirm } from "react-confirm-box";

const SocialLinksState = (props) => {
  const ownerToken = localStorage.getItem('token');
  const [socialLinks, setSocialLinks] = useState([])
  const [apiResponseMessages, setApiResponseMessages] = useState([]);
  const initialValues = { social_link_title: "", social_link_icon: "", social_link_source_url: "" };
  const [formValues, setFormValues] = useState(initialValues);

  //// Route 1 : This is useEffect , which calles everytime the page loads , it has State to display the clients List 

  useEffect(() => {

    /// Listing Clients 
    const fetchSocialLinks = async () => {
      const getSocialLinks = await axios.get(`http://localhost:5000/api/sociallinks/list`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "owner-token": ownerToken
        }
      });
      console.log("getting data in list"+getSocialLinks.data);
      //{getSocialLinks.data}
      //res.json(getSocialLinks.data);
      return setSocialLinks(getSocialLinks.data);
    }
    fetchSocialLinks();
  }, []);

  // Add Client State 

  const addSocialLinks = (text) => {
    const newSocialLink = {
      social_link_title: text.social_link_title,
      social_link_icon: text.social_link_icon,
      social_link_source_url: text.social_link_source_url
    }
    axios.post('http://localhost:5000/api/sociallinks/create/', newSocialLink, {
      headers: {
        'owner-token': ownerToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp => {
      console.log(resp.data._id);
      const newSocialLink = {
        _id: resp.data._id,
        social_link_title: text.social_link_title,
        social_link_icon: text.social_link_icon,
        social_link_source_url: text.social_link_source_url       
      }
      {/* I managed "setInspectors" from my end to add immediate when successfully added into the database */ }
      setSocialLinks((oldSocialLinks) => {
        return [...oldSocialLinks, newSocialLink];
      })      
      ///return { message : text.social_link_title+" The New User has been successfully Added!!"};
      
      setApiResponseMessages(<div className="alert alert-success">
      <strong>Success! {text.social_link_title} </strong> The New Society Member has been successfully Added!!
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

  const deleteSocialLinks = (getSocialLinkId) => {
    const socialLinkId = getSocialLinkId;
    //const result =  confirm("Are you sure?");
    const apiDelete = "http://localhost:5000/api/sociallinks/delete/" + socialLinkId;
    //alert("resule of Confirm"+result);  
    if (window.confirm('Are you sure, want to delete the selected Client?')) {
      console.log("You click yes!" + socialLinkId);
      const response = fetch(apiDelete, {
        method: 'DELETE',
        headers: {
          'owner-token': ownerToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(resp => {

        {/* I managed "setSocialLinks" from my end to add immediate when successfully added into the database */ }
        setSocialLinks((sociallinks) => {
          //alert("I am here in delete Immediate Statement")
          {/*return inspectors.filter((arrElem , _id) => { alert ('index:'+ _id +',inspectorId:'+inspectorId)
                        return _id !== inspectorId; 
              })*/}
          return sociallinks.filter((res) => res._id !== socialLinkId);
        })
      }).catch(error => {
        console.error('There was an error!', error);
      });
      const json = response.json;
      //listProducts()
    }
  }
  // Edit an Inspector 

  const editSocialLinks = (text, socialLinkId) => {

    console.log("I am in edit Text"+text.social_link_title);
    console.log("I am in edit client Id"+socialLinkId);
    console.log("I am checking ownerToken"+ownerToken);

    const newSocialLink = {
      _id: socialLinkId,
      social_link_title: text.social_link_title,
      social_link_icon: text.social_link_icon,
      social_link_source_url: text.social_link_source_url
    }
    axios.put('http://localhost:5000/api/sociallinks/update/' + socialLinkId, newSocialLink, {
      headers: {
        'owner-token': ownerToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp => {
      if (resp) {
        console.log(resp);
        {/* Managing for Edit */ }
        const updateSocialLinks = socialLinks.map((socialLink, index) => {
          //alert("I am in If condition of updatedInspectors"+index);
          if (socialLink._id === socialLinkId) {
            // Increment the clicked counter
            return newSocialLink;
          } else {
            // The rest haven't changed
            return socialLink;
          }
        })
        console.log(updateSocialLinks);
        setSocialLinks(updateSocialLinks);
      }
    }).catch(error => {
      console.error('There was an error!', error);
    });
    return 1;
  }

  /// Delete Multiple Clients 

  //for multiple deletion
  const deleteMultipleSocialLinks = async (socialLinkIds) => {

    let socialLinkIdsr = { 'ids': socialLinkIds };
    let socialLinksForRemove = JSON.stringify(socialLinkIdsr);
    //const inspectorIdsd = { ids : inspectorIds };
    //alert(typeof(inspectorIdsd));
    if (window.confirm("Do You Want To Delete Selected Clients")) {
      
        const res = await fetch("http://localhost:5000/api/sociallinks/deleteMultipleSocialLinks", {
          method: 'DELETE',
          body: socialLinksForRemove,
          headers: {
            'owner-token': ownerToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(resp => {
            const updateSocialLinks = socialLinks.filter((socialLink) => !socialLinkIds.includes(socialLink._id));
            setSocialLinks(updateSocialLinks);
        }).catch(error => {
          console.error('Error while deleting Multiple Society Members', error);
        });
    }
  }

  return (
    <SocialLinksContext.Provider value={{ setFormValues , formValues , socialLinks, setSocialLinks, addSocialLinks, deleteSocialLinks, editSocialLinks, deleteMultipleSocialLinks, apiResponseMessages }}>
      {props.children}
    </SocialLinksContext.Provider>

  )
}

export default SocialLinksState;