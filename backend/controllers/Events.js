const EventsModel = require("../models/Events.js");
const status = require("../config/status-code.js");

const { promisify } = require('util');
const fs = require('fs');
const csvParser = require('csv-parser');

const asyncParseCSV = promisify((filePath, callback) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (row) => {
        results.push(row);
      })
      .on('end', () => {
        callback(null, results);
      })
      .on('error', (error) => {
        callback(error, null);
      })
  });


exports.addEvents = async (req, res) => {
        
        //const corpCertificate = req.files['event_caterer_address'];
        //const gumastaCertificate = req.files['event_electrician'];
        //const moaCertificate = req.files['event_flower_decorater'];
        //const msmeCertificate = req.files['event_nursery_contractor'];
        //const results = await asyncParseCSV(req.file.path);
        
        var obj = {
            event_title: req.body.event_title,
            event_date: req.body.event_date,
            event_venue: req.body.event_venue,
			event_city: req.body.event_city,
            event_organizer: req.body.event_organizer,
            event_organizer_address: req.body.event_organizer_address,
            event_organizer_phone: req.body.event_organizer_phone,
			event_organizer_email: req.body.event_organizer_email,
            event_organizer_contact_person: req.body.event_organizer_contact_person,
			event_chief_guest: req.body.event_chief_guest,
            event_awards_latest: req.body.event_awards_latest,
            event_awards_nominee: req.body.event_awards_nominee,	
			event_organizer_team_size: req.body.event_organizer_team_size,
			event_photographer: req.body.event_photographer,
            event_security_agency: req.body.event_security_agency,
            event_near_police_station: req.body.event_near_police_station,
			event_near_police_station_contact: req.body.event_near_police_station_contact,
			event_start_date: req.body.event_start_date,
            event_end_date: req.body.event_end_date,
            event_caterer: req.body.event_caterer,
			event_caterer_mobile: req.body.event_caterer_mobile,
			event_caterer_address: req.body.event_caterer_address,
            event_electrician: req.body.event_electrician,
            event_flower_decorater: req.body.event_flower_decorater,	
			event_nursery_contractor: req.body.event_nursery_contractor,
			event_music_system: req.body.event_music_system,
            event_mentor_name: req.body.event_mentor_name,
            event_marketing_agency: req.body.event_marketing_agency,
			event_marketing_coordinater: req.body.event_marketing_coordinater,
			event_sponsor_companies: req.body.event_sponsor_companies,
            event_media_agencies: req.body.event_media_agencies,
            event_transporation_agencies: req.body.event_transporation_agencies,
			event_travel_agencies: req.body.event_travel_agencies,
			event_benificieries: req.body.event_benificieries,
            event_artists: req.body.event_artists,
            event_celebrities: req.body.event_celebrities,
			event_agency_founder: req.body.event_agency_founder,
			event_agency_ceo: req.body.event_agency_ceo,
            event_agency_ceo_linkedin: req.body.event_agency_ceo_linkedin,
            event_agency_ceo_mobile: req.body.event_agency_ceo_mobile,
			event_business_model: req.body.event_business_model,
            event_agency_history: req.body.event_agency_history
        }
        console.log(JSON.stringify(obj, null, 2));
        const newEventsModel = new EventsModel(obj);
        
        //const samajmember = new SamajMembers({ samaj_member_fname, samaj_member_lname, samaj_member_mobile});
        //const saveSamajMember = await samajmember.save();
        
        try {
            let result = await newEventsModel.save();
            res.json({ success: true, status: status.CREATED, msg: result });
        }
        catch (err) {
            return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Save Event failed.' });
        }
        
}


