import React , { useContext } from 'react'
import clientsContext from '../context/clients/clientsContext';

const Clients = () => {
  const context = useContext(clientsContext)
  const {clients , setClients} = context;
  return (
    <div>
      <div className="container my-3">
      <h1>Add Client</h1>
        <form className="my-3">
          <div className="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
              <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
          </div>
          <div className="form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
              <label className="form-check-label" for="exampleCheck1">Check me out</label>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </div>
        <div className="container my-3">
        <h1>FSM Clients</h1>
        {clients.map((client) =>{
                return client.product_name;
          }
        )}
        </div>
    </div>
  )
}

export default Clients
