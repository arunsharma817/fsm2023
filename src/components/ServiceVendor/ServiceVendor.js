import React , { useContext , useState } from 'react'
import AddServiceVendorForm from './AddServiceVendorForm.js'
import servicevendorContext from '../../context/servicevendor/servicevendorContext.js'
import { useNavigate, useParams } from "react-router-dom";
import Pagination from '../Products/Pagination';


const ServiceVendor = () => {
   
  const navigate = useNavigate();
  const params = useParams();
  const serviceVendorId = params.id;

  const context = useContext(servicevendorContext);
  const { serviceVendors ,  deleteServiceVendor , deleteMultipleServiceVendor} = context;
///// Paginationn by Products 

const [searchApiData, setSearchApiData] = useState([]);
const [serviceVendorCurrentPage, setServiceVendorCurrentPage] = useState(1);
const [serviceVendorsPerPage, setServiceVendorPerPage] = useState(15);
const [currentPage, setCurrentPage] = useState(1);
const servicePaginate = pageNumber => setServiceVendorCurrentPage(pageNumber);
const [serviceVendorIds, setServiceVendorIds] = useState([]);

// For Multiple Checkboxes

 //// For checkbox multiple deletes 

 const handleCheck = (e) => {
  const { value, checked } = e.target
  
  if (checked) {
    setServiceVendorIds([...serviceVendorIds, value]);
  } else {
    setServiceVendorIds(() => serviceVendorIds.filter((e) => e !== value));
  }
}
  if(serviceVendorId){
    console.log("I am here before sending to edit"+serviceVendorId);
    return (
      <div>
          <AddServiceVendorForm serviceVendorId = {serviceVendorId} serviceVendors= {serviceVendors} /> </div>
          )
  }else{
          
            // Get Current Clients
            const indexOfLastServiceVendor = serviceVendorCurrentPage * serviceVendorsPerPage;
            const indexOfFirstServiceVendor = indexOfLastServiceVendor - serviceVendorsPerPage;
            const currentServiceVendors = serviceVendors.slice(indexOfFirstServiceVendor, indexOfLastServiceVendor);


              return (
                <div>                    
                    <div className ="row my-3">
                            <h2>Vendors  List { serviceVendorIds.length > 1 ? <input type="button" value="Delete ALL " onClick={() => deleteMultipleServiceVendor(serviceVendorIds)}></input>  :  ''} </h2>
                            <div className="container">
                    {currentServiceVendors.map((serviceVendor , index) => {
                      return (<div className="row align-items-center">
                        <div className="col-sm">{serviceVendors.length}{serviceVendor.service_vendor_fname}</div>
                        <div className="col-sm">{serviceVendor.service_vendor_lname}</div>
                        <div className="col-sm">{serviceVendor.service_vendor_type}</div>  

                      <div className="col-sm"><input type="button" id={index} value="Del" onClick={() => deleteServiceVendor(serviceVendor._id)} /> <input type="checkBox" name={serviceVendor._id} value={serviceVendor._id} onClick={(e) => handleCheck(e)}></input></div>
                      <div className="col-sm"><input type="button" id={serviceVendor._id} value="Edit" onClick={() => navigate("/servicevendor/" + serviceVendor._id)} /></div>  
                        
                    
                    </div>)
                    })}
                  </div>
                    </div>
                    <Pagination setCurrentPage={setCurrentPage} currentPage={serviceVendorCurrentPage} postsPerPage={serviceVendorsPerPage} totalPosts={serviceVendors.length} paginate={servicePaginate} />
 
                </div>
              )
  }          
}

export default ServiceVendor
