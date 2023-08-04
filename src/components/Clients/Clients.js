import React , { useContext , useState } from 'react'
import AddClient from './AddClient.js'
import clientContext from '../../context/clients/clientsContext.js'
import { useNavigate, useParams } from "react-router-dom";
import Pagination from '../Products/Pagination';


const Clients = () => {
   
  const navigate = useNavigate();
  const params = useParams();
  const clientId = params.id;

  const context = useContext(clientContext);
  const { clients , listClients , deleteClient , deleteMultipleClients} = context;
///// Paginationn by Products 

const [searchApiData, setSearchApiData] = useState([]);
const [clientsCurrentPage, setClientsCurrentPage] = useState(1);
const [clientsPerPage, setClientsPerPage] = useState(15);
const [currentPage, setCurrentPage] = useState(1);
const clientPaginate = pageNumber => setClientsCurrentPage(pageNumber);
const [clientIds, setClientIds] = useState([]);

// For Multiple Checkboxes

 //// For checkbox multiple deletes 

 const handleCheck = (e) => {
  const { value, checked } = e.target
  
  if (checked) {
    setClientIds([...clientIds, value]);
  } else {
    setClientIds(() => clientIds.filter((e) => e !== value));
  }
}

  if(clientId){
    //console.log("I am here before edit clients"+clients.client_email)
    return (
      <div>
          <AddClient clientId = {clientId} clients = {clients} /> </div>
          )
  }else{
          
            // Get Current Clients
            const indexOfLastClient = clientsCurrentPage * clientsPerPage;
            const indexOfFirstClient = indexOfLastClient - clientsPerPage;
            const currentClients = clients.slice(indexOfFirstClient, indexOfLastClient);


              return (
                <div>                    
                    <div className ="row my-3">
                            <h2>Clients List { clientIds.length > 1 ? <input type="button" value="Delete ALL " onClick={() => deleteMultipleClients(clientIds)}></input>  :  ''} </h2>
                            <div className="container">
                    {currentClients.map((client , index) => {
                      return (<div className="row align-items-center">
                        <div className="col-sm">{clients.length}{client.client_company_name}</div>
                        <div className="col-sm">{client.client_email}</div>
                        <div className="col-sm">{client.client_password}</div>  

                      <div className="col-sm"><input type="button" id={index} value="Del" onClick={() => deleteClient(client._id)} /> <input type="checkBox" name={client._id} value={client._id} onClick={(e) => handleCheck(e)}></input></div>
                      <div className="col-sm"><input type="button" id={client._id} value="Edit" onClick={() => navigate("/clients/" + client._id)} /></div>  
                        
                    
                    </div>)
                    })}
                  </div>
                    </div>
                    <Pagination setCurrentPage={setCurrentPage} currentPage={clientsCurrentPage} postsPerPage={clientsPerPage} totalPosts={clients.length} paginate={clientPaginate} />
 
                </div>
              )
  }          
}

export default Clients
