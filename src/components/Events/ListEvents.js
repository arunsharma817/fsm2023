import React , { useContext , useState , useEffect } from 'react'
import AddEvents from './AddEvents.js'
import EventsContext from '../../context/Events/EventsContext.js'
import { useNavigate, useParams , Link } from "react-router-dom";
import Pagination from '../Products/Pagination';
import Papa from 'papaparse';

const ListEvents = () => {
   
  const navigate = useNavigate();
  const params = useParams();
  const eventId = params.id;

  const context = useContext(EventsContext);
  const { events , setEvents ,  deleteEvents , deleteMultipleEvents} = context;

 /// For Sorting Each Columns in list 

  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSort = (columnName) => {
    if (sortColumn === columnName) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnName);
      setSortOrder('asc');
    }
  };


///// Paginationn by Products 

const [searchApiData, setSearchApiData] = useState([]);
const [eventsCurrentPage, setEventsCurrentPage] = useState(1);
const [eventsPerPage, SetEventsPerPage] = useState(15);
const [currentPage, setCurrentPage] = useState(1);
const eventsPaginate = pageNumber => setEventsCurrentPage(pageNumber);
const [eventsIds, setEventsIds] = useState([]);

////For Search 
 //// For Search
const [searchEvents, setSearchEvents] = useState('');
const [searchOldEvents, setSearchOldEvents] = useState("");
useEffect(() => {
    //inputEvent();
  }, [searchEvents]);
  
const inputEvent = (e) => {
    const data = e.target.value;
    console.log(data);  
    setSearchEvents(data);
    setSearchOldEvents(events);
    if(data == '') {
      console.log("I am here in data blank"+searchEvents);
      {events.map((searchEvent , index) => { console.log(searchEvents.length +' here'+searchEvent.event_date) } 
     
      )}
      setEvents([...events]);
    } else {
      //alert("I am here for search"+data);
      //const filterResult = data.length > 0 ? mainProducts.filter((product) => product.events_name.toLowerCase().includes(data.toLowerCase())) : setMainProducts(searchEvents) ;
      
      const filterResult = data.length === 0
      ? null 
      : events.filter((event) => event.event_date.toLowerCase().includes(data.toLowerCase()));
  
      setEvents(filterResult);
    }
  };



/// For Export  CSV 
//const [csvData, setCsvData] = useState('');

  const handleExportCSV = () => {
    // Convert the items to CSV format using papaparse
    const csv = Papa.unparse(events, {
      header: true,
    });

    // Create a Blob and URL for the CSV data
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    // Create a link and click it to trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'events.csv');
    document.body.appendChild(link);
    link.click();

    // Clean up by removing the link and revoking the URL
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };


////// For Each Column Search 

const [searchText, setSearchText] = useState({
    "event_title": ' ',
    "event_date": ' ',
    "event_venue": ' ',
    "event_city": ' ',
    "event_organizer": ' ',
    "event_organizer_address": ' ',
    "event_organizer_phone": ' ',
    "event_organizer_email":' ',
    "event_organizer_contact_person": ' ',
    "event_chief_guest": ' ',
    "event_awards_latest": ' ',
    "event_awards_nominee": ' ',
    "event_organizer_team_size": ' ',
    "event_photographer": ' ',
    "event_security_agency": ' ',
    "event_near_police_station": ' ',
    "event_near_police_station_contact": ' ',
    "event_start_date": ' ',
    "event_end_date": ' ',
    "event_caterer": ' ',
    "event_caterer_mobile": ' ',
"event_caterer_address": ' ',
    "event_electrician": ' ',
    "event_flower_decorater": ' ',
    "event_nursery_contractor": ' ',
    "event_music_system": ' ',
    "event_mentor_name": ' ',
    "event_marketing_agency": ' ',
    "event_marketing_coordinater": ' ',
    "event_sponsor_companies": ' ',
    "event_media_agencies": ' ',
    "event_transporation_agencies": ' ',
    "event_travel_agencies": ' ',
    "event_benificieries": ' ',
    "event_artists": ' ',
    "event_celebrities": ' ',
    "event_agency_founder": ' ',
    "event_agency_ceo": ' ',
    "event_agency_ceo_linkedin": ' ',
    "event_agency_ceo_mobile": ' ',
    "event_business_model": ' ',
    "event_agency_history": ' '
 });

