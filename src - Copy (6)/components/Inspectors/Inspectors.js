import React , { useContext } from 'react'
import AddInspector from './AddInspector.js'
import inspectorContext from '../../context/inspectors/inspectorsContext.js'
import { useNavigate, useParams } from "react-router-dom";

const Inspectors = () => {   
    const navigate = useNavigate();

    const context = useContext(inspectorContext);
    const { inspectors , listInspectors , deleteInspector} = context;
  return (
    <div>
        <AddInspector/>
        <div className ="row my-3">
                <h2>Inspectors List </h2>
                <div className="container">
        {inspectors.map((inspector) => {
          return (<div className="row align-items-center">
            <div className="col-sm">{inspectors.length}{inspector.inspector_name}</div>
            <div className="col-sm">{inspector.inspector_email}</div>
            <div className="col-sm">{inspector.inspector_password}</div>  

          <div className="col-sm"><input type="button" id={inspector._id} value="Del" onClick={() => deleteInspector(inspector._id)} /></div>
          <div className="col-sm"><input type="button" id={inspector._id} value="Edit" onClick={() => navigate("/inspectors/" + inspector._id)} /></div>     
            
        
        </div>)
        })}
      </div>
        </div>
      This is the Inspector Page : 
    </div>
  )
}

export default Inspectors
