import React, { useEffect, useState } from "react";
import BuildingMembersContext from "./BuildingMembersContext";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { confirm } from "react-confirm-box";

const BuildingMembersState = (props) => {
  const ownerToken = localStorage.getItem('token');
  const [buildingMembers, setBuildingMembers] = useState([])
  const [apiResponseMessages, setApiResponseMessages] = useState([]);
  const initialValues = { building_member_fname: "", building_member_lname: "", building_member_mobile: "" };
  const [formValues, setFormValues] = useState(initialValues);

  //// Route 1 : This is useEffect , which calles everytime the page loads , it has State to display the clients List 

  useEffect(() => {

    /// Listing Clients 
    const fetchBuildingMembers = async () => {
      const getBuildingMembers = await axios.get(`http://localhost:5000/api/buildingmembers/list`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "owner-token": ownerToken
        }
      });
      console.log(getBuildingMembers.data);
      return setBuildingMembers(getBuildingMembers.data);
    }
    fetchBuildingMembers();
  }, []);

  // Add Client State 

  const addBuildingMembers = (text) => {
    const newBuildingMember = {
      building_member_fname: text.building_member_fname,
      building_member_lname: text.building_member_lname,
      building_member_mobile: text.building_member_mobile
    }
    axios.post('http://localhost:5000/api/buildingmembers/create/', newBuildingMember, {
      headers: {
        'owner-token': ownerToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp => {
      console.log(resp.data._id);
      const newBuildingMember = {
        _id: resp.data._id,
        building_member_fname: text.building_member_fname,
        building_member_lname: text.building_member_lname,
        building_member_mobile: text.building_member_mobile       
      }
      {/* I managed "setInspectors" from my end to add immediate when successfully added into the database */ }
      setBuildingMembers((oldBuildingMembers) => {
        return [...oldBuildingMembers, newBuildingMember];
      })      
      ///return { message : text.building_member_fname+" The New User has been successfully Added!!"};
      
      setApiResponseMessages(<div className="alert alert-success">
      <strong>Success! {text.building_member_fname} </strong> The New Building Member has been successfully Added!!
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

  const deleteBuildingMembers = (getBuildingMemberId) => {
    const buildingMemberId = getBuildingMemberId;
    //const result =  confirm("Are you sure?");
    const apiDelete = "http://localhost:5000/api/buildingmembers/delete/" + buildingMemberId;
    //alert("resule of Confirm"+result);  
    if (window.confirm('Are you sure, want to delete the selected Client?')) {
      console.log("You click yes!" + buildingMemberId);
      const response = fetch(apiDelete, {
        method: 'DELETE',
        headers: {
          'owner-token': ownerToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(resp => {

        {/* I managed "setBuildingMembers" from my end to add immediate when successfully added into the database */ }
        setBuildingMembers((buildingmembers) => {
          //alert("I am here in delete Immediate Statement")
          {/*return inspectors.filter((arrElem , _id) => { alert ('index:'+ _id +',inspectorId:'+inspectorId)
                        return _id !== inspectorId; 
              })*/}
          return buildingmembers.filter((res) => res._id !== buildingMemberId);
        })
      }).catch(error => {
        console.error('There was an error!', error);
      });
      const json = response.json;
      //listProducts()
    }
  }
  // Edit an Inspector 

  const editBuildingMembers = (text, buildingMemberId) => {

    console.log("I am in edit Text"+text.building_member_fname);
    console.log("I am in edit client Id"+buildingMemberId);
    console.log("I am checking ownerToken"+ownerToken);

    const newBuildingMember = {
      _id: buildingMemberId,
      building_member_fname: text.building_member_fname,
      building_member_lname: text.building_member_lname,
      building_member_mobile: text.building_member_mobile
    }
    axios.put('http://localhost:5000/api/buildingmembers/update/' + buildingMemberId, newBuildingMember, {
      headers: {
        'owner-token': ownerToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp => {
      if (resp) {
        console.log(resp);
        {/* Managing for Edit */ }
        const updateBuildingMembers = buildingMembers.map((buildingMember, index) => {
          //alert("I am in If condition of updatedInspectors"+index);
          if (buildingMember._id === buildingMemberId) {
            // Increment the clicked counter
            return newBuildingMember;
          } else {
            // The rest haven't changed
            return buildingMember;
          }
        })
        console.log(updateBuildingMembers);
        setBuildingMembers(updateBuildingMembers);
      }
    }).catch(error => {
      console.error('There was an error!', error);
    });
    return 1;
  }

  /// Delete Multiple Clients 

  //for multiple deletion
  const deleteMultipleBuildingMembers = async (buildingMemberIds) => {

    let buildingMemberIdsr = { 'ids': buildingMemberIds };
    let buildingMembersForRemove = JSON.stringify(buildingMemberIdsr);
    //const inspectorIdsd = { ids : inspectorIds };
    //alert(typeof(inspectorIdsd));
    if (window.confirm("Do You Want To Delete Selected Clients")) {
      
        const res = await fetch("http://localhost:5000/api/buildingmembers/deletemultiplebuildingmembers", {
          method: 'DELETE',
          body: buildingMembersForRemove,
          headers: {
            'owner-token': ownerToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(resp => {
            const updateBuildingMembers = buildingMembers.filter((buildingMember) => !buildingMemberIds.includes(buildingMember._id));
            setBuildingMembers(updateBuildingMembers);
        }).catch(error => {
          console.error('Error while deleting Multiple Building Members', error);
        });
    }
  }

  return (
    <BuildingMembersContext.Provider value={{ setFormValues , formValues , buildingMembers, setBuildingMembers, addBuildingMembers, deleteBuildingMembers, editBuildingMembers, deleteMultipleBuildingMembers, apiResponseMessages }}>
      {props.children}
    </BuildingMembersContext.Provider>

  )
}

export default BuildingMembersState;