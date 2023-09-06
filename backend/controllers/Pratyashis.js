const PratyashisModel = require("../models/Pratyashis.js");
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


exports.addPratyashis = async (req, res) => {
        
        //const corpCertificate = req.files['pratyashi_jankari_charan'];
        //const gumastaCertificate = req.files['pratyashi_manglik'];
        //const moaCertificate = req.files['pratyashi_shani'];
        //const msmeCertificate = req.files['pratyashi_patrika_milan'];
        //const results = await asyncParseCSV(req.file.path);
        
        var obj = {
            pratyashi_yuvak_yuvati: req.body.pratyashi_yuvak_yuvati,
            pratyashi_vishesh_parishisht: req.body.pratyashi_vishesh_parishisht,
            pratyashi_adhik_aayu: req.body.pratyashi_adhik_aayu,
			pratyashi_talakshuda: req.body.pratyashi_talakshuda,
            pratyashi_pura_name: req.body.pratyashi_pura_name,
            pratyashi_janm_dinank: req.body.pratyashi_janm_dinank,
            pratyashi_janm_ghanta: req.body.pratyashi_janm_ghanta,
			pratyashi_janm_minute: req.body.pratyashi_janm_minute,
            pratyashi_janm_ampm: req.body.pratyashi_janm_ampm,
			pratyashi_sthan_rajya: req.body.pratyashi_sthan_rajya,
            pratyashi_sthan_zila: req.body.pratyashi_sthan_zila,
            pratyashi_sthan_gaaon_shahar: req.body.pratyashi_sthan_gaaon_shahar,	
			pratyashi_gautra_swyam: req.body.pratyashi_gautra_swyam,
			pratyashi_gautra_nanihal: req.body.pratyashi_gautra_nanihal,
            pratyashi_sharirik_uchai: req.body.pratyashi_sharirik_uchai,
            pratyashi_sharirik_inch: req.body.pratyashi_sharirik_inch,
			pratyashi_sharirik_vajan: req.body.pratyashi_sharirik_vajan,
			pratyashi_sharirik_rang: req.body.pratyashi_sharirik_rang,
            pratyashi_jankari_rashi: req.body.pratyashi_jankari_rashi,
            pratyashi_jankari_nakshatr: req.body.pratyashi_jankari_nakshatr,
			pratyashi_jankari_naadi: req.body.pratyashi_jankari_naadi,
			pratyashi_jankari_charan: req.body.pratyashi_jankari_charan,
            pratyashi_manglik: req.body.pratyashi_manglik,
            pratyashi_shani: req.body.pratyashi_shani,	
			pratyashi_patrika_milan: req.body.pratyashi_patrika_milan,
			pratyashi_shekshanik_yogyata: req.body.pratyashi_shekshanik_yogyata,
            pratyashi_vyavsay: req.body.pratyashi_vyavsay,
            pratyashi_masik_aay: req.body.pratyashi_masik_aay,
			pratyashi_pita_vyavsay: req.body.pratyashi_pita_vyavsay,
			pratyashi_pita_masik_aay: req.body.pratyashi_pita_masik_aay,
            pratyashi_pita_naam: req.body.pratyashi_pita_naam,
            pratyashi_vartaman_pata: req.body.pratyashi_vartaman_pata,
			pratyashi_vartaman_rajya: req.body.pratyashi_vartaman_rajya,
			pratyashi_vartaman_zila: req.body.pratyashi_vartaman_zila,
            pratyashi_vartaman_gaaon_shahar: req.body.pratyashi_vartaman_gaaon_shahar,
            pratyashi_vartaman_pincode: req.body.pratyashi_vartaman_pincode,
			pratyashi_sthayi_pata: req.body.pratyashi_sthayi_pata,
			pratyashi_sthayi_rajya: req.body.pratyashi_sthayi_rajya,
            pratyashi_sthayi_zila: req.body.pratyashi_sthayi_zila,
            pratyashi_sthayi_gaaon_shahar: req.body.pratyashi_sthayi_gaaon_shahar,
			pratyashi_sthayi_pin_code: req.body.pratyashi_sthayi_pin_code,
            pratyashi_photo: req.body.pratyashi_photo
        }
        console.log(JSON.stringify(obj, null, 2));
        const newPratyashisModel = new PratyashisModel(obj);
        
        //const samajmember = new SamajMembers({ samaj_member_fname, samaj_member_lname, samaj_member_mobile});
        //const saveSamajMember = await samajmember.save();
        
        try {
            let result = await newPratyashisModel.save();
            res.json({ success: true, status: status.CREATED, msg: result });
        }
        catch (err) {
            return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Save Pratyashi failed.' });
        }
        
}


