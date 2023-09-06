import React, { useEffect, useState } from "react";
import PratyashisContext from "./PratyashisContext";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { confirm } from "react-confirm-box";

const PratyashisState = (props) => {
  const ownerToken = localStorage.getItem('token');
  const [pratyashis, setPratyashis] = useState([])
  const [apiResponseMessages, setApiResponseMessages] = useState([]);

  const initialValues = {
    "pratyashi_yuvak_yuvati": "",
    "pratyashi_vishesh_parishisht": "",
    "pratyashi_adhik_aayu": "",
    "pratyashi_talakshuda": "",
    "pratyashi_pura_name": "",
    "pratyashi_janm_dinank": "",
    "pratyashi_janm_ghanta": "",
    "pratyashi_janm_minute":"",
    "pratyashi_janm_ampm": "",
    "pratyashi_sthan_rajya": "",
    "pratyashi_sthan_zila": "",
    "pratyashi_sthan_gaaon_shahar": "",
    "pratyashi_gautra_swyam": "",
    "pratyashi_gautra_nanihal": "",
    "pratyashi_sharirik_uchai": "",
    "pratyashi_sharirik_inch": "",
    "pratyashi_sharirik_vajan": "",
    "pratyashi_sharirik_rang": "",
    "pratyashi_jankari_rashi": "",
    "pratyashi_jankari_nakshatr": "",
    "pratyashi_jankari_naadi": "",
"pratyashi_jankari_charan": "",
    "pratyashi_manglik": "",
    "pratyashi_shani": "",
    "pratyashi_patrika_milan": "",
    "pratyashi_shekshanik_yogyata": "",
    "pratyashi_vyavsay": "",
    "pratyashi_masik_aay": "",
    "pratyashi_pita_vyavsay": "",
    "pratyashi_pita_masik_aay": "",
    "pratyashi_pita_naam": "",
    "pratyashi_vartaman_pata": "",
    "pratyashi_vartaman_rajya": "",
    "pratyashi_vartaman_zila": "",
    "pratyashi_vartaman_gaaon_shahar": "",
    "pratyashi_vartaman_pincode": "",
    "pratyashi_sthayi_pata": "",
    "pratyashi_sthayi_rajya": "",
    "pratyashi_sthayi_zila": "",
    "pratyashi_sthayi_gaaon_shahar": "",
    "pratyashi_sthayi_pin_code": "",
    "pratyashi_photo": ""
 };
   const [formValues, setFormValues] = useState(initialValues);

  //// Route 1 : This is useEffect , which calles everytime the page loads , it has State to display the clients List 

  useEffect(() => {

    /// Listing Clients 
    const fetchPratyashis = async () => {
      const getPratyashis = await axios.get(`http://localhost:5000/api/pratyashis/list`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "owner-token": ownerToken
        }
      });
      console.log(getPratyashis.data);
      return setPratyashis(getPratyashis.data);
    }
    fetchPratyashis();
  }, []);

  // Add Client State 

  const addPratyashis = (text) => {
     const newPratyashi = {     
      pratyashi_yuvak_yuvati: text.pratyashi_yuvak_yuvati,
            pratyashi_vishesh_parishisht: text.pratyashi_vishesh_parishisht,
            pratyashi_adhik_aayu: text.pratyashi_adhik_aayu,
			pratyashi_talakshuda: text.pratyashi_talakshuda,
            pratyashi_pura_name: text.pratyashi_pura_name,
            pratyashi_janm_dinank: text.pratyashi_janm_dinank,
            pratyashi_janm_ghanta: text.pratyashi_janm_ghanta,
			pratyashi_janm_minute: text.pratyashi_janm_minute,
            pratyashi_janm_ampm: text.pratyashi_janm_ampm,
			pratyashi_sthan_rajya: text.pratyashi_sthan_rajya,
            pratyashi_sthan_zila: text.pratyashi_sthan_zila,
            pratyashi_sthan_gaaon_shahar: text.pratyashi_sthan_gaaon_shahar,	
			pratyashi_gautra_swyam: text.pratyashi_gautra_swyam,
			pratyashi_gautra_nanihal: text.pratyashi_gautra_nanihal,
            pratyashi_sharirik_uchai: text.pratyashi_sharirik_uchai,
            pratyashi_sharirik_inch: text.pratyashi_sharirik_inch,
			pratyashi_sharirik_vajan: text.pratyashi_sharirik_vajan,
			pratyashi_sharirik_rang: text.pratyashi_sharirik_rang,
            pratyashi_jankari_rashi: text.pratyashi_jankari_rashi,
            pratyashi_jankari_nakshatr: text.pratyashi_jankari_nakshatr,
			pratyashi_jankari_naadi: text.pratyashi_jankari_naadi,
			pratyashi_jankari_charan: text.pratyashi_jankari_charan,
            pratyashi_manglik: text.pratyashi_manglik,
            pratyashi_shani: text.pratyashi_shani,	
			pratyashi_patrika_milan: text.pratyashi_patrika_milan,
			pratyashi_shekshanik_yogyata: text.pratyashi_shekshanik_yogyata,
            pratyashi_vyavsay: text.pratyashi_vyavsay,
            pratyashi_masik_aay: text.pratyashi_masik_aay,
			pratyashi_pita_vyavsay: text.pratyashi_pita_vyavsay,
			pratyashi_pita_masik_aay: text.pratyashi_pita_masik_aay,
            pratyashi_pita_naam: text.pratyashi_pita_naam,
            pratyashi_vartaman_pata: text.pratyashi_vartaman_pata,
			pratyashi_vartaman_rajya: text.pratyashi_vartaman_rajya,
			pratyashi_vartaman_zila: text.pratyashi_vartaman_zila,
            pratyashi_vartaman_gaaon_shahar: text.pratyashi_vartaman_gaaon_shahar,
            pratyashi_vartaman_pincode: text.pratyashi_vartaman_pincode,
			pratyashi_sthayi_pata: text.pratyashi_sthayi_pata,
			pratyashi_sthayi_rajya: text.pratyashi_sthayi_rajya,
            pratyashi_sthayi_zila: text.pratyashi_sthayi_zila,
            pratyashi_sthayi_gaaon_shahar: text.pratyashi_sthayi_gaaon_shahar,
			pratyashi_sthayi_pin_code: text.pratyashi_sthayi_pin_code,
            pratyashi_photo: text.pratyashi_photo
    }
    axios.post('http://localhost:5000/api/pratyashis/create', newPratyashi, {
      headers: {
        'owner-token': ownerToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp => {
      console.log(resp.data._id);
      const newPratyashis = {
        _id: resp.data._id,
        pratyashi_yuvak_yuvati: text.pratyashi_yuvak_yuvati,
            pratyashi_vishesh_parishisht: text.pratyashi_vishesh_parishisht,
            pratyashi_adhik_aayu: text.pratyashi_adhik_aayu,
			      pratyashi_talakshuda: text.pratyashi_talakshuda,
            pratyashi_pura_name: text.pratyashi_pura_name,
            pratyashi_janm_dinank: text.pratyashi_janm_dinank,
            pratyashi_janm_ghanta: text.pratyashi_janm_ghanta,
			pratyashi_janm_minute: text.pratyashi_janm_minute,
            pratyashi_janm_ampm: text.pratyashi_janm_ampm,
			pratyashi_sthan_rajya: text.pratyashi_sthan_rajya,
            pratyashi_sthan_zila: text.pratyashi_sthan_zila,
            pratyashi_sthan_gaaon_shahar: text.pratyashi_sthan_gaaon_shahar,	
			pratyashi_gautra_swyam: text.pratyashi_gautra_swyam,
			pratyashi_gautra_nanihal: text.pratyashi_gautra_nanihal,
            pratyashi_sharirik_uchai: text.pratyashi_sharirik_uchai,
            pratyashi_sharirik_inch: text.pratyashi_sharirik_inch,
			pratyashi_sharirik_vajan: text.pratyashi_sharirik_vajan,
			pratyashi_sharirik_rang: text.pratyashi_sharirik_rang,
            pratyashi_jankari_rashi: text.pratyashi_jankari_rashi,
            pratyashi_jankari_nakshatr: text.pratyashi_jankari_nakshatr,
			pratyashi_jankari_naadi: text.pratyashi_jankari_naadi,
			pratyashi_jankari_charan: text.pratyashi_jankari_charan,
            pratyashi_manglik: text.pratyashi_manglik,
            pratyashi_shani: text.pratyashi_shani,	
			pratyashi_patrika_milan: text.pratyashi_patrika_milan,
			pratyashi_shekshanik_yogyata: text.pratyashi_shekshanik_yogyata,
            pratyashi_vyavsay: text.pratyashi_vyavsay,
            pratyashi_masik_aay: text.pratyashi_masik_aay,
			pratyashi_pita_vyavsay: text.pratyashi_pita_vyavsay,
			pratyashi_pita_masik_aay: text.pratyashi_pita_masik_aay,
            pratyashi_pita_naam: text.pratyashi_pita_naam,
            pratyashi_vartaman_pata: text.pratyashi_vartaman_pata,
			pratyashi_vartaman_rajya: text.pratyashi_vartaman_rajya,
			pratyashi_vartaman_zila: text.pratyashi_vartaman_zila,
            pratyashi_vartaman_gaaon_shahar: text.pratyashi_vartaman_gaaon_shahar,
            pratyashi_vartaman_pincode: text.pratyashi_vartaman_pincode,
			pratyashi_sthayi_pata: text.pratyashi_sthayi_pata,
			pratyashi_sthayi_rajya: text.pratyashi_sthayi_rajya,
            pratyashi_sthayi_zila: text.pratyashi_sthayi_zila,
            pratyashi_sthayi_gaaon_shahar: text.pratyashi_sthayi_gaaon_shahar,
			pratyashi_sthayi_pin_code: text.pratyashi_sthayi_pin_code,
            pratyashi_photo: text.pratyashi_photo       
      }
      {/* I managed "setInspectors" from my end to add immediate when successfully added into the database */ }
      setPratyashis((oldPratyashis) => {
        return [...oldPratyashis, newPratyashis];
      })      
      ///return { message : text.pratyashi_fname+" The New User has been successfully Added!!"};
      
      setApiResponseMessages(<div className="alert alert-success">
      <strong> <pre>{JSON.stringify(newPratyashis, null, 2)}</pre>Success! {text.pratyashi_yuvak_yuvati} </strong> The New Manufacturer has been successfully Added!!
      </div>);
      setFormValues(initialValues);
    }).catch(error => {
      console.error('There was an error!', "Error Name:"+error.name +" , Error Code :"+error.message );
      
      setApiResponseMessages(<div className="alert error">     
      <strong>Error!</strong>Error Name:{error.name} Error Code :{error.message}
    </div>);
      //return { message : 'There was an error!' };      
    });
   return 1;
  }

  // Delete Client State 

  const deletePratyashis = (getManufacturerId) => {
    const pratyashiId = getManufacturerId;
    //const result =  confirm("Are you sure?");
    const apiDelete = "http://localhost:5000/api/pratyashis/delete/" + pratyashiId;
    //alert("resule of Confirm"+result);  
    if (window.confirm('Are you sure, want to delete the selected Client?')) {
      console.log("You click yes!" + pratyashiId);
      const response = fetch(apiDelete, {
        method: 'DELETE',
        headers: {
          'owner-token': ownerToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(resp => {

        {/* I managed "setPratyashis" from my end to add immediate when successfully added into the database */ }
        setPratyashis((pratyashis) => {
          //alert("I am here in delete Immediate Statement")
          {/*return inspectors.filter((arrElem , _id) => { alert ('index:'+ _id +',inspectorId:'+inspectorId)
                        return _id !== inspectorId; 
              })*/}
          return pratyashis.filter((res) => res._id !== pratyashiId);
        })
      }).catch(error => {
        console.error('There was an error!', error);
      });
      const json = response.json;
      //listProducts()
    }
  }
  // Edit an Inspector 

  const editPratyashis = (text, pratyashiId) => {

    console.log("I am in edit Text"+text.pratyashi_fname);
    console.log("I am in edit client Id"+pratyashiId);
    console.log("I am checking ownerToken"+ownerToken);

    const newManufacturer = {
      _id: pratyashiId,
      pratyashi_yuvak_yuvati: text.pratyashi_yuvak_yuvati,
            pratyashi_vishesh_parishisht: text.pratyashi_vishesh_parishisht,
            pratyashi_adhik_aayu: text.pratyashi_adhik_aayu,
			pratyashi_talakshuda: text.pratyashi_talakshuda,
            pratyashi_pura_name: text.pratyashi_pura_name,
            pratyashi_janm_dinank: text.pratyashi_janm_dinank,
            pratyashi_janm_ghanta: text.pratyashi_janm_ghanta,
			pratyashi_janm_minute: text.pratyashi_janm_minute,
            pratyashi_janm_ampm: text.pratyashi_janm_ampm,
			pratyashi_sthan_rajya: text.pratyashi_sthan_rajya,
            pratyashi_sthan_zila: text.pratyashi_sthan_zila,
            pratyashi_sthan_gaaon_shahar: text.pratyashi_sthan_gaaon_shahar,	
			pratyashi_gautra_swyam: text.pratyashi_gautra_swyam,
			pratyashi_gautra_nanihal: text.pratyashi_gautra_nanihal,
            pratyashi_sharirik_uchai: text.pratyashi_sharirik_uchai,
            pratyashi_sharirik_inch: text.pratyashi_sharirik_inch,
			pratyashi_sharirik_vajan: text.pratyashi_sharirik_vajan,
			pratyashi_sharirik_rang: text.pratyashi_sharirik_rang,
            pratyashi_jankari_rashi: text.pratyashi_jankari_rashi,
            pratyashi_jankari_nakshatr: text.pratyashi_jankari_nakshatr,
			pratyashi_jankari_naadi: text.pratyashi_jankari_naadi,
			pratyashi_jankari_charan: text.pratyashi_jankari_charan,
            pratyashi_manglik: text.pratyashi_manglik,
            pratyashi_shani: text.pratyashi_shani,	
			pratyashi_patrika_milan: text.pratyashi_patrika_milan,
			pratyashi_shekshanik_yogyata: text.pratyashi_shekshanik_yogyata,
            pratyashi_vyavsay: text.pratyashi_vyavsay,
            pratyashi_masik_aay: text.pratyashi_masik_aay,
			pratyashi_pita_vyavsay: text.pratyashi_pita_vyavsay,
			pratyashi_pita_masik_aay: text.pratyashi_pita_masik_aay,
            pratyashi_pita_naam: text.pratyashi_pita_naam,
            pratyashi_vartaman_pata: text.pratyashi_vartaman_pata,
			pratyashi_vartaman_rajya: text.pratyashi_vartaman_rajya,
			pratyashi_vartaman_zila: text.pratyashi_vartaman_zila,
            pratyashi_vartaman_gaaon_shahar: text.pratyashi_vartaman_gaaon_shahar,
            pratyashi_vartaman_pincode: text.pratyashi_vartaman_pincode,
			pratyashi_sthayi_pata: text.pratyashi_sthayi_pata,
			pratyashi_sthayi_rajya: text.pratyashi_sthayi_rajya,
            pratyashi_sthayi_zila: text.pratyashi_sthayi_zila,
            pratyashi_sthayi_gaaon_shahar: text.pratyashi_sthayi_gaaon_shahar,
			pratyashi_sthayi_pin_code: text.pratyashi_sthayi_pin_code,
            pratyashi_photo: text.pratyashi_photo
    }

    alert("From State"+newManufacturer);
    console.log("From State"+newManufacturer);

    axios.put('http://localhost:5000/api/pratyashis/update/' + pratyashiId, newManufacturer, {
      headers: {
        'owner-token': ownerToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp => {
      if (resp) {
        console.log(resp);
        {/* Managing for Edit */ }
        const updatePratyashis = pratyashis.map((pratyashi, index) => {
          //alert("I am in If condition of updatedInspectors"+index);
          if (pratyashi._id === pratyashiId) {
            // Increment the clicked counter
            return newManufacturer;
          } else {
            // The rest haven't changed
            return pratyashi;
          }
        })
        console.log(updatePratyashis);
        setPratyashis(updatePratyashis);
      }
    }).catch(error => {
      console.error('There was an error!', error);
    });
    return 1;
  }

  /// Delete Multiple Clients 

  //for multiple deletion
  const deleteMultiplePratyashis = async (pratyashiIds) => {

    let pratyashiIdsr = { 'ids': pratyashiIds };
    let pratyashisForRemove = JSON.stringify(pratyashiIdsr);
    //const inspectorIdsd = { ids : inspectorIds };
    //alert(typeof(inspectorIdsd));
    if (window.confirm("Do You Want To Delete Selected Clients")) {
      
        const res = await fetch("http://localhost:5000/api/pratyashis/deletemultiplepratyashis", {
          method: 'DELETE',
          body: pratyashisForRemove,
          headers: {
            'owner-token': ownerToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(resp => {
            const updatePratyashis = pratyashis.filter((pratyashi) => !pratyashiIds.includes(pratyashi._id));
            setPratyashis(updatePratyashis);
        }).catch(error => {
          console.error('Error while deleting Multiple Pratyashis', error);
        });
    }
  }

  return (
    <PratyashisContext.Provider value={{ setFormValues , formValues , pratyashis, setPratyashis, addPratyashis, deletePratyashis, editPratyashis, deleteMultiplePratyashis, apiResponseMessages }}>
      {props.children}
    </PratyashisContext.Provider>

  )
}

export default PratyashisState;