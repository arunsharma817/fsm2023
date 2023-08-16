import React , { useContext , useState } from 'react'
import AddCandidate from './AddCandidate.js'
import candidateContext from '../../context/candidates/candidatesContext.js'
import { useNavigate, useParams } from "react-router-dom";
import Pagination from '../Products/Pagination';

const Candidates = () => {   
  const navigate = useNavigate();
  const params = useParams();
  const candidateId = params.id;

  const context = useContext(candidateContext);
  const { candidates , listCandidates , deleteCandidate , deleteMultipleCandidates} = context;
///// Paginationn by Products 

const [searchApiData, setSearchApiData] = useState([]);
const [candidatesCurrentPage, setCandidatesCurrentPage] = useState(1);
const [candidatesPerPage, setCandidatesPerPage] = useState(15);
const [currentPage, setCurrentPage] = useState(1);
const candidatePaginate = pageNumber => setCandidatesCurrentPage(pageNumber);
const [candidateIds, setCandidateIds] = useState([]);

// For Multiple Checkboxes

 //// For checkbox multiple deletes 

 const handleCheck = (e) => {
  const { value, checked } = e.target
  
  if (checked) {
    setCandidateIds([...candidateIds, value]);
  } else {
      setCandidateIds(() => candidateIds.filter((e) => e !== value));
  }
}

  if(candidateId){
    return (
      <div>
          <AddCandidate candidateId = {candidateId} candidates = {candidates} /> </div>
          )
  }else{
          
            // Get Current Products
            const indexOfLastCandidate = candidatesCurrentPage * candidatesPerPage;
            const indexOfFirstCandidate = indexOfLastCandidate - candidatesPerPage;
            const currentCandidates = candidates.slice(indexOfFirstCandidate, indexOfLastCandidate);


              return (
                <div>
                    {/*
 {ids.length <= 1 ? (multiselect ?  :  : <button className='btn btn-danger fw-bold ms-2' onClick={deleteMultiple}>Delete All</button>}

                    <AddInspector inspectors={inspectors}/>*/}
                    
                    <div className ="row my-3">
                            <h2>Candidates List { candidateIds.length > 1 ? <input type="button" value="Delete ALL " onClick={() => deleteMultipleCandidates(candidateIds)}></input>  :  ''} </h2>
                            <div className="container">
                    {currentCandidates.map((candidate , index) => {
                      return (<div className="row align-items-center">
                        <div className="col-sm">{candidates.length}{candidate.candidate_name}</div>
                        <div className="col-sm">{candidate.candidate_email}</div>
                        <div className="col-sm">{candidate.candidate_password}</div>  

                      <div className="col-sm"><input type="button" id={index} value="Del" onClick={() => deleteCandidate(candidate._id)} /> <input type="checkBox" name={candidate._id} value={candidate._id} onClick={(e) => handleCheck(e)}></input></div>
                      <div className="col-sm"><input type="button" id={candidate._id} value="Edit" onClick={() => navigate("/candidates/" + candidate._id)} /></div>     
                        
                    
                    </div>)
                    })}
                  </div>
                    </div>
                    <Pagination setCurrentPage={setCurrentPage} currentPage={candidatesCurrentPage} postsPerPage={candidatesPerPage} totalPosts={candidates.length} paginate={candidatePaginate} />
 
                </div>
              )
  }          
}

export default Candidates
