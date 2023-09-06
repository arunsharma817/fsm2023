import React , { useContext , useState , useEffect } from 'react'
import AddStudents from './AddStudents.js'
import StudentsContext from '../../context/Students/StudentsContext.js'
import { useNavigate, useParams , Link } from "react-router-dom";
import Pagination from '../Products/Pagination';
import Papa from 'papaparse';

const ListStudents = () => {
   
  const navigate = useNavigate();
  const params = useParams();
  const studentId = params.id;

  const context = useContext(StudentsContext);
  const { students , setStudents ,  deleteStudents , deleteMultipleStudents} = context;

 /// For Sorting Each Columns in list 

  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSort = (columnName) => {
    if (sortColumn === columnName) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnName);
      setSortOrder('asc');
    }
  };


///// Paginationn by Products 

const [searchApiData, setSearchApiData] = useState([]);
const [studentsCurrentPage, setStudentsCurrentPage] = useState(1);
const [studentsPerPage, SetStudentsPerPage] = useState(15);
const [currentPage, setCurrentPage] = useState(1);
const studentsPaginate = pageNumber => setStudentsCurrentPage(pageNumber);
const [studentsIds, setStudentsIds] = useState([]);

////For Search 
 //// For Search
const [searchStudents, setSearchStudents] = useState('');
const [searchOldStudents, setSearchOldStudents] = useState("");
useEffect(() => {
    //inputEvent();
  }, [searchStudents]);
  
const inputEvent = (e) => {
    const data = e.target.value;
    console.log(data);  
    setSearchStudents(data);
    setSearchOldStudents(students);
    if(data == '') {
      console.log("I am here in data blank"+searchStudents);
      {students.map((searchStudent , index) => { console.log(searchStudents.length +' here'+searchStudent.student_lname) } 
     
      )}
      setStudents([...students]);
    } else {
      //alert("I am here for search"+data);
      //const filterResult = data.length > 0 ? mainProducts.filter((product) => product.students_name.toLowerCase().includes(data.toLowerCase())) : setMainProducts(searchStudents) ;
      
      const filterResult = data.length === 0
      ? null 
      : students.filter((student) => student.student_lname.toLowerCase().includes(data.toLowerCase()));
  
      setStudents(filterResult);
    }
  };



/// For Export  CSV 
//const [csvData, setCsvData] = useState('');

  const handleExportCSV = () => {
    // Convert the items to CSV format using papaparse
    const csv = Papa.unparse(students, {
      header: true,
    });

    // Create a Blob and URL for the CSV data
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    // Create a link and click it to trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'students.csv');
    document.body.appendChild(link);
    link.click();

    // Clean up by removing the link and revoking the URL
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };


////// For Each Column Search 

const [searchText, setSearchText] = useState({
    "student_fname": ' ',
    "student_lname": ' ',
    "student_father_name": ' ',
    "student_mother_name": ' ',
    "student_age": ' ',
    "student_grade": ' ',
    "student_section": ' ',
    "student_parrent_email":' ',
    "student_parrent_mobile": ' ',
    "student_gaurdian_mobile": ' ',
    "student_blood_group": ' ',
    "student_dob": ' ',
    "student_address": ' ',
    "student_city": ' ',
    "student_state": ' ',
    "student_country": ' ',
    "student_continent": ' ',
    "student_admission_date": ' ',
    "student_father_occupation": ' ',
    "student_mother_occupation": ' ',
    "student_mother_income": ' ',
"student_father_income": ' ',
    "student_photo": ' ',
    "student_interests": ' ',
    "student_male_female": ' ',
    "student_class_teacher": ' ',
    "student_stream": ' ',
    "student_medium": ' ',
    "student_board": ' ',
    "student_uniform": ' ',
    "student_books": ' ',
    "student_bag": ' ',
    "student_mess": ' ',
    "student_transportation": ' ',
    "student_foreign_tour": ' ',
    "student_domestic_tour": ' ',
    "student_annual_function": ' ',
    "student_hod": ' ',
    "student_attendance": ' ',
    "student_health": ' ',
    "student_achievements": ' ',
    "student_technical_skills": ' '
 });

const handleSearch = (column, value) => {
    setSearchText({ ...searchText, [column]: value });
};