const handleSearch = (column, value) => {
    setSearchText({ ...searchText, [column]: value });
};

/// For Multiple Delete
const handleCheck = (e) => {
  const { value, checked } = e.target
  
  if (checked) {
    setEventsIds([...eventsIds, value]);
  } else {
    setEventsIds(() => eventsIds.filter((e) => e !== value));
  }
}

  if(eventId){
    //console.log("I am here before sending to edit"+users.event_date);
    return (
      <div>
          <AddEvents eventId = {eventId} events = {events} /> </div>
          )
  }else{
          
            // Get Current Clients
            const indexOfLastEvents = eventsCurrentPage * eventsPerPage;
            const indexOfFirstEvents = indexOfLastEvents - eventsPerPage;
            const currentEvents = events.slice(indexOfFirstEvents, indexOfLastEvents);

            const sortedData = currentEvents.slice().sort((a, b) => {
                
                if(sortColumn) {
                  const aValue = a[sortColumn];
                  const bValue = b[sortColumn];
            
                  if (sortOrder === 'asc') {
                    return aValue > bValue ? 1 : -1;
                  } else {
                    return aValue < bValue ? 1 : -1;
                  }
                } else {
                  return 0;
               }
               
            });


       




              return (
                <div class="tab-pane fade show active" id="ntarget-1" role="tabpanel" aria-labelledby="ntab-1">
                <p><h4 class="heading-h4">!! Events List !!</h4> { eventsIds.length > 1 ? <input type="button" value="Delete ALL " onClick={() => deleteMultipleEvents(eventsIds)}></input>  :  ''} <button onClick={handleExportCSV}>Export CSV</button></p>
                <input type="search" name="searchbox" value= { searchEvents} placeholder='Search Here' onChange={(e) => inputEvent(e)} />

                <div class="table-container">
                    <table id="client-list" class="table table-bordered display">  
                        <thead>
                        <tr>                                                                    
                                <th onClick={() => handleSort('event_title')}>  Mfg. Name
                                {sortColumn === 'event_title' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('event_date')}>  Industry 
                                {sortColumn === 'event_date' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('event_venue')}> Products
                                {sortColumn === 'event_venue' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								 <th onClick={() => handleSort('event_city')}>  Mobile
                                {sortColumn === 'event_city' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('event_organizer')}>  Alternate Mobile 
                                {sortColumn === 'event_organizer' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('event_organizer_address')}> Email Id
                                {sortColumn === 'event_organizer_address' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								<th onClick={() => handleSort('event_organizer_phone')}>  Website
                                {sortColumn === 'event_organizer_phone' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('event_organizer_email')}>  Reg. Address 
                                {sortColumn === 'event_organizer_email' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('event_organizer_contact_person')}> Zip Code
                                {sortColumn === 'event_organizer_contact_person' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								 <th onClick={() => handleSort('event_chief_guest')}>  City
                                {sortColumn === 'event_chief_guest' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('event_awards_latest')}> State 
                                {sortColumn === 'event_awards_latest' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('event_awards_nominee')}> Country
                                {sortColumn === 'event_awards_nominee' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								
								<th onClick={() => handleSort('event_organizer_team_size')}>  Country Code
                                {sortColumn === 'event_organizer_team_size' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('event_photographer')}>  Continent 
                                {sortColumn === 'event_photographer' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('event_security_agency')}> Customr Care
                                {sortColumn === 'event_security_agency' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								 <th onClick={() => handleSort('event_near_police_station')}>  QR Code
                                {sortColumn === 'event_near_police_station' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('event_near_police_station_contact')}>  Barcode Number 
                                {sortColumn === 'event_near_police_station_contact' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('event_start_date')}> Foundation Date
                                {sortColumn === 'event_start_date' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								<th onClick={() => handleSort('event_end_date')}>  License
                                {sortColumn === 'event_end_date' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('event_caterer')}>  PAN 
                                {sortColumn === 'event_caterer' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('event_caterer_mobile')}> GST
                                {sortColumn === 'event_caterer_mobile' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								 <th onClick={() => handleSort('event_caterer_address')}>  Corp. Certi.
                                {sortColumn === 'event_caterer_address' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('event_electrician')}> Gumasta 
                                {sortColumn === 'event_electrician' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('event_flower_decorater')}> MOA 
                                {sortColumn === 'event_flower_decorater' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>

                                <th onClick={() => handleSort('event_nursery_contractor')}> MSME 
                                {sortColumn === 'event_nursery_contractor' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								 <th onClick={() => handleSort('event_music_system')}>  Act Details
                                {sortColumn === 'event_music_system' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('event_mentor_name')}> Cancelled Cheque 
                                {sortColumn === 'event_mentor_name' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('event_marketing_agency')}> Employees Number 
                                {sortColumn === 'event_marketing_agency' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								
								 <th onClick={() => handleSort('event_marketing_coordinater')}>  Dir. FName
                                {sortColumn === 'event_marketing_coordinater' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('event_sponsor_companies')}> Dir. LName
                                {sortColumn === 'event_sponsor_companies' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('event_media_agencies')}> Dir. Email 
                                {sortColumn === 'event_media_agencies' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								
								 <th onClick={() => handleSort('event_transporation_agencies')}>  Dir. Mobile
                                {sortColumn === 'event_transporation_agencies' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('event_travel_agencies')}> Dir. LinkedIn
                                {sortColumn === 'event_travel_agencies' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('event_benificieries')}> Event Reviews 
                                {sortColumn === 'event_benificieries' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								<th onClick={() => handleSort('event_artists')}> Dir. LinkedIn
                                {sortColumn === 'event_artists' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('event_celebrities')}> Event Reviews 
                                {sortColumn === 'event_celebrities' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								<th onClick={() => handleSort('event_agency_founder')}> Instagram
                                {sortColumn === 'event_agency_founder' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('event_agency_ceo')}> LinkedIn
                                {sortColumn === 'event_agency_ceo' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								<th onClick={() => handleSort('event_agency_ceo_linkedin')}> Youtube 
                                {sortColumn === 'event_agency_ceo_linkedin' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('event_agency_ceo_mobile')}> Countries 
                                {sortColumn === 'event_agency_ceo_mobile' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
								<th onClick={() => handleSort('event_business_model')}> Atrributes
                                {sortColumn === 'event_business_model' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('event_agency_history')}> History 
                                {sortColumn === 'event_agency_history' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
                                <th>Action</th>                                                                    
                            </tr>
                            <tr>                                                                    
                                <td><input type="text" value={searchText.event_title} onChange={(e) => handleSearch('event_title', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.event_date} onChange={(e) => handleSearch('event_date', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.event_venue} onChange={(e) => handleSearch('event_venue', e.target.value)}/>
                                
                               
                                </td>
								
								 <td><input type="text" value={searchText.event_city} onChange={(e) => handleSearch('event_city', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.event_organizer} onChange={(e) => handleSearch('event_organizer', e.target.value)}/>   
                                
                                
                                </td>
                                <td><input type="text" value={searchText.event_organizer_address} onChange={(e) => handleSearch('event_organizer_address', e.target.value)}/> 
                                
                               
                                </td>
								
								<td><input type="text" value={searchText.event_organizer_phone} onChange={(e) => handleSearch('event_organizer_phone', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.event_organizer_email} onChange={(e) => handleSearch('event_organizer_email', e.target.value)}/>   
                                
                                
                                </td>
                                <td><input type="text" value={searchText.event_organizer_contact_person} onChange={(e) => handleSearch('event_organizer_contact_person', e.target.value)}/> 
                                
                               
                                </td>
								
								 <td><input type="text" value={searchText.event_chief_guest} onChange={(e) => handleSearch('event_chief_guest', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.event_awards_latest} onChange={(e) => handleSearch('event_awards_latest', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.event_awards_nominee} onChange={(e) => handleSearch('event_awards_nominee', e.target.value)}/>
                                
                               
                                </td>
								
								
								<td><input type="text" value={searchText.event_organizer_team_size} onChange={(e) => handleSearch('event_organizer_team_size', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.event_photographer} onChange={(e) => handleSearch('event_photographer', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.event_security_agency} onChange={(e) => handleSearch('event_security_agency', e.target.value)}/> 
                                
                               
                                </td>
								
								 <td><input type="text" value={searchText.event_near_police_station} onChange={(e) => handleSearch('event_near_police_station', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.event_near_police_station_contact} onChange={(e) => handleSearch('event_near_police_station_contact', e.target.value)}/>   
                                
                                
                                </td>
                                <td><input type="text" value={searchText.event_start_date} onChange={(e) => handleSearch('event_start_date', e.target.value)}/> 
                                
                               
                                </td>
								
								<td><input type="text" value={searchText.event_end_date} onChange={(e) => handleSearch('event_end_date', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.event_caterer} onChange={(e) => handleSearch('event_caterer', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.event_caterer_mobile} onChange={(e) => handleSearch('event_caterer_mobile', e.target.value)}/>
                                
                               
                                </td>
								
								 <td><input type="text" value={searchText.event_caterer_address} onChange={(e) => handleSearch('event_caterer_address', e.target.value)}/>                                  
                                
                                </td>
                                <td><input type="text" value={searchText.event_electrician} onChange={(e) => handleSearch('event_electrician', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.event_flower_decorater} onChange={(e) => handleSearch('event_flower_decorater', e.target.value)}/> 
                                
                               
                                </td>
								
                                <td><input type="text" value={searchText.event_nursery_contractor} onChange={(e) => handleSearch('event_nursery_contractor', e.target.value)}/>  
</td>
								 <td><input type="text" value={searchText.event_music_system} onChange={(e) => handleSearch('event_music_system', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.event_mentor_name} onChange={(e) => handleSearch('event_mentor_name', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.event_marketing_agency} onChange={(e) => handleSearch('event_marketing_agency', e.target.value)}/>  
                                
                               
                                </td>
								
								
								 <td><input type="text" value={searchText.event_marketing_coordinater} onChange={(e) => handleSearch('event_marketing_coordinater', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.event_sponsor_companies} onChange={(e) => handleSearch('event_sponsor_companies', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.event_media_agencies} onChange={(e) => handleSearch('event_media_agencies', e.target.value)}/>  
                                
                               
                                </td>
								
								 <td><input type="text" value={searchText.event_transporation_agencies} onChange={(e) => handleSearch('event_transporation_agencies', e.target.value)}/>  
                                
                                
                                </td>
                                <td><input type="text" value={searchText.event_travel_agencies} onChange={(e) => handleSearch('event_travel_agencies', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.event_benificieries} onChange={(e) => handleSearch('event_benificieries', e.target.value)}/>  
                                
                               
                                </td>
								<td><input type="text" value={searchText.event_artists} onChange={(e) => handleSearch('event_artists', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.event_celebrities} onChange={(e) => handleSearch('event_celebrities', e.target.value)}/> 
                                
                               
                                </td>
								<td><input type="text" value={searchText.event_agency_founder} onChange={(e) => handleSearch('event_agency_founder', e.target.value)}/>
                                
                                
                                </td>
                                <td><input type="text" value={searchText.event_agency_ceo} onChange={(e) => handleSearch('event_agency_ceo', e.target.value)}/>
                                
                               
                                </td>
								<td><input type="text" value={searchText.event_agency_ceo_linkedin} onChange={(e) => handleSearch('event_agency_ceo_linkedin', e.target.value)}/> 
                                
                                
                                </td>
                                <td><input type="text" value={searchText.event_agency_ceo_mobile} onChange={(e) => handleSearch('event_agency_ceo_mobile', e.target.value)}/> 
                                
                               
                                </td>
								<td><input type="text" value={searchText.event_business_model} onChange={(e) => handleSearch('event_business_model', e.target.value)}/>
                                
                                
                                </td>
                                <td><input type="text" value={searchText.event_agency_history} onChange={(e) => handleSearch('event_agency_history', e.target.value)}/>                      
                               
                                </td>
                                <td>Action</td>                                                                    
                            </tr>
                        </thead>  
                    <tbody>                 
                            
                            {sortedData.map((event , index) => {
                              return (<tr>
                                <td>{events.length}{event.event_title}</td>
                                <td>{event.event_date}</td>
                                <td>{event.event_venue}</td>  
								<td>{events.length}{event.event_city}</td>
                                <td>{event.event_organizer}</td>
                                <td>{event.event_organizer_address}</td> 
								<td>{events.length}{event.event_organizer_phone}</td>
                                <td>{event.event_organizer_email}</td>
                                <td>{event.event_organizer_contact_person}</td> 
                                <td>{event.event_chief_guest}</td>
                                <td>{event.event_awards_latest}</td> 
                                <td>{event.event_awards_nominee}</td>
                                <td>{event.event_organizer_team_size}</td> 
								                <td>{events.length}{event.event_photographer}</td>
                                <td>{event.event_security_agency}</td>
                                <td>{event.event_near_police_station}</td> 
								                <td>{events.length}{event.event_near_police_station_contact}</td>
                                <td>{event.event_start_date}</td>
                                <td>{event.event_end_date}</td> 
								                <td>{event.event_caterer}</td>
                                <td>{event.event_caterer_mobile}</td> 
								                <td>{event.event_caterer_address}</td>
                                <td>{event.event_electrician}</td> 
								                <td>{event.event_flower_decorater}</td>
                                <td>{event.event_nursery_contractor}</td> 
								                <td>{event.event_music_system}</td> 
								                <td>{event.event_mentor_name}</td>
                                <td>{event.event_marketing_agency}</td> 
								                <td>{event.event_marketing_coordinater}</td> 
								                <td>{event.event_sponsor_companies}</td>
                                <td>{event.event_media_agencies}</td> 
								                <td>{event.event_transporation_agencies}</td> 
								                <td>{event.event_travel_agencies}</td>
                                <td>{event.event_benificieries}</td> 
								                <td>{event.event_artists}</td> 
								                <td>{event.event_celebrities}</td>
                                <td>{event.event_agency_founder}</td> 
								                <td>{event.event_agency_ceo}</td>
                                <td>{event.event_agency_ceo_linkedin}</td> 
								                <td>{event.event_agency_ceo_mobile}</td> 
								                <td>{event.event_business_model}</td>
                                <td>{event.event_agency_history}</td> 
                                <td>
                                  <div class="btn-group">
                                  <span  class="btn btn-success btn-xs" onClick={() => navigate("/events/" + event._id)}><i class="bi bi-pencil"></i></span>
                                  <Link  class="btn btn-danger btn-xs" onClick={() => deleteEvents(event._id)}><i class="bi bi-trash"></i></Link>        
                                    <div className="col-sm"> <input type="checkBox" checked={eventsIds.includes(event._id)} name={event._id} value={event._id} onClick={(e) => handleCheck(e)}></input></div>
                                  </div>
                                </td> 
                            
                            </tr>)
                            })} 
        
              </tbody>
              </table>
                </div>					
                             <Pagination setCurrentPage={setCurrentPage} currentPage={eventsCurrentPage} postsPerPage={eventsPerPage} totalPosts={events.length} paginate={eventsPaginate} />
        
        </div>
              )
  }          
}

export default ListEvents
