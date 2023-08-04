import React , { useContext , useState } from 'react'
import AddEmployee from './AddEmployee.js'
import employeeContext from '../../context/employees/employeesContext.js'
import { useNavigate, useParams } from "react-router-dom";
import Pagination from '../Products/Pagination';

const Employees = () => {   
  const navigate = useNavigate();
  const params = useParams();
  const employeeId = params.id;

  const context = useContext(employeeContext);
  const { employees , listEmployees , deleteEmployee , deleteMultipleEmployees} = context;
///// Paginationn by Products 

const [searchApiData, setSearchApiData] = useState([]);
const [employeesCurrentPage, setEmployeesCurrentPage] = useState(1);
const [employeesPerPage, setEmployeesPerPage] = useState(15);
const [currentPage, setCurrentPage] = useState(1);
const employeePaginate = pageNumber => setEmployeesCurrentPage(pageNumber);
const [employeeIds, setEmployeeIds] = useState([]);

// For Multiple Checkboxes

 //// For checkbox multiple deletes 

 const handleCheck = (e) => {
  const { value, checked } = e.target
  
  if (checked) {
    setEmployeeIds([...employeeIds, value]);
  } else {
      setEmployeeIds(() => employeeIds.filter((e) => e !== value));
  }
}

  if(employeeId){
    return (
      <div>
          <AddEmployee employeeId = {employeeId} employees = {employees} /> </div>
          )
  }else{
          
            // Get Current Products
            const indexOfLastEmployee = employeesCurrentPage * employeesPerPage;
            const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
            const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);


              return (
                <div>
                    {/*
 {ids.length <= 1 ? (multiselect ?  :  : <button className='btn btn-danger fw-bold ms-2' onClick={deleteMultiple}>Delete All</button>}

                    <AddInspector inspectors={inspectors}/>*/}
                    
                    <div className ="row my-3">
                            <h2>Employees List { employeeIds.length > 1 ? <input type="button" value="Delete ALL " onClick={() => deleteMultipleEmployees(employeeIds)}></input>  :  ''} </h2>
                            <div className="container">
                    {currentEmployees.map((employee , index) => {
                      return (<div className="row align-items-center">
                        <div className="col-sm">{employees.length}{employee.employee_name}</div>
                        <div className="col-sm">{employee.employee_email}</div>
                        <div className="col-sm">{employee.employee_password}</div>  

                      <div className="col-sm"><input type="button" id={index} value="Del" onClick={() => deleteEmployee(employee._id)} /> <input type="checkBox" name={employee._id} value={employee._id} onClick={(e) => handleCheck(e)}></input></div>
                      <div className="col-sm"><input type="button" id={employee._id} value="Edit" onClick={() => navigate("/employees/" + employee._id)} /></div>     
                        
                    
                    </div>)
                    })}
                  </div>
                    </div>
                    <Pagination setCurrentPage={setCurrentPage} currentPage={employeesCurrentPage} postsPerPage={employeesPerPage} totalPosts={employees.length} paginate={employeePaginate} />
 
                </div>
              )
  }          
}

export default Employees
