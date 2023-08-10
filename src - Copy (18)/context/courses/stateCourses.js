import React, { useEffect, useState } from "react";
import contextCourses from "./contextCourses";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { confirm } from "react-confirm-box";

const StateCourses = (props) => {
  const ownerToken = localStorage.getItem('token');
  const [courses, setCourses] = useState([])
  const [apiResponseMessages, setApiResponseMessages] = useState([]);
  const initialValues = { course_title: "", course_description: "", course_author: "" };
  const [formValues, setFormValues] = useState(initialValues);

  //// Route 1 : This is useEffect , which calles everytime the page loads , it has State to display the Courses List 

  useEffect(() => {

    /// Listing Courses 
    const fetchCourses = async () => {
      const getCourses = await axios.get(`http://localhost:5000/api/courses/list`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "owner-token": ownerToken
        }
      });
      console.log(getCourses.data);
      return setCourses(getCourses.data);
    }
    fetchCourses();
  }, []);

  // Add Course State 

  const addCourse = (text) => {
    const newCourse = {
      course_title: text.course_title,
      course_description: text.course_description,
      course_author: text.course_author
    }
    axios.post('http://localhost:5000/api/courses/create/', newCourse, {
      headers: {
        'owner-token': ownerToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp => {
      console.log(resp.data._id);
      const newCourse = {
        _id: resp.data._id,
        course_title: text.course_title,
        course_description: text.course_description,
        course_author: text.course_author       
      }
      {/* I managed "setInspectors" from my end to add immediate when successfully added into the database */ }
      setCourses((oldCourses) => {
        return [...oldCourses, newCourse];
      })      
      ///return { message : text.course_title+" The New User has been successfully Added!!"};
      
      setApiResponseMessages(<div className="alert alert-success">
      <strong>Success! {text.course_title} </strong> The New User has been successfully Added!!
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

  // Delete Course State 

  const deleteCourse = (getCourseId) => {
    const courseId = getCourseId;
    //const result =  confirm("Are you sure?");
    const apiDelete = "http://localhost:5000/api/courses/delete/" + courseId;
    //alert("resule of Confirm"+result);  
    if (window.confirm('Are you sure, want to delete the selected Course?')) {
      console.log("You click yes!" + courseId);
      const response = fetch(apiDelete, {
        method: 'DELETE',
        headers: {
          'owner-token': ownerToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(resp => {

        {/* I managed "setCourses" from my end to add immediate when successfully added into the database */ }
        setCourses((courses) => {
          //alert("I am here in delete Immediate Statement")
          {/*return inspectors.filter((arrElem , _id) => { alert ('index:'+ _id +',inspectorId:'+inspectorId)
                        return _id !== inspectorId; 
              })*/}
          return courses.filter((res) => res._id !== courseId);
        })
      }).catch(error => {
        console.error('There was an error!', error);
      });
      const json = response.json;
      //listProducts()
    }
  }
  // Edit an Inspector 

  const editCourse = (text, courseId) => {

    console.log("I am in edit Text"+text.course_title);
    console.log("I am in edit Course Id"+courseId);
    console.log("I am checking ownerToken"+ownerToken);

    const newCourse = {
      _id: courseId,
      course_title: text.course_title,
      course_description: text.course_description,
      course_author: text.course_author
    }
    axios.put('http://localhost:5000/api/courses/update/' + courseId, newCourse, {
      headers: {
        'owner-token': ownerToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp => {
      if (resp) {
        console.log(resp);
        {/* Managing for Edit */ }
        const updateCourses = courses.map((course, index) => {
          //alert("I am in If condition of updatedInspectors"+index);
          if (course._id === courseId) {
            // Increment the clicked counter
            return newCourse;
          } else {
            // The rest haven't changed
            return course;
          }
        })
        console.log(updateCourses);
        setCourses(updateCourses);
      }
    }).catch(error => {
      console.error('There was an error!', error);
    });
    return 1;
  }

  /// Delete Multiple Courses 

  //for multiple deletion
  const deleteMultipleCourses = async (courseIds) => {

    let courseIdsr = { 'ids': courseIds };
    let coursesForRemove = JSON.stringify(courseIdsr);
    //const inspectorIdsd = { ids : inspectorIds };
    //alert(typeof(inspectorIdsd));
    if (window.confirm("Do You Want To Delete Selected Courses")) {
      
        const res = await fetch("http://localhost:5000/api/courses/deletemultiplecourses", {
          method: 'DELETE',
          body: coursesForRemove,
          headers: {
            'owner-token': ownerToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(resp => {
            const updateCourses = courses.filter((user) => !courseIds.includes(user._id));
            setCourses(updateCourses);
        }).catch(error => {
          console.error('Error while deleting Multiple courses', error);
        });
    }
  }

  return (
    <contextCourses.Provider value={{ setFormValues , formValues , courses, addCourse, deleteCourse, editCourse, deleteMultipleCourses, apiResponseMessages }}>
      {props.children}
    </contextCourses.Provider>

  )
}

export default StateCourses;