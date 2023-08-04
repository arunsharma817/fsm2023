var jwt = require('jsonwebtoken');

const JWT_SECRET = 'Harryisagoodboy';

const fetchconsultant = (req, res, next) => {

    // Get the consultant from jwt token and add id to the request object and above fetchconsultant function is middle ware function in consultants.js for Route3

    const token = req.header('consultant-token');
    //console.log('Checking Token'+token);
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);
        //console.log(data);
        req.consultant = data.consultants;
        //console.log(data);
        next();

    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }

}

module.exports = fetchconsultant;