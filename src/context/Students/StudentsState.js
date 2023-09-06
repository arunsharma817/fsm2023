import React, { useEffect, useState } from "react";
import StudentsContext from "./StudentsContext";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { confirm } from "react-confirm-box";

const StudentsState = (props) => {
  const ownerToken = localStorage.getItem('token');
  const [students, setStudents] = useState([])
  const [apiResponseMessages, setApiResponseMessages] = useState([]);

  const initialValues = {
    "student_fname": "",
    "student_lname": "",
    "student_father_name": "",
    "student_mother_name": "",
    "student_age": "",
    "student_grade": "",
    "student_section": "",
    "student_parrent_email":"",
    "student_parrent_mobile": "",
    "student_gaurdian_mobile": "",
    "student_blood_group": "",
    "student_dob": "",
    "student_address": "",
    "student_city": "",
    "student_state": "",
    "student_country": "",
    "student_continent": "",
    "student_admission_date": "",
    "student_father_occupation": "",
    "student_mother_occupation": "",
    "student_mother_income": "",
"student_father_income": "",
    "student_photo": "",
    "student_interests": "",
    "student_male_female": "",
    "student_class_teacher": "",
    "student_stream": "",
    "student_medium": "",
    "student_board": "",
    "student_uniform": "",
    "student_books": "",
    "student_bag": "",
    "student_mess": "",
    "student_transportation": "",
    "student_foreign_tour": "",
    "student_domestic_tour": "",
    "student_annual_function": "",
    "student_hod": "",
    "student_attendance": "",
    "student_health": "",
    "student_achievements": "",
    "student_technical_skills": ""
 };
   const [formValues, setFormValues] = useState(initialValues);

  //// Route 1 : This is useEffect , which calles everytime the page loads , it has State to display the clients List 

  useEffect(() => {

    /// Listing Clients 
    const fetchStudents = async () => {
      const getStudents = await axios.get(`http://localhost:5000/api/students/list`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "owner-token": ownerToken
        }
      });
      console.log(getStudents.data);
      return setStudents(getStudents.data);
    }
    fetchStudents();
  }, []);

  // Add Client State 

  const addStudents = (text) => {
     const newManufacturer = {     
      student_fname: text.student_fname,
            student_lname: text.student_lname,
            student_father_name: text.student_father_name,
			student_mother_name: text.student_mother_name,
            student_age: text.student_age,
            student_grade: text.student_grade,
            student_section: text.student_section,
			student_parrent_email: text.student_parrent_email,
            student_parrent_mobile: text.student_parrent_mobile,
			student_gaurdian_mobile: text.student_gaurdian_mobile,
            student_blood_group: text.student_blood_group,
            student_dob: text.student_dob,	
			student_address: text.student_address,
			student_city: text.student_city,
            student_state: text.student_state,
            student_country: text.student_country,
			student_continent: text.student_continent,
			student_admission_date: text.student_admission_date,
            student_father_occupation: text.student_father_occupation,
            student_mother_occupation: text.student_mother_occupation,
			student_mother_income: text.student_mother_income,
			student_father_income: text.student_father_income,
            student_photo: text.student_photo,
            student_interests: text.student_interests,	
			student_male_female: text.student_male_female,
			student_class_teacher: text.student_class_teacher,
            student_stream: text.student_stream,
            student_medium: text.student_medium,
			student_board: text.student_board,
			student_uniform: text.student_uniform,
            student_books: text.student_books,
            student_bag: text.student_bag,
			student_mess: text.student_mess,
			student_transportation: text.student_transportation,
            student_foreign_tour: text.student_foreign_tour,
            student_domestic_tour: text.student_domestic_tour,
			student_annual_function: text.student_annual_function,
			student_hod: text.student_hod,
            student_attendance: text.student_attendance,
            student_health: text.student_health,
			student_achievements: text.student_achievements,
            student_technical_skills: text.student_technical_skills
    }
    axios.post('http://localhost:5000/api/students/create', newManufacturer, {
      headers: {
        'owner-token': ownerToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp => {
      console.log(resp.data._id);
      const newManufacturers = {
        _id: resp.data._id,
        student_fname: text.student_fname,
            student_lname: text.student_lname,
            student_father_name: text.student_father_name,
			      student_mother_name: text.student_mother_name,
            student_age: text.student_age,
            student_grade: text.student_grade,
            student_section: text.student_section,
			student_parrent_email: text.student_parrent_email,
            student_parrent_mobile: text.student_parrent_mobile,
			student_gaurdian_mobile: text.student_gaurdian_mobile,
            student_blood_group: text.student_blood_group,
            student_dob: text.student_dob,	
			student_address: text.student_address,
			student_city: text.student_city,
            student_state: text.student_state,
            student_country: text.student_country,
			student_continent: text.student_continent,
			student_admission_date: text.student_admission_date,
            student_father_occupation: text.student_father_occupation,
            student_mother_occupation: text.student_mother_occupation,
			student_mother_income: text.student_mother_income,
			student_father_income: text.student_father_income,
            student_photo: text.student_photo,
            student_interests: text.student_interests,	
			student_male_female: text.student_male_female,
			student_class_teacher: text.student_class_teacher,
            student_stream: text.student_stream,
            student_medium: text.student_medium,
			student_board: text.student_board,
			student_uniform: text.student_uniform,
            student_books: text.student_books,
            student_bag: text.student_bag,
			student_mess: text.student_mess,
			student_transportation: text.student_transportation,
            student_foreign_tour: text.student_foreign_tour,
            student_domestic_tour: text.student_domestic_tour,
			student_annual_function: text.student_annual_function,
			student_hod: text.student_hod,
            student_attendance: text.student_attendance,
            student_health: text.student_health,
			student_achievements: text.student_achievements,
            student_technical_skills: text.student_technical_skills       
      }
      {/* I managed "setInspectors" from my end to add immediate when successfully added into the database */ }
      setStudents((oldStudents) => {
        return [...oldStudents, newManufacturers];
      })      
      ///return { message : text.student_lname+" The New User has been successfully Added!!"};
      
      setApiResponseMessages(<div className="alert alert-success">
      <strong> <pre>{JSON.stringify(newManufacturers, null, 2)}</pre>Success! {text.student_fname} </strong> The New Manufacturer has been successfully Added!!
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

  const deleteStudents = (getManufacturerId) => {
    const studentId = getManufacturerId;
    //const result =  confirm("Are you sure?");
    const apiDelete = "http://localhost:5000/api/students/delete/" + studentId;
    //alert("resule of Confirm"+result);  
    if (window.confirm('Are you sure, want to delete the selected Client?')) {
      console.log("You click yes!" + studentId);
      const response = fetch(apiDelete, {
        method: 'DELETE',
        headers: {
          'owner-token': ownerToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(resp => {

        {/* I managed "setStudents" from my end to add immediate when successfully added into the database */ }
        setStudents((students) => {
          //alert("I am here in delete Immediate Statement")
          {/*return inspectors.filter((arrElem , _id) => { alert ('index:'+ _id +',inspectorId:'+inspectorId)
                        return _id !== inspectorId; 
              })*/}
          return students.filter((res) => res._id !== studentId);
        })
      }).catch(error => {
        console.error('There was an error!', error);
      });
      const json = response.json;
      //listProducts()
    }
  }
  // Edit an Inspector 

  const editStudents = (text, studentId) => {

    console.log("I am in edit Text"+text.student_lname);
    console.log("I am in edit client Id"+studentId);
    console.log("I am checking ownerToken"+ownerToken);

    const newManufacturer = {
      _id: studentId,
      student_fname: text.student_fname,
            student_lname: text.student_lname,
            student_father_name: text.student_father_name,
			student_mother_name: text.student_mother_name,
            student_age: text.student_age,
            student_grade: text.student_grade,
            student_section: text.student_section,
			student_parrent_email: text.student_parrent_email,
            student_parrent_mobile: text.student_parrent_mobile,
			student_gaurdian_mobile: text.student_gaurdian_mobile,
            student_blood_group: text.student_blood_group,
            student_dob: text.student_dob,	
			student_address: text.student_address,
			student_city: text.student_city,
            student_state: text.student_state,
            student_country: text.student_country,
			student_continent: text.student_continent,
			student_admission_date: text.student_admission_date,
            student_father_occupation: text.student_father_occupation,
            student_mother_occupation: text.student_mother_occupation,
			student_mother_income: text.student_mother_income,
			student_father_income: text.student_father_income,
            student_photo: text.student_photo,
            student_interests: text.student_interests,	
			student_male_female: text.student_male_female,
			student_class_teacher: text.student_class_teacher,
            student_stream: text.student_stream,
            student_medium: text.student_medium,
			student_board: text.student_board,
			student_uniform: text.student_uniform,
            student_books: text.student_books,
            student_bag: text.student_bag,
			student_mess: text.student_mess,
			student_transportation: text.student_transportation,
            student_foreign_tour: text.student_foreign_tour,
            student_domestic_tour: text.student_domestic_tour,
			student_annual_function: text.student_annual_function,
			student_hod: text.student_hod,
            student_attendance: text.student_attendance,
            student_health: text.student_health,
			student_achievements: text.student_achievements,
            student_technical_skills: text.student_technical_skills
    }

    alert("From State"+newManufacturer);
    console.log("From State"+newManufacturer);

    axios.put('http://localhost:5000/api/students/update/' + studentId, newManufacturer, {
      headers: {
        'owner-token': ownerToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp => {
      if (resp) {
        console.log(resp);
        {/* Managing for Edit */ }
        const updateStudents = students.map((student, index) => {
          //alert("I am in If condition of updatedInspectors"+index);
          if (student._id === studentId) {
            // Increment the clicked counter
            return newManufacturer;
          } else {
            // The rest haven't changed
            return student;
          }
        })
        console.log(updateStudents);
        setStudents(updateStudents);
      }
    }).catch(error => {
      console.error('There was an error!', error);
    });
    return 1;
  }

  /// Delete Multiple Clients 

  //for multiple deletion
  const deleteMultipleStudents = async (studentIds) => {

    let studentIdsr = { 'ids': studentIds };
    let studentsForRemove = JSON.stringify(studentIdsr);
    //const inspectorIdsd = { ids : inspectorIds };
    //alert(typeof(inspectorIdsd));
    if (window.confirm("Do You Want To Delete Selected Clients")) {
      
        const res = await fetch("http://localhost:5000/api/students/deletemultiplestudents", {
          method: 'DELETE',
          body: studentsForRemove,
          headers: {
            'owner-token': ownerToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(resp => {
            const updateStudents = students.filter((student) => !studentIds.includes(student._id));
            setStudents(updateStudents);
        }).catch(error => {
          console.error('Error while deleting Multiple Students', error);
        });
    }
  }

  return (
    <StudentsContext.Provider value={{ setFormValues , formValues , students, setStudents, addStudents, deleteStudents, editStudents, deleteMultipleStudents, apiResponseMessages }}>
      {props.children}
    </StudentsContext.Provider>

  )
}

export default StudentsState;