//update by id
exports.updatePratyashis = async (req, res) => {
        let id = req.params.id;
        if (id === undefined) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
        }
        delete req.body.id;
        try {
            let result = await PratyashisModel.findOneAndUpdate(
                { _id: id },
                {
                    $set: {
                        pratyashi_yuvak_yuvati: req.body.pratyashi_yuvak_yuvati,
                        pratyashi_vishesh_parishisht: req.body.pratyashi_vishesh_parishisht,
                        pratyashi_adhik_aayu: req.body.pratyashi_adhik_aayu,
                        pratyashi_talakshuda: req.body.pratyashi_talakshuda,
                        pratyashi_pura_name: req.body.pratyashi_pura_name,
                        pratyashi_janm_dinank: req.body.pratyashi_janm_dinank,
                        pratyashi_janm_ghanta: req.body.pratyashi_janm_ghanta,
                        pratyashi_janm_minute: req.body.pratyashi_janm_minute,            
                        pratyashi_janm_ampm: req.body.pratyashi_janm_ampm,
                        pratyashi_sthan_rajya: req.body.pratyashi_sthan_rajya,
                        pratyashi_sthan_zila: req.body.pratyashi_sthan_zila,
                        pratyashi_sthan_gaaon_shahar: req.body.pratyashi_sthan_gaaon_shahar,                        
                        pratyashi_gautra_swyam: req.body.pratyashi_gautra_swyam,
                        pratyashi_gautra_nanihal: req.body.pratyashi_gautra_nanihal,
                        pratyashi_sharirik_uchai: req.body.pratyashi_sharirik_uchai,
                        pratyashi_sharirik_inch: req.body.pratyashi_sharirik_inch,                        
                        pratyashi_sharirik_vajan: req.body.pratyashi_sharirik_vajan,
                        pratyashi_sharirik_rang: req.body.pratyashi_sharirik_rang,
                        pratyashi_jankari_rashi: req.body.pratyashi_jankari_rashi,
                        pratyashi_jankari_nakshatr: req.body.pratyashi_jankari_nakshatr,
                        pratyashi_jankari_naadi: req.body.pratyashi_jankari_naadi,
                        pratyashi_jankari_charan: req.body.pratyashi_jankari_charan,
                        pratyashi_manglik: req.body.pratyashi_manglik,
                        pratyashi_shani: req.body.pratyashi_shani,                        
                        pratyashi_patrika_milan: req.body.pratyashi_patrika_milan,
                        pratyashi_shekshanik_yogyata: req.body.pratyashi_shekshanik_yogyata,
                        pratyashi_vyavsay: req.body.pratyashi_vyavsay,
                        pratyashi_masik_aay: req.body.pratyashi_masik_aay,
                        pratyashi_pita_vyavsay: req.body.pratyashi_pita_vyavsay,
                        pratyashi_pita_masik_aay: req.body.pratyashi_pita_masik_aay,
                        pratyashi_pita_naam: req.body.pratyashi_pita_naam,
                        pratyashi_vartaman_pata: req.body.pratyashi_vartaman_pata,            
                        pratyashi_vartaman_rajya: req.body.pratyashi_vartaman_rajya,
                        pratyashi_vartaman_zila: req.body.pratyashi_vartaman_zila,
                        pratyashi_vartaman_gaaon_shahar: req.body.pratyashi_vartaman_gaaon_shahar,
                        pratyashi_vartaman_pincode: req.body.pratyashi_vartaman_pincode,
                        pratyashi_sthayi_pata: req.body.pratyashi_sthayi_pata,
                        pratyashi_sthayi_rajya: req.body.pratyashi_sthayi_rajya,
                        pratyashi_sthayi_zila: req.body.pratyashi_sthayi_zila,
                        pratyashi_sthayi_gaaon_shahar: req.body.pratyashi_sthayi_gaaon_shahar,            
                        pratyashi_sthayi_pin_code: req.body.pratyashi_sthayi_pin_code,
                        pratyashi_photo: req.body.pratyashi_photo 
                    }
                },
            ).lean().exec();

            if (result) {
                res.json({ success: true, status: status.OK, msg: 'Pratyashi is updated successfully.' });
            }
            else {
                return res.json({ success: false, status: status.NOTFOUND, msg: 'Pratyashi Id not found' });
            }
        }
        catch (err) {
            return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Update Pratyashi failed.' });
        }
   
}

