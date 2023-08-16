import React from 'react'
import ListManufacturers from './ListManufacturers.js'
import AddManufacturers from './AddTest.js'
import ImportManufacturers from './ImportManufacturers.js'
const BoardManufacturers = () => {
  return (
    
                <div class="row g-0">
                    <div class="col-12 inner-wrapper">
                        <div class="row">
                            <div class="col-12 wrap-head">
                                <h3>!! Manufacturers Board - Fire Safety Management !!</h3>
                            </div>
                            <div class="col-12 wrap-content">
                                <div class="row g-0">
                                    <div class="col-12 card">
                                        <div class="card-header p-0">
                                            <ul class="nav nav-tabs" id="myTab" role="tablist">
                                                <li class="nav-item" role="presentation">
                                                    <button class="nav-link active" id="ntab-1" data-bs-toggle="tab" data-bs-target="#ntarget-1" type="button" role="tab" aria-controls="ntarget-1" aria-selected="true">Manufacturers List</button>
                                                </li>
                                                <li class="nav-item" role="presentation">
                                                    <button class="nav-link" id="ntab-2" data-bs-toggle="tab" data-bs-target="#ntarget-2" type="button" role="tab" aria-controls="ntarget-2" aria-selected="false">Add Manufacturers</button>
                                                </li>
                                                <li class="nav-item" role="presentation">
                                                    <button class="nav-link" id="ntab-3" data-bs-toggle="tab" data-bs-target="#ntarget-3" type="button" role="tab" aria-controls="ntarget-3" aria-selected="false">Import Manufacturers</button>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="card-body">
                                            <div class="tab-content" id="myTabContent">
                                            <ListManufacturers  />
                                                <div class="tab-pane fade" id="ntarget-2" role="tabpanel" aria-labelledby="ntab-2">
                                                    
                                                    <AddManufacturers  />
                                                </div>
                                                <div class="tab-pane fade" id="ntarget-3" role="tabpanel" aria-labelledby="ntab-3">
                                                    
                                                    <ImportManufacturers  />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
           
  )
}

export default BoardManufacturers
