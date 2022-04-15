var vehicle = require('../models/Vehicle');
// List of all vehicles
exports.vehicle_list = function(req, res) {
res.send('NOT IMPLEMENTED: vehicle list');
};
// for a specific vehicle.
exports.vehicle_detail = function(req, res) {
res.send('NOT IMPLEMENTED: vehicle detail: ' + req.params.id);
};
// Handle vehicle create on POST.
// exports.vehicle_create_post = function(req, res) {
// res.send('NOT IMPLEMENTED: vehicle create POST');
// };
// Handle vehicle delete form on DELETE.
exports.vehicle_delete = function(req, res) {
res.send('NOT IMPLEMENTED: vehicle delete DELETE ' + req.params.id);
};
// Handle vehicle update form on PUT.
exports.vehicle_update_put = function(req, res) {
res.send('NOT IMPLEMENTED: vehicle update PUT' + req.params.id);
};

// List of all Costumes
exports.vehicle_list = async function(req, res) {
    try{
    theCostumes = await vehicle.find();
    res.send(theCostumes);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
    };


    // VIEWS
// Handle a show all view
exports.vehicle_view_all_Page = async function(req, res) {
    try{
    theCostumes = await vehicle.find();
    res.render('vehicle', { title: 'Vehicle Search Results', results: theCostumes });
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
    };

    // Handle Costume create on POST.
exports.vehicle_create_post = async function(req, res) {
    console.log(req.body)
    let document = new vehicle();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"costume_type":"goat", "cost":12, "size":"large"}
    document.name= req.body.name;
    document.type = req.body.type;
    document.noofpassangers = req.body.noofpassangers;
    try{
    let result = await document.save();
    res.send(result);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
    };