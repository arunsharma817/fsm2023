import React , { useContext , useState , useEffect } from 'react'
import AddSocialLinks from './AddSocialLinks.js'
import SocialLinksContext from '../../context/SocialLinks/SocialLinksContext.js'
import { useNavigate, useParams , Link } from "react-router-dom";
import Pagination from '../Products/Pagination';
import Papa from 'papaparse';

const ListSocialLinks = () => {
   
  const navigate = useNavigate();
  const params = useParams();
  const socialLinkId = params.id;

  const context = useContext(SocialLinksContext);
  const { socialLinks , setSocialLinks ,  deleteSocialLinks , deleteMultipleSocialLinks} = context;

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
const [socialLinksCurrentPage, setSocialLinksCurrentPage] = useState(1);
const [socialLinksPerPage, SetSocialLinksPerPage] = useState(15);
const [currentPage, setCurrentPage] = useState(1);
const socialLinksPaginate = pageNumber => setSocialLinksCurrentPage(pageNumber);
const [socialLinksIds, setSocialLinksIds] = useState([]);

////For Search 
 //// For Search
const [searchSocialLinks, setSearchSocialLinks] = useState('');
const [searchOldSocialLinks, setSearchOldSocialLinks] = useState("");
useEffect(() => {
    //inputEvent();
  }, [searchSocialLinks]);
  
const inputEvent = (e) => {
    const data = e.target.value;
    console.log(data);  
    setSearchSocialLinks(data);
    setSearchOldSocialLinks(socialLinks);
    if(data == '') {
      console.log("I am here in data blank"+searchSocialLinks);
      {socialLinks.map((searchSocialLink , index) => { console.log(searchSocialLinks.length +' here'+searchSocialLink.social_link_title) } 
     
      )}
      setSocialLinks([...socialLinks]);
    } else {
      //alert("I am here for search"+data);
      //const filterResult = data.length > 0 ? mainProducts.filter((product) => product.society_members_name.toLowerCase().includes(data.toLowerCase())) : setMainProducts(searchSocialLinks) ;
      
      const filterResult = data.length === 0
      ? null 
      : socialLinks.filter((socialLink) => socialLink.social_link_title.toLowerCase().includes(data.toLowerCase()));
  
      setSocialLinks(filterResult);
    }
  };



/// For Export  CSV 
//const [csvData, setCsvData] = useState('');

  const handleExportCSV = () => {
    // Convert the items to CSV format using papaparse
    const csv = Papa.unparse(socialLinks, {
      header: true,
    });

    // Create a Blob and URL for the CSV data
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    // Create a link and click it to trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'socialLinks.csv');
    document.body.appendChild(link);
    link.click();

    // Clean up by removing the link and revoking the URL
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };


////// For Each Column Search 

const [searchText, setSearchText] = useState({
    social_link_title: '',
    social_link_icon: '',
    social_link_source_url: '',
  });

const handleSearch = (column, value) => {
    setSearchText({ ...searchText, [column]: value });
};

/// For Multiple Delete
const handleCheck = (e) => {
  const { value, checked } = e.target
  
  if (checked) {
    setSocialLinksIds([...socialLinksIds, value]);
  } else {
    setSocialLinksIds(() => socialLinksIds.filter((e) => e !== value));
  }
}

  if(socialLinkId){
    //console.log("I am here before sending to edit"+users.social_link_title);
    return (
      <div>
          <AddSocialLinks socialLinkId = {socialLinkId} socialLinks = {socialLinks} /> </div>
          )
  }else{
          
            // Get Current Clients
            const indexOfLastSocialLinks = socialLinksCurrentPage * socialLinksPerPage;
            const indexOfFirstSocialLinks = indexOfLastSocialLinks - socialLinksPerPage;
            console.log("Checking Type Of"+typeof(socialLinks));
            console.log("Checking length of Social Link State"+socialLinks);
            const currentSocialLinks = socialLinks.slice(indexOfFirstSocialLinks, indexOfLastSocialLinks);
          
            const sortedData = currentSocialLinks.slice().sort((a, b) => {
                
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


            const filteredData = sortedData.filter((item) => {
                return (
                  item.social_link_title.toLowerCase().includes(searchText.social_link_title.toLowerCase()) &&
                  item.social_link_icon.toString().includes(searchText.social_link_icon) &&
                  item.social_link_source_url.toLowerCase().includes(searchText.social_link_source_url.toLowerCase())
                );
              });




              return (
                <div class="tab-pane fade show active" id="ntarget-1" role="tabpanel" aria-labelledby="ntab-1">
                <p><h4 class="heading-h4">!! Society Members List !!</h4> { socialLinksIds.length > 1 ? <input type="button" value="Delete ALL " onClick={() => deleteMultipleSocialLinks(socialLinksIds)}></input>  :  ''} <button onClick={handleExportCSV}>Export CSV</button></p>
                <input type="search" name="searchbox" value= { searchSocialLinks} placeholder='Search Here' onChange={(e) => inputEvent(e)} />

                <div class="table-container">
                    <table id="client-list" class="table table-bordered display">  
                        <thead>
                            <tr>                                                                    
                                <th onClick={() => handleSort('social_link_title')}>  Name
                                {sortColumn === 'social_link_title' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('social_link_icon')}>  Email Id
                                {sortColumn === 'social_link_icon' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                                
                                </th>
                                <th onClick={() => handleSort('social_link_source_url')}> Mobile
                                {sortColumn === 'social_link_source_url' && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
                               
                                </th>
                                <th>Action</th>                                                                    
                            </tr>
                            <tr>
                                <td><input
              type="text"
              value={searchText.social_link_title}
              onChange={(e) => handleSearch('social_link_title', e.target.value)}
            /></td>
                                <td><input
              type="text"
              value={searchText.social_link_icon}
              onChange={(e) => handleSearch('social_link_icon', e.target.value)}
            /></td>
                                <td> <input
              type="text"
              value={searchText.social_link_source_url}
              onChange={(e) => handleSearch('social_link_source_url', e.target.value)}
            /></td>
                                <td></td>
                            
                            </tr>
                        </thead>  
                    <tbody>                 
                            
                            {filteredData.map((socialLink , index) => {
                              return (<tr>
                                <td>{socialLinks.length}{socialLink.social_link_title}</td>
                                <td>{socialLink.social_link_icon}</td>
                                <td>{socialLink.social_link_source_url}</td>  
                                <td>
                                  <div class="btn-group">
                                  <span  class="btn btn-success btn-xs" onClick={() => navigate("/sociallinks/" + socialLink._id)}><i class="bi bi-pencil"></i></span>
                                  <Link  class="btn btn-danger btn-xs" onClick={() => deleteSocialLinks(socialLink._id)}><i class="bi bi-trash"></i></Link>
        
                                    <div className="col-sm"> <input type="checkBox" checked={socialLinksIds.includes(socialLink._id)} name={socialLink._id} value={socialLink._id} onClick={(e) => handleCheck(e)}></input></div>
                                  </div>
                                </td> 
                            
                            </tr>)
                            })} 
        
              </tbody>
              </table>
                </div>					
                             <Pagination setCurrentPage={setCurrentPage} currentPage={socialLinksCurrentPage} postsPerPage={socialLinksPerPage} totalPosts={socialLinks.length} paginate={socialLinksPaginate} />
        
        </div>
              )
  }          
}

export default ListSocialLinks
