import React , { useState } from "react";
import ClientsContext from "./clientsContext";


const ClientsState = (props) => {
    const clientsInitial = [
      {
        "_id": "64940ccd2f84168b405ecc7c",
        "client_company_name": "Wondear Cement Thr",
        "client_email": "wonder33@gmail.com",
        "client_password": "Admin123!",
        "client_consultant_id": "64940c712f84168b405ecc71",
        "client_date": "2023-06-22T08:56:45.551Z",
        "__v": 0
      },
      {
        "_id": "649469aa824d79c6de375ffa",
        "client_company_name": "Wondear Cement Thf",
        "client_email": "wonder34@gmail.com",
        "client_password": "Admin123!",
        "client_consultant_id": "64940c712f84168b405ecc71",
        "client_date": "2023-06-22T15:32:58.746Z",
        "__v": 0
      },
      {
        "_id": "649469cb824d79c6de375ffd",
        "client_company_name": "Wondear Cement Ttf",
        "client_email": "wonder35@gmail.com",
        "client_password": "Admin123!",
        "client_consultant_id": "64940c712f84168b405ecc71",
        "client_date": "2023-06-22T15:33:31.012Z",
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