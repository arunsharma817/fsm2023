import React , { useContext , useState } from 'react'
import AddInspection from './AddInspection.js'
import inspectionContext from '../../context/inspections/inspectionsContext.js'
import { useNavigate, useParams } from "react-router-dom";
import Pagination from '../Products/Pagination';


const Inspections = () => {
   
  const navigate = useNavigate();
  const params = useParams();
  const inspectionId = params.id;

  const context = useContext(inspectionContext);
  const { inspections , listInspections , deleteInspection , deleteMultipleInspections} = context;
///// Paginationn by Products 

const [searchApiData, setSearchApiData] = useState([]);
const [inspectionsCurrentPage, setInspectionsCurrentPage] = useState(1);
const [inspectionsPerPage, setInspectionsPerPage] = useState(15);
const [currentPage, setCurrentPage] = useState(1);
const inspectionPaginate = pageNumber => setInspectionsCurrentPage(pageNumber);
const [inspectionIds, setInspectionIds] = useState([]);

// For Multiple Checkboxes

 //// For checkbox multiple deletes 

 const handleCheck = (e) => {
  const { value, checked } = e.target
  
  if (checked) {
    setInspectionIds([...inspectionIds, value]);
  } else {
    setInspectionIds(() => inspectionIds.filter((e) => e !== value));
  }
}

  if(inspectionId){
    return (
      <div>
          <AddInspection inspectionId = {inspectionId} inspections = {inspections} /> </div>
          )
  }else{
          
            // Get Current Inspections

            const indexOfLastInspection = inspectionsCurrentPage * inspectionsPerPage;
            const indexOfFirstInspection = indexOfLastInspection - inspectionsPerPage;
            const currentInspections = inspections.slice(indexOfFirstInspection, indexOfLastInspection);


              return (
                <div>                    
                    <div className ="row my-3">
                            <h2>Inspections List { inspectionIds.length > 1 ? <input type="button" value="Delete ALL " onClick={() => deleteMultipleInspections(inspectionIds)}></input>  :  ''} </h2>
                            <div className="container">
                    {currentInspections.map((inspection , index) => {
                      return (<div className="row align-items-center">
                        <div className="col-sm">{inspections.length}{inspection.client_id}</div>
                        <div className="col-sm">{inspection.product_id}</div>
                        <div className="col-sm">{inspection.inspector_id}</div>  

                      <div className="col-sm"><input type="button" id={index} value="Del" onClick={() => deleteInspection(inspection._id)} /> <input type="checkBox" name={inspection._id} value={inspection._id} onClick={(e) => handleCheck(e)}></input></div>
                      <div className="col-sm"><input type="button" id={inspection._id} value="Edit" onClick={() => navigate("/inspections/" + inspection._id)} /></div>  
                        
                    
                    </div>)
                    })}
                  </div>
                    </div>
                    <Pagination setCurrentPage={setCurrentPage} currentPage={inspectionsCurrentPage} postsPerPage={inspectionsPerPage} totalPosts={inspections.length} paginate={inspectionPaginate} />
 
                </div>
              )
  }          
}

export default Inspections