/// For Multiple Delete
const handleCheck = (e) => {
  const { value, checked } = e.target
  
  if (checked) {
    setStudentsIds([...studentsIds, value]);
  } else {
    setStudentsIds(() => studentsIds.filter((e) => e !== value));
  }
}

  if(studentId){
    //console.log("I am here before sending to edit"+users.student_lname);
    return (
      <div>
          <AddStudents studentId = {studentId} students = {students} /> </div>
          )
  }else{
          
            // Get Current Clients
            const indexOfLastStudents = studentsCurrentPage * studentsPerPage;
            const indexOfFirstStudents = indexOfLastStudents - studentsPerPage;
            const currentStudents = students.slice(indexOfFirstStudents, indexOfLastStudents);

            const sortedData = currentStudents.slice().sort((a, b) => {
                
                if(sortColumn) {
                  const aValue = a[sortColumn];
                  const bValue = b[sortColumn];
            
                  if (sortOrder === 'asc') {
                    return aValue > bValue ? 1 : -1;
                  } else {
                    return aValue < bValue ? 1 : -1;
                  }
                } else {
                  return 0;
               }
               
            });


       




              return (
                <div class="tab-pane fade show active" id="ntarget-1" role="tabpanel" aria-labelledby="ntab-1">
                <p><h4 class="heading-h4">!! Students List !!</h4> { studentsIds.length > 1 ? <input type="button" value="Delete ALL " onClick={() => deleteMultipleStudents(studentsIds)}></input>  :  ''} <button onClick={handleExportCSV}>Export CSV</button></p>
                <input type="search" name="searchbox" value= { searchStudents} placeholder='Search Here' onChange={(e) => inputEvent(e)} />

                <div class="table-container">
                    <table id="client-list" class="table table-bordered display">  
                        <thead>
                        <tr>                                                                    
                                <th onClick={() => handleSort('student_fname')}>  First Name
                                {sortColumn === 'student_fname' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('student_lname')}>  Last Name 
                                {sortColumn === 'student_lname' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('student_father_name')}> Father Name
                                {sortColumn === 'student_father_name' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								 <th onClick={() => handleSort('student_mother_name')}>  Mother Name
                                {sortColumn === 'student_mother_name' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('student_age')}>  Age 
                                {sortColumn === 'student_age' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('student_grade')}> Grade 
                                {sortColumn === 'student_grade' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								<th onClick={() => handleSort('student_section')}>  Section
                                {sortColumn === 'student_section' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('student_parrent_email')}>  Parrent Email 
                                {sortColumn === 'student_parrent_email' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('student_parrent_mobile')}> Parrent Mobile
                                {sortColumn === 'student_parrent_mobile' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								 <th onClick={() => handleSort('student_gaurdian_mobile')}>  Gaurdian Mobile
                                {sortColumn === 'student_gaurdian_mobile' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('student_blood_group')}> Blood Group 
                                {sortColumn === 'student_blood_group' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('student_dob')}> Student DOB
                                {sortColumn === 'student_dob' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								
								<th onClick={() => handleSort('student_address')}>  Student Address
                                {sortColumn === 'student_address' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('student_city')}>  Student City 
                                {sortColumn === 'student_city' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('student_state')}> Student State
                                {sortColumn === 'student_state' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								 <th onClick={() => handleSort('student_country')}>  Student Country
                                {sortColumn === 'student_country' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('student_continent')}>  Student Continent 
                                {sortColumn === 'student_continent' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('student_admission_date')}> Admission Date
                                {sortColumn === 'student_admission_date' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								<th onClick={() => handleSort('student_father_occupation')}>  Father Occupation
                                {sortColumn === 'student_father_occupation' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('student_mother_occupation')}>  Mother Occupation 
                                {sortColumn === 'student_mother_occupation' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('student_mother_income')}> Mother Income
                                {sortColumn === 'student_mother_income' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								 <th onClick={() => handleSort('student_father_income')}>  Father Income
                                {sortColumn === 'student_father_income' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('student_photo')}> Student Photo 
                                {sortColumn === 'student_photo' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('student_interests')}> Interests 
                                {sortColumn === 'student_interests' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>

                                <th onClick={() => handleSort('student_male_female')}> Male/Female 
                                {sortColumn === 'student_male_female' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								 <th onClick={() => handleSort('student_class_teacher')}>  Class Teacher
                                {sortColumn === 'student_class_teacher' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('student_stream')}> Stream 
                                {sortColumn === 'student_stream' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('student_medium')}> Student Medium 
                                {sortColumn === 'student_medium' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								
								 <th onClick={() => handleSort('student_board')}>  Student Board
                                {sortColumn === 'student_board' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('student_uniform')}> Student Uniform
                                {sortColumn === 'student_uniform' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('student_books')}> Student Books 
                                {sortColumn === 'student_books' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								 <th onClick={() => handleSort('student_bag')}>  Student Bag
                                {sortColumn === 'student_bag' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('student_mess')}> Student Mess
                                {sortColumn === 'student_mess' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('student_transportation')}> Student Transportation 
                                {sortColumn === 'student_transportation' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								<th onClick={() => handleSort('student_foreign_tour')}> Student Foriegn Tour
                                {sortColumn === 'student_foreign_tour' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('student_domestic_tour')}> Student Domestic Tour 
                                {sortColumn === 'student_domestic_tour' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								<th onClick={() => handleSort('student_annual_function')}> Annual Function
                                {sortColumn === 'student_annual_function' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('student_hod')}> HOD
                                {sortColumn === 'student_hod' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								<th onClick={() => handleSort('student_attendance')}> Youtube 
                                {sortColumn === 'student_attendance' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('student_health')}> Health 
                                {sortColumn === 'student_health' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								<th onClick={() => handleSort('student_achievements')}> Achievements
                                {sortColumn === 'student_achievements' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('student_technical_skills')}> Technical Skills 
                                {sortColumn === 'student_technical_skills' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
                                <th>Action</th>                                                                    
                            </tr>
                            <tr>                                                                    
                                <td><input type="text" value={searchText.student_fname} onChange={(e) => handleSearch('student_fname', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.student_lname} onChange={(e) => handleSearch('student_lname', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.student_father_name} onChange={(e) => handleSearch('student_father_name', e.target.value)}/>
                                
                               
                                </td>
								
								 <td><input type="text" value={searchText.student_mother_name} onChange={(e) => handleSearch('student_mother_name', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.student_age} onChange={(e) => handleSearch('student_age', e.target.value)}/>   
                                
                                
                                </td>
                                <td><input type="text" value={searchText.student_grade} onChange={(e) => handleSearch('student_grade', e.target.value)}/> 
                                
                               
                                </td>
								
								<td><input type="text" value={searchText.student_section} onChange={(e) => handleSearch('student_section', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.student_parrent_email} onChange={(e) => handleSearch('student_parrent_email', e.target.value)}/>   
                                
                                
                                </td>
                                <td><input type="text" value={searchText.student_parrent_mobile} onChange={(e) => handleSearch('student_parrent_mobile', e.target.value)}/> 
                                
                               
                                </td>
								
								 <td><input type="text" value={searchText.student_gaurdian_mobile} onChange={(e) => handleSearch('student_gaurdian_mobile', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.student_blood_group} onChange={(e) => handleSearch('student_blood_group', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.student_dob} onChange={(e) => handleSearch('student_dob', e.target.value)}/>
                                
                               
                                </td>
								
								
								<td><input type="text" value={searchText.student_address} onChange={(e) => handleSearch('student_address', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.student_city} onChange={(e) => handleSearch('student_city', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.student_state} onChange={(e) => handleSearch('student_state', e.target.value)}/> 
                                
                               
                                </td>
								
								 <td><input type="text" value={searchText.student_country} onChange={(e) => handleSearch('student_country', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.student_continent} onChange={(e) => handleSearch('student_continent', e.target.value)}/>   
                                
                                
                                </td>
                                <td><input type="text" value={searchText.student_admission_date} onChange={(e) => handleSearch('student_admission_date', e.target.value)}/> 
                                
                               
                                </td>
								
								<td><input type="text" value={searchText.student_father_occupation} onChange={(e) => handleSearch('student_father_occupation', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.student_mother_occupation} onChange={(e) => handleSearch('student_mother_occupation', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.student_mother_income} onChange={(e) => handleSearch('student_mother_income', e.target.value)}/>
                                
                               
                                </td>
								
								 <td><input type="text" value={searchText.student_father_income} onChange={(e) => handleSearch('student_father_income', e.target.value)}/>                                  
                                
                                </td>
                                <td><input type="text" value={searchText.student_photo} onChange={(e) => handleSearch('student_photo', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.student_interests} onChange={(e) => handleSearch('student_interests', e.target.value)}/> 
                                
                               
                                </td>
								
                                <td><input type="text" value={searchText.student_male_female} onChange={(e) => handleSearch('student_male_female', e.target.value)}/>  
</td>
								 <td><input type="text" value={searchText.student_class_teacher} onChange={(e) => handleSearch('student_class_teacher', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.student_stream} onChange={(e) => handleSearch('student_stream', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.student_medium} onChange={(e) => handleSearch('student_medium', e.target.value)}/>  
                                
                               
                                </td>
								
								
								 <td><input type="text" value={searchText.student_board} onChange={(e) => handleSearch('student_board', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.student_uniform} onChange={(e) => handleSearch('student_uniform', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.student_books} onChange={(e) => handleSearch('student_books', e.target.value)}/>  
                                
                               
                                </td>
								
								 <td><input type="text" value={searchText.student_bag} onChange={(e) => handleSearch('student_bag', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.student_mess} onChange={(e) => handleSearch('student_mess', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.student_transportation} onChange={(e) => handleSearch('student_transportation', e.target.value)}/>  
                                
                               
                                </td>
								<td><input type="text" value={searchText.student_foreign_tour} onChange={(e) => handleSearch('student_foreign_tour', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.student_domestic_tour} onChange={(e) => handleSearch('student_domestic_tour', e.target.value)}/> 
                                
                               
                                </td>
								<td><input type="text" value={searchText.student_annual_function} onChange={(e) => handleSearch('student_annual_function', e.target.value)}/>
                                
                                
                                </td>
                                <td><input type="text" value={searchText.student_hod} onChange={(e) => handleSearch('student_hod', e.target.value)}/>
                                
                               
                                </td>
								<td><input type="text" value={searchText.student_attendance} onChange={(e) => handleSearch('student_attendance', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.student_health} onChange={(e) => handleSearch('student_health', e.target.value)}/> 
                                
                               
                                </td>
								<td><input type="text" value={searchText.student_achievements} onChange={(e) => handleSearch('student_achievements', e.target.value)}/>
                                
                                
                                </td>
                                <td><input type="text" value={searchText.student_technical_skills} onChange={(e) => handleSearch('student_technical_skills', e.target.value)}/>                      
                               
                                </td>
                                <td>Action</td>                                                                    
                            </tr>
                        </thead>  
                    <tbody>                 
                            
                            {sortedData.map((student , index) => {
                              return (<tr>
                                <td>{students.length}{student.student_fname}</td>
                                <td>{student.student_lname}</td>
                                <td>{student.student_father_name}</td>  
								<td>{students.length}{student.student_mother_name}</td>
                                <td>{student.student_age}</td>
                                <td>{student.student_grade}</td> 
								<td>{students.length}{student.student_section}</td>
                                <td>{student.student_parrent_email}</td>
                                <td>{student.student_parrent_mobile}</td> 
                                <td>{student.student_gaurdian_mobile}</td>
                                <td>{student.student_blood_group}</td> 
                                <td>{student.student_dob}</td>
                                <td>{student.student_address}</td> 
								                <td>{students.length}{student.student_city}</td>
                                <td>{student.student_state}</td>
                                <td>{student.student_country}</td> 
								                <td>{students.length}{student.student_continent}</td>
                                <td>{student.student_admission_date}</td>
                                <td>{student.student_father_occupation}</td> 
								                <td>{student.student_mother_occupation}</td>
                                <td>{student.student_mother_income}</td> 
								                <td>{student.student_father_income}</td>
                                <td>{student.student_photo}</td> 
								                <td>{student.student_interests}</td>
                                <td>{student.student_male_female}</td> 
								                <td>{student.student_class_teacher}</td> 
								                <td>{student.student_stream}</td>
                                <td>{student.student_medium}</td> 
								                <td>{student.student_board}</td> 
								                <td>{student.student_uniform}</td>
                                <td>{student.student_books}</td> 
								                <td>{student.student_bag}</td> 
								                <td>{student.student_mess}</td>
                                <td>{student.student_transportation}</td> 
								                <td>{student.student_foreign_tour}</td> 
								                <td>{student.student_domestic_tour}</td>
                                <td>{student.student_annual_function}</td> 
								                <td>{student.student_hod}</td>
                                <td>{student.student_attendance}</td> 
								                <td>{student.student_health}</td> 
								                <td>{student.student_achievements}</td>
                                <td>{student.student_technical_skills}</td> 
                                <td>
                                  <div class="btn-group">
                                  <span  class="btn btn-success btn-xs" onClick={() => navigate("/students/" + student._id)}><i class="bi bi-pencil"></i></span>
                                  <Link  class="btn btn-danger btn-xs" onClick={() => deleteStudents(student._id)}><i class="bi bi-trash"></i></Link>        
                                    <div className="col-sm"> <input type="checkBox" checked={studentsIds.includes(student._id)} name={student._id} value={student._id} onClick={(e) => handleCheck(e)}></input></div>
                                  </div>
                                </td> 
                            
                            </tr>)
                            })} 
        
              </tbody>
              </table>
                </div>					
                             <Pagination setCurrentPage={setCurrentPage} currentPage={studentsCurrentPage} postsPerPage={studentsPerPage} totalPosts={students.length} paginate={studentsPaginate} />
        
        </div>
              )
  }          
}

export default ListStudents