//update by id
exports.updateEvents = async (req, res) => {
        let id = req.params.id;
        if (id === undefined) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
        }
        delete req.body.id;
        try {
            let result = await EventsModel.findOneAndUpdate(
                { _id: id },
                {
                    $set: {
                        event_title: req.body.event_title,
                        event_date: req.body.event_date,
                        event_venue: req.body.event_venue,
                        event_city: req.body.event_city,
                        event_organizer: req.body.event_organizer,
                        event_organizer_address: req.body.event_organizer_address,
                        event_organizer_phone: req.body.event_organizer_phone,
                        event_organizer_email: req.body.event_organizer_email,            
                        event_organizer_contact_person: req.body.event_organizer_contact_person,
                        event_chief_guest: req.body.event_chief_guest,
                        event_awards_latest: req.body.event_awards_latest,
                        event_awards_nominee: req.body.event_awards_nominee,                        
                        event_organizer_team_size: req.body.event_organizer_team_size,
                        event_photographer: req.body.event_photographer,
                        event_security_agency: req.body.event_security_agency,
                        event_near_police_station: req.body.event_near_police_station,                        
                        event_near_police_station_contact: req.body.event_near_police_station_contact,
                        event_start_date: req.body.event_start_date,
                        event_end_date: req.body.event_end_date,
                        event_caterer: req.body.event_caterer,
                        event_caterer_mobile: req.body.event_caterer_mobile,
                        event_caterer_address: req.body.event_caterer_address,
                        event_electrician: req.body.event_electrician,
                        event_flower_decorater: req.body.event_flower_decorater,                        
                        event_nursery_contractor: req.body.event_nursery_contractor,
                        event_music_system: req.body.event_music_system,
                        event_mentor_name: req.body.event_mentor_name,
                        event_marketing_agency: req.body.event_marketing_agency,
                        event_marketing_coordinater: req.body.event_marketing_coordinater,
                        event_sponsor_companies: req.body.event_sponsor_companies,
                        event_media_agencies: req.body.event_media_agencies,
                        event_transporation_agencies: req.body.event_transporation_agencies,            
                        event_travel_agencies: req.body.event_travel_agencies,
                        event_benificieries: req.body.event_benificieries,
                        event_artists: req.body.event_artists,
                        event_celebrities: req.body.event_celebrities,
                        event_agency_founder: req.body.event_agency_founder,
                        event_agency_ceo: req.body.event_agency_ceo,
                        event_agency_ceo_linkedin: req.body.event_agency_ceo_linkedin,
                        event_agency_ceo_mobile: req.body.event_agency_ceo_mobile,            
                        event_business_model: req.body.event_business_model,
                        event_agency_history: req.body.event_agency_history 
                    }
                },
            ).lean().exec();

            if (result) {
                res.json({ success: true, status: status.OK, msg: 'Event is updated successfully.' });
            }
            else {
                return res.json({ success: false, status: status.NOTFOUND, msg: 'Event Id not found' });
            }
        }
        catch (err) {
            return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Update Event failed.' });
        }
   
}

//get all event link
exports.listEvents = async (req, res) => {
    
        try {
            const data = await EventsModel.find({}).sort({ created_at: 1 }).lean().exec();
            return res.json(data);
        }
        catch (err) {
            return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Get event link failed.' });
        }
    
      {/*  try {

            const samajmember = await SamajMembers.find();
            res.json(samajmember)
    
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error ");
        }*/}
}

//delete event link by id
exports.deleteEvents = async (req, res) => {
    
        try {
            const ID = req.params.id;
            if (ID === undefined) {
                return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
            }
            let result = await EventsModel.findOneAndDelete({ _id: ID }).lean().exec();
            if (result) {
                res.json({ success: true, status: status.OK, msg: 'Event is Deleted successfully.' });
            }
            else {
                return res.json({ success: false, status: status.NOTFOUND, msg: 'Event  Id not found' });
            }
        }
        catch (err) {
            return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Delete Event failed.' });
        }
   
}

//get all event link
exports.getList = async (req, res) => {
    try {
        const data = await EventsModel.find({}).select('event_title event_date event_venue event_city event_organizer event_organizer_address event_organizer_phone event_organizer_mobile event_organizer_email event_organizer_contact_person event_chief_guest event_awards_latest event_awards_nominee  event_organizer_team_size event_photographer event_security_agency	event_near_police_station event_near_police_station_contact event_start_date event_end_date	event_caterer event_caterer_mobile event_caterer_address event_electrician event_flower_decorater event_nursery_contractor event_music_system event_mentor_name event_marketing_agency event_marketing_coordinater event_sponsor_companies event_media_agencies event_transporation_agencies event_travel_agencies event_benificieries event_artists  event_celebrities event_agency_founder event_agency_ceo event_agency_ceo_linkedin	event_agency_ceo_mobile event_business_model event_agency_history').sort({ created_at: 1 }).lean().exec();
                return res.json({ data: data, success: true, status: status.OK });
    }
    catch (err) {
        return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Get event link failed.' });
    }

}


// Route : Delete Multiple User Types , Selected from the list of Multiple User Types . "/api/mainproducts/deletemultiplemainproducts"

exports.deleteMultipleEvents = async (req, res) => {
    console.log("req body type "+typeof(req.body));
    console.log("req body value "+req.body);
    const {ids}  = req.body;
    console.log("I am here for check in multimainproducts"+ids);
      try {
        await EventsModel.deleteMany({'_id':{'$in': ids }});
        res.json({ "Success" : "Events  have been deleted" , events : ids }); 
       }  
        catch (error) {
                console.error(error.message);
                res.status(500).send("Internal Server Error ");
        }    
}

exports.importEvents = async (req, res) => {
    try {
      const results = await asyncParseCSV(req.file.path);
      await EventsModel.insertMany(results);
      res.json({ message: 'Data imported successfully' });
    } catch (error) {
      console.error('Error saving data:', error);
      res.status(500).json({ error: 'Error saving data' });
    }
}