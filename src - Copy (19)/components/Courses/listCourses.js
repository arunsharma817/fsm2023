import React , { useContext , useState } from 'react'
import AddCourses from './addCourses.js'
import coursesContext from '../../context/courses/contextCourses.js'
import { useNavigate, useParams , Link } from "react-router-dom";
import Pagination from '../Products/Pagination.js';


const ListCourses = () => {
   
  const navigate = useNavigate();
  const params = useParams();
  const courseId = params.id;

  const context = useContext(coursesContext);
  const { courses ,  deleteCourse , deleteMultipleCourses} = context;
///// Paginationn by Products 

const [searchApiData, setSearchApiData] = useState([]);
const [coursesCurrentPage, setCoursesCurrentPage] = useState(1);
const [coursesPerPage, setCoursesPerPage] = useState(15);
const [currentPage, setCurrentPage] = useState(1);
const coursesPaginate = pageNumber => setCoursesCurrentPage(pageNumber);
const [courseIds, setCourseIds] = useState([]);

// For Multiple Checkboxes

 //// For checkbox multiple deletes 

 const handleCheck = (e) => {
  const { value, checked } = e.target
  
  if (checked) {
    setCourseIds([...courseIds, value]);
  } else {
    setCourseIds(() => courseIds.filter((e) => e !== value));
  }
}

  if(courseId){
    //console.log("I am here before sending to edit"+users.course_title);
    return (
      <div>
          <AddCourses courseId = {courseId} courses = {courses} /> </div>
          )
  }else{
          
            // Get Current Clients
            const indexOfLastCourse = coursesCurrentPage * coursesPerPage;
            const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
            const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);


              return (
                <div class="tab-pane fade show active" id="ntarget-1" role="tabpanel" aria-labelledby="ntab-1">
                <h4 class="heading-h4">!! Courses List !!</h4> { courseIds.length > 1 ? <input type="button" value="Delete ALL " onClick={() => deleteMultipleCourses(courseIds)}></input>  :  ''}
                <div class="table-container">
                    <table id="client-list" class="table table-bordered display">  
                        <thead>
                            <tr>                                                                    
                                <th> Name</th>
                                <th> Email ID</th>
                                <th> Mobile</th>
                                <th> Action</th>                                                                    
                            </tr>
                        </thead>  
                    <tbody>                 
                            
                            {currentCourses.map((course , index) => {
                              return (<tr>
                                <td>{courses.length}{course.course_title}</td>
                                <td>{course.course_description}</td>
                                <td>{course.course_author}</td>  
                                <td>
                                  <div class="btn-group">
                                  <span  class="btn btn-success btn-xs" onClick={() => navigate("/courses/" + course._id)}><i class="bi bi-pencil"></i></span>
                                  <Link  class="btn btn-danger btn-xs" onClick={() => deleteCourse(course._id)}><i class="bi bi-trash"></i></Link>
        
                                    <div className="col-sm"> <input type="checkBox" checked={courseIds.includes(course._id)} name={course._id} value={course._id} onClick={(e) => handleCheck(e)}></input></div>
                                  </div>
                                </td> 
                            
                            </tr>)
                            })} 
        
              </tbody>
              </table>
                </div>					
                             <Pagination setCurrentPage={setCurrentPage} currentPage={coursesCurrentPage} postsPerPage={coursesPerPage} totalPosts={courses.length} paginate={coursesPaginate} />
        
        </div>
              )
  }          
}

export default ListCourses