//get all pratyashi link
exports.listPratyashis = async (req, res) => {
    
        try {
            const data = await PratyashisModel.find({}).sort({ created_at: 1 }).lean().exec();
            return res.json(data);
        }
        catch (err) {
            return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Get pratyashi link failed.' });
        }
    
      {/*  try {

            const samajmember = await SamajMembers.find();
            res.json(samajmember)
    
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error ");
        }*/}
}

//delete pratyashi link by id
exports.deletePratyashis = async (req, res) => {
    
        try {
            const ID = req.params.id;
            if (ID === undefined) {
                return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
            }
            let result = await PratyashisModel.findOneAndDelete({ _id: ID }).lean().exec();
            if (result) {
                res.json({ success: true, status: status.OK, msg: 'Pratyashi is Deleted successfully.' });
            }
            else {
                return res.json({ success: false, status: status.NOTFOUND, msg: 'Pratyashi  Id not found' });
            }
        }
        catch (err) {
            return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Delete Pratyashi failed.' });
        }
   
}

//get all pratyashi link
exports.getList = async (req, res) => {
    try {
        const data = await PratyashisModel.find({}).select('pratyashi_yuvak_yuvati pratyashi_vishesh_parishisht pratyashi_adhik_aayu pratyashi_talakshuda pratyashi_pura_name pratyashi_janm_dinank pratyashi_janm_ghanta pratyashi_company_logo pratyashi_janm_minute pratyashi_janm_ampm pratyashi_sthan_rajya pratyashi_sthan_zila pratyashi_sthan_gaaon_shahar  pratyashi_gautra_swyam pratyashi_gautra_nanihal pratyashi_sharirik_uchai	pratyashi_sharirik_inch pratyashi_sharirik_vajan pratyashi_sharirik_rang pratyashi_jankari_rashi	pratyashi_jankari_nakshatr pratyashi_jankari_naadi pratyashi_jankari_charan pratyashi_manglik pratyashi_shani pratyashi_patrika_milan pratyashi_shekshanik_yogyata pratyashi_vyavsay pratyashi_masik_aay pratyashi_pita_vyavsay pratyashi_pita_masik_aay pratyashi_pita_naam pratyashi_vartaman_pata pratyashi_vartaman_rajya pratyashi_vartaman_zila pratyashi_vartaman_gaaon_shahar  pratyashi_vartaman_pincode pratyashi_sthayi_pata pratyashi_sthayi_rajya pratyashi_sthayi_zila	pratyashi_sthayi_gaaon_shahar pratyashi_sthayi_pin_code pratyashi_photo').sort({ created_at: 1 }).lean().exec();
                return res.json({ data: data, success: true, status: status.OK });
    }
    catch (err) {
        return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Get pratyashi link failed.' });
    }

}


// Route : Delete Multiple User Types , Selected from the list of Multiple User Types . "/api/mainproducts/deletemultiplemainproducts"

exports.deleteMultiplePratyashis = async (req, res) => {
    console.log("req body type "+typeof(req.body));
    console.log("req body value "+req.body);
    const {ids}  = req.body;
    console.log("I am here for check in multimainproducts"+ids);
      try {
        await PratyashisModel.deleteMany({'_id':{'$in': ids }});
        res.json({ "Success" : "Pratyashis  have been deleted" , pratyashis : ids }); 
       }  
        catch (error) {
                console.error(error.message);
                res.status(500).send("Internal Server Error ");
        }    
}

exports.importPratyashis = async (req, res) => {
    try {
      const results = await asyncParseCSV(req.file.path);
      await PratyashisModel.insertMany(results);
      res.json({ message: 'Data imported successfully' });
    } catch (error) {
      console.error('Error saving data:', error);
      res.status(500).json({ error: 'Error saving data' });
    }
}