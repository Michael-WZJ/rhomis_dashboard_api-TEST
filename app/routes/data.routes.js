module.exports = app => {
    const express = require("express");
    const router = express.Router();
    const data = require("../controllers/data.controller.js");

    // Define REST APIs
    // Retrieve data by formID and dataType
    router.get("/", data.findData);


    app.use("/api/data", router);
}