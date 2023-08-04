import React , { useContext , useState } from 'react'
import AddInventory from './AddInventory.js'
import inventoryContext from '../../context/inventory/inventoryContext.js'
import { useNavigate, useParams } from "react-router-dom";
import Pagination from '../Products/Pagination';

const Inventory = () => {   
const navigate = useNavigate();
const params = useParams();
const inventoryId = params.id;

const context = useContext(inventoryContext);
 const { inventorys , listInventory , deleteInventory , deleteMultipleInventory} = context;
///// Paginationn by Products 

const [searchApiData, setSearchApiData] = useState([]);
const [inventoryCurrentPage, setInventoryCurrentPage] = useState(1);
const [inventoryPerPage, setInventoryPerPage] = useState(15);
const [currentPage, setCurrentPage] = useState(1);
const inventoryPaginate = pageNumber => setInventoryCurrentPage(pageNumber);
const [inventoryIds, setInventoryIds] = useState([]);

// For Multiple Checkboxes

//// For checkbox multiple deletes 

 const handleCheck = (e) => {
  const { value, checked } = e.target
  
  if (checked) {
    setInventoryIds([...inventoryIds, value]);
  } else {
    setInventoryIds(() => inventoryIds.filter((e) => e !== value));
  }
}

  if(inventoryId){
    return (
      <div>
          <AddInventory inventoryId = {inventoryId} inventorys = {inventorys} /> </div>
          )
  }else{
          
            // Get Current Products
            const indexOfLastInventory = inventoryCurrentPage * inventoryPerPage;
            const indexOfFirstInventory = indexOfLastInventory - inventoryPerPage;
            const currentInventory = inventorys.slice(indexOfFirstInventory, indexOfLastInventory);


              return (
                <div>
                    {/*
 {ids.length <= 1 ? (multiselect ?  :  : <button className='btn btn-danger fw-bold ms-2' onClick={deleteMultiple}>Delete All</button>}

                    <AddInspector inspectors={inspectors}/>*/}
                    
                    <div className ="row my-3">
                            <h2>inventorys List { inventoryIds.length > 1 ? <input type="button" value="Delete ALL " onClick={() => deleteMultipleInventory(inventoryIds)}></input>  :  ''} </h2>
                            <div className="container">
                    {currentInventory.map((inventory, index) => {
                      return (<div className="row align-items-center">
                        <div className="col-sm">{inventorys.length}{inventory.inventory_type}</div>
                        <div className="col-sm">{inventory.inventory_details}</div>
                        <div className="col-sm">{inventory.inventory_quantity}</div>  

                      <div className="col-sm"><input type="button" id={index} value="Del" onClick={() => deleteInventory(inventory._id)} /> <input type="checkBox" name={inventory._id} value={inventory._id} onClick={(e) => handleCheck(e)}></input></div>
                      <div className="col-sm"><input type="button" id={inventory._id} value="Edit" onClick={() => navigate("/inventory/" + inventory._id)} /></div>     
                        
                    
                    </div>)
                    })}
                  </div>
                    </div>
                    <Pagination setCurrentPage={setCurrentPage} currentPage={inventoryCurrentPage} postsPerPage={inventoryPerPage} totalPosts={inventorys.length} paginate={inventoryPaginate} />
 
                </div>
              )
  }          
}

export default Inventory
