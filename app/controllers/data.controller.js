
// Get Schema
const data = require("../models/data.model.js");

// Retrieve data by formID and dataType from the database.
exports.findData = (req, res) => {
    const formID = req.query.formid;
    const dataType = req.query.type;
    let condition = (formID && dataType) ? {formID: formID, dataType: dataType} : {};
    data.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send(
                {message: err.message || "Some error occurred while retrieving data."}
            );
        });
};

