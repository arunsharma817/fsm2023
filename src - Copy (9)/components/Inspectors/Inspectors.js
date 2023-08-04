import React , { useContext , useState } from 'react'
import AddInspector from './AddInspector.js'
import inspectorContext from '../../context/inspectors/inspectorsContext.js'
import { useNavigate, useParams } from "react-router-dom";
import Pagination from '../Products/Pagination';

const Inspectors = () => {   
  const navigate = useNavigate();
  const params = useParams();
  const inspectorId = params.id;

  const context = useContext(inspectorContext);
  const { inspectors , listInspectors , deleteInspector , deleteMultipleInspectors} = context;
///// Paginationn by Products 

const [searchApiData, setSearchApiData] = useState([]);
const [inspectorsCurrentPage, setInspectorsCurrentPage] = useState(1);
const [inspectorsPerPage, setInspectorsPerPage] = useState(15);
const [currentPage, setCurrentPage] = useState(1);
const inspectorPaginate = pageNumber => setInspectorsCurrentPage(pageNumber);
const [inspectorIds, setInspectorIds] = useState([]);

// For Multiple Checkboxes

 //// For checkbox multiple deletes 

 const handleCheck = (e) => {
  const { value, checked } = e.target
  
  if (checked) {
    setInspectorIds([...inspectorIds, value]);
  } else {
      setInspectorIds(() => inspectorIds.filter((e) => e !== value));
  }
}

  if(inspectorId){
    return (
      <div>
          <AddInspector inspectorId = {inspectorId} inspectors = {inspectors} /> </div>
          )
  }else{
          
            // Get Current Products
            const indexOfLastInspector = inspectorsCurrentPage * inspectorsPerPage;
            const indexOfFirstInspector = indexOfLastInspector - inspectorsPerPage;
            const currentInspectors = inspectors.slice(indexOfFirstInspector, indexOfLastInspector);


              return (
                <div>
                    {/*
 {ids.length <= 1 ? (multiselect ?  :  : <button className='btn btn-danger fw-bold ms-2' onClick={deleteMultiple}>Delete All</button>}

                    <AddInspector inspectors={inspectors}/>*/}
                    
                    <div className ="row my-3">
                            <h2>Inspectors List { inspectorIds.length > 1 ? <input type="button" value="Delete ALL " onClick={() => deleteMultipleInspectors(inspectorIds)}></input>  :  ''} </h2>
                            <div className="container">
                    {currentInspectors.map((inspector , index) => {
                      return (<div className="row align-items-center">
                        <div className="col-sm">{inspectors.length}{inspector.inspector_name}</div>
                        <div className="col-sm">{inspector.inspector_email}</div>
                        <div className="col-sm">{inspector.inspector_password}</div>  

                      <div className="col-sm"><input type="button" id={index} value="Del" onClick={() => deleteInspector(inspector._id)} /> <input type="checkBox" name={inspector._id} value={inspector._id} onClick={(e) => handleCheck(e)}></input></div>
                      <div className="col-sm"><input type="button" id={inspector._id} value="Edit" onClick={() => navigate("/inspectors/" + inspector._id)} /></div>     
                        
                    
                    </div>)
                    })}
                  </div>
                    </div>
                    <Pagination setCurrentPage={setCurrentPage} currentPage={inspectorsCurrentPage} postsPerPage={inspectorsPerPage} totalPosts={inspectors.length} paginate={inspectorPaginate} />
 
                </div>
              )
  }          
}

export default Inspectors
