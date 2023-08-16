const socialLinksModel = require("../models/SocialLinks.model.js")
const status = require("../config/status-code.js");

exports.addSocialLink = async (req, res) => {
        
        var obj = {
            social_link_title: req.body.social_link_title,
            social_link_icon: req.body.social_link_icon,
            social_link_source_url: req.body.social_link_source_url,
            // alias: await creataAlias(req.body.social_link_title)
        }
        const newsocialLinksModel = new socialLinksModel(obj);
        try {

            let result = await newsocialLinksModel.save();
            res.json({ success: true, status: status.CREATED, msg: 'Social Link is created successfully.' });
        }
        catch (err) {
            return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Save Social Link failed.' });
        }
    
}


//update by id
exports.updateSocialLink = async (req, res) => {
        var id = req.body.id;
        if (id === undefined) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
        }
        delete req.body.id;
        try {
            let result = await socialLinksModel.findOneAndUpdate(
                { _id: id },
                {
                    $set: {
                        social_link_title: req.body.social_link_title,
                        social_link_icon: req.body.social_link_icon,
                        social_link_source_url: req.body.social_link_source_url,
                        // alias: await creataAlias(req.body.social_link_title)
                    }
                },
            ).lean().exec();

            if (result) {
                res.json({ success: true, status: status.OK, msg: 'Social Link is updated successfully.' });
            }
            else {
                return res.json({ success: false, status: status.NOTFOUND, msg: 'Social Link Id not found' });
            }
        }
        catch (err) {
            return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Update Social Link failed.' });
        }
   
}

//get all social link
exports.listSocialLink = async (req, res) => {
    
        try {
            const data = await socialLinksModel.find({}).sort({ created_at: 1 }).lean().exec();
            return res.json({ data: data, success: true, status: status.OK });
        }
        catch (err) {
            return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Get social link failed.' });
        }
    
}

//delete social link by id
exports.deleteSocialLink = async (req, res) => {
    
        try {
            const ID = req.params.id;
            if (ID === undefined) {
                return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
            }
            let result = await socialLinksModel.findOneAndDelete({ _id: ID }).lean().exec();
            if (result) {
                res.json({ success: true, status: status.OK, msg: 'Social Link is Deleted successfully.' });
            }
            else {
                return res.json({ success: false, status: status.NOTFOUND, msg: 'Socail Link Id not found' });
            }
        }
        catch (err) {
            return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Delete Social Link failed.' });
        }
   
}

//get all social link
exports.getList = async (req, res) => {
    try {
        const data = await socialLinksModel.find({}).select('social_link_title social_link_icon social_link_source_url').sort({ created_at: 1 }).lean().exec();
        return res.json({ data: data, success: true, status: status.OK });
    }
    catch (err) {
        return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Get social link failed.' });
    }

}


// Route : Delete Multiple User Types , Selected from the list of Multiple User Types . "/api/mainproducts/deletemultiplemainproducts"

exports.deleteMultipleSocialLink = async (req, res) => {
    console.log("req body type "+typeof(req.body));
    console.log("req body value "+req.body);
    const {ids}  = req.body;
    console.log("I am here for check in multimainproducts"+ids);
      try {
        await SocietyMembers.deleteMany({'_id':{'$in': ids }});
        res.json({ "Success" : "Linkes Types have been deleted" , societymember : ids }); 
       }  
        catch (error) {
                console.error(error.message);
                res.status(500).send("Internal Server Error ");
        }    
}



exports.importSocialLink = async (req, res) => {
    try {
      const results = await asyncParseCSV(req.file.path);
      await SocietyMembers.insertMany(results);
      res.json({ message: 'Data imported successfully' });
    } catch (error) {
      console.error('Error saving data:', error);
      res.status(500).json({ error: 'Error saving data' });
    }
}