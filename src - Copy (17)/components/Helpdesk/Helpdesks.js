import React , { useContext , useState } from 'react'
import AddHelpdesk from './AddHelpdesk.js'
import helpdeskContext from '../../context/helpdesk/helpdeskContext.js'
import { useNavigate, useParams } from "react-router-dom";
import Pagination from '../Products/Pagination';

const Helpdesk = () => {   
  const navigate = useNavigate();
  const params = useParams();
  const helpdeskId = params.id;

  const context = useContext(helpdeskContext);
  const { helpdesks , listHelpdesk , deleteHelpdesk , deleteMultipleHelpdesk} = context;
///// Paginationn by Products 

const [searchApiData, setSearchApiData] = useState([]);
const [helpdeskCurrentPage, sethelpdeskCurrentPage] = useState(1);
const [helpdeskPerPage, sethelpdeskPerPage] = useState(15);
const [currentPage, setCurrentPage] = useState(1);
const helpdeskPaginate = pageNumber => sethelpdeskCurrentPage(pageNumber);
const [helpdeskIds, setHelpdeskIds] = useState([]);

// For Multiple Checkboxes

 //// For checkbox multiple deletes 

 const handleCheck = (e) => {
  const { value, checked } = e.target
  
  if (checked) {
    setHelpdeskIds([...helpdeskIds, value]);
  } else {
      setHelpdeskIds(() => helpdeskIds.filter((e) => e !== value));
  }
}

  if(helpdeskId){
    return (
      <div>
          <AddHelpdesk helpdeskId = {helpdeskId} helpdesks = {helpdesks} /> </div>
          )
  }else{
          
            // Get Current Products
            const indexOfLastHelpdesk = helpdeskCurrentPage * helpdeskPerPage;
            const indexOfFirstHelpdesk = indexOfLastHelpdesk - helpdeskPerPage;
            const currentHelpdesk = helpdesks.slice(indexOfFirstHelpdesk, indexOfLastHelpdesk);


              return (
                <div>
                    {/*
 {ids.length <= 1 ? (multiselect ?  :  : <button className='btn btn-danger fw-bold ms-2' onClick={deleteMultiple}>Delete All</button>}

                    <AddInspector inspectors={inspectors}/>*/}
                    
                    <div className ="row my-3">
                            <h2>helpdesks List { helpdeskIds.length > 1 ? <input type="button" value="Delete ALL " onClick={() => deleteMultipleHelpdesk(helpdeskIds)}></input>  :  ''} </h2>
                            <div className="container">
                    {currentHelpdesk.map((helpdesk, index) => {
                      return (<div className="row align-items-center">
                        <div className="col-sm">{helpdesks.length}{helpdesk.request_subject}</div>
                        <div className="col-sm">{helpdesk.request_description}</div>
                        <div className="col-sm">{helpdesk.request_priority}</div>  

                      <div className="col-sm"><input type="button" id={index} value="Del" onClick={() => deleteHelpdesk(helpdesk._id)} /> <input type="checkBox" name={helpdesk._id} value={helpdesk._id} onClick={(e) => handleCheck(e)}></input></div>
                      <div className="col-sm"><input type="button" id={helpdesk._id} value="Edit" onClick={() => navigate("/helpdesk/" + helpdesk._id)} /></div>     
                        
                    
                    </div>)
                    })}
                  </div>
                    </div>
                    <Pagination setCurrentPage={setCurrentPage} currentPage={helpdeskCurrentPage} postsPerPage={helpdeskPerPage} totalPosts={helpdesks.length} paginate={helpdeskPaginate} />
 
                </div>
              )
  }          
}

export default Helpdesk
