import React, { useContext } from 'react'
import clientContext from "../../context/clients/clientsContext";

const Clients = () => {
    const context = useContext(clientContext);
    const {clients , setClients } = context; 
  return (
    <div>
      This is Client Page  
    </div>
  )
}

export default Clients
