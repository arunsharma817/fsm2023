import React , { useState } from "react";
import ClientsContext from "./clientsContext";


const ClientsState = (props) => {
    const clientsInitial = [
        {
          "_id": "64941bbb530f65c747903b8a",
          "product_name": "Fire Exstinguisher One Updated",
          "product_type": "Fire Exstinguisher One Updated",
          "product_capacity": "Fire Exstinguisher One Updated",
          "product_consultant_id": "64941b2f530f65c747903b83",
          "product_manufactured_date": "2023-06-22T10:00:27.541Z",
          "product_due_date": "2023-06-22T10:00:27.541Z",
          "__v": 0
        },
        {
          "_id": "64941bbf530f65c747903b8c",
          "product_name": "Fire Exstinguisher One",
          "product_type": "Fire Exstinguisher One",
          "product_capacity": "Fire Exstinguisher One",
          "product_consultant_id": "64941b2f530f65c747903b83",
          "product_manufactured_date": "2023-06-22T10:00:31.206Z",
          "product_due_date": "2023-06-22T10:00:31.206Z",
          "__v": 0
        },
        {
          "_id": "64942241c177132ebdac7c19",
          "product_name": "Fire Exstinguisher Three",
          "product_type": "Fire Exstinguisher Three",
          "product_capacity": "Fire Exstinguisher Three",
          "product_consultant_id": "64941b2f530f65c747903b83",
          "product_manufactured_date": "2023-06-22T10:28:17.874Z",
          "product_due_date": "2023-06-22T10:28:17.874Z",
          "__v": 0
        }
      ]
    const [clients, setClients] = useState(clientsInitial)
    
    return(
        <ClientsContext.Provider value={{ clients , setClients }}>
            {props.children}
        </ClientsContext.Provider>

    )
}

export default ClientsState;