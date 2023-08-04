import React, { useEffect, useState } from "react";
import EmployeesContext from "./employeesContext";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { confirm } from "react-confirm-box";

const EmployeesState = (props) => {
const ownerToken = localStorage.getItem('token');
const [employees, setEmployees] = useState([]);

  useEffect(() => {

    /// Listing Employees 
    const fetchEmployees = async () => {
      const getEmployees = await axios.get(`http://localhost:5000/api/employees/list`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "owner-token": ownerToken
        }
      });
      console.log(getEmployees.data);
      return setEmployees(getEmployees.data);
      //alert(listConsultants);
    }
    fetchEmployees();
  }, []);

  // Add an Inspector
  const addEmployee = (text) => {
   // alert(text.employee_name + ownerToken);
    const newEmployee = {
      employee_name: text.employee_name,
      employee_email: text.employee_email,
      employee_password: text.employee_password,
      employee_consultant_id: '64941b2f530f65c747903b83'
    }
    axios.post('http://localhost:5000/api/employees/create/', newEmployee, {
      headers: {
        'owner-token': ownerToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp => {
      console.log(resp.data._id);
      const newEmployee = {
        _id: resp.data._id,
        employee_name: text.employee_name,
        employee_email: text.employee_email,
        employee_password: text.employee_password,
        employee_consultant_id: '64941b2f530f65c747903b83'
      }
      {/* I managed "setEmployees" from my end to add immediate when successfully added into the database */}
      setEmployees((oldEmployees) =>{
            return [...oldEmployees,newEmployee];
      })
      
    }).catch(error => {
      console.error('There was an error!', error);
    });
    return 1;
  }
 
  // Delete an Inspector 

  const deleteEmployee = (getEmployeeId) => {
    const employeeId = getEmployeeId;
    //const result =  confirm("Are you sure?");
    const apiDelete = "http://localhost:5000/api/employees/delete/" + employeeId;  
    //alert("resule of Confirm"+result);  
    if (window.confirm('Are you sure, want to delete the selected Inspector?')) {
      console.log("You click yes!" + employeeId);
      const response =  fetch(apiDelete, {
        method: 'DELETE',
        headers: {
          'owner-token': ownerToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(resp => {
       
        {/* I managed "setEmployees" from my end to add immediate when successfully added into the database */}
        setEmployees((employees) =>{
          //alert("I am here in delete Immediate Statement")
              {/*return employees.filter((arrElem , _id) => { alert ('index:'+ _id +',employeeId:'+employeeId)
                        return _id !== employeeId; 
              })*/}
              return employees.filter((res) => res._id !== employeeId);

        })
      }).catch(error => {
        console.error('There was an error!', error);
      });
      const json = response.json;
      //listProducts()
    }
  }
    // Edit an Inspector 

    const editEmployee = (text, employeeId) => {
      const newEmployee = {
        _id: employeeId,
        employee_name: text.employee_name,
        employee_email: text.employee_email,
        employee_password: text.employee_password
      }
      axios.put('http://localhost:5000/api/employees/update/' + employeeId, newEmployee, {
        headers: {
          'owner-token': ownerToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(resp => {
        if (resp) {
          console.log(resp);
          
          {/* Managing for Edit */}
        const updateEmployees =  employees.map((employee , index) => {
          //alert("I am in If condition of updateEmployees"+index);
            if (employee._id === employeeId) {             
              // Increment the clicked counter
              return newEmployee;
            } else {
              // The rest haven't changed
              return employee;
            }
          })
          console.log(updateEmployees);
          setEmployees(updateEmployees);
        }
      }).catch(error => {
        console.error('There was an error!', error);
      });
      return 1;
    }

    /// Delete Multiple Inspectors 

    //for multiple deletion
  const deleteMultipleEmployees = async (employeeIds) => {
    //alert(typeof(employeeIds));
    //alert(employeeIds);
    let employeeIdsr = { 'ids': employeeIds };
      let employeesForRemove = JSON.stringify(employeeIdsr);
        //const employeeIdsd = { ids : employeeIds };
    //alert(typeof(employeeIdsd));
    if (window.confirm("Do You Want To Delete Selected Inspectors")) {
      try {
        const res = await fetch("http://localhost:5000/api/employees/deletemultipleemployee", {     
          method: 'POST',
          body:  employeesForRemove,     
          headers: {
            'owner-token': ownerToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          } 
        })
        if (res.status === 201) {
          alert("Deleted Successfully")
          //getClients()
          //setids([])
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

    return (
      <EmployeesContext.Provider value={{ employees, addEmployee, deleteEmployee, editEmployee , deleteMultipleEmployees }}>
        {props.children}
      </EmployeesContext.Provider>

    )
  }

  export default EmployeesState;