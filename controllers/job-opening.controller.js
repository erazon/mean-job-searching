const mongoose = require('mongoose');
const utils = require('./utils.conroller');
const JobOpening = mongoose.model('JobOpening');

const deleteJobOpening = function(req, res){
    const response = {};
    JobOpening.findByIdAndDelete(req.params.jobOpeningId)
        .then(deletedJobOpening=>{
            if(!deleteJobOpening){
                utils._fillResponse(response, process.env.STATUS_NOT_FOUND, {message: process.env.MSG_JOB_OPENING_NOT_FOUND});
            }
            else{
                utils._fillResponse(response, process.env.STATUS_OK, deleteJobOpening);
            }
        })
        .catch(err=>utils._fillResponse(response, process.env.STATUS_INTERNAL_SERVER_ERROR, err))
        .finally(()=>utils._sendResponse(res, response));
}

const getOneJobOpening = function(req, res){
    const response = {};
    JobOpening.findById(req.params.jobOpeningId)
        .then(jobOpening=>{
            if(!jobOpening){
                utils._fillResponse(response, process.env.STATUS_NOT_FOUND, {message: process.env.MSG_JOB_OPENING_NOT_FOUND});
            }
            else{
                console.log(jobOpening);
                utils._fillResponse(response, process.env.STATUS_OK, jobOpening);
            }
        })
        .catch(err=>utils._fillResponse(response, process.env.STATUS_INTERNAL_SERVER_ERROR, err))
        .finally(()=>utils._sendResponse(res, response));
}

const _updateOneJobOpeningOne = function(req, res, jobOpeningUpdateCallback){
    const response = {};
    JobOpening.findById(req.params.jobOpeningId)
        .then(jobOpening=>jobOpeningUpdateCallback(req, jobOpening))
        .then(updatedJobOpening=>{
            if(!updatedJobOpening){
                utils._fillResponse(response, process.env.STATUS_NOT_FOUND, {message: process.env.MSG_JOB_OPENING_NOT_FOUND});
            }
            else{
                utils._fillResponse(response, process.env.STATUS_OK, updatedJobOpening);
            }
        })
        .catch(err=>utils._fillResponse(response, process.env.STATUS_INTERNAL_SERVER_ERROR, err))
        .finally(()=>utils._sendResponse(res, response));
}

const getAllJobOpenings = function(req, res){
    const response = {};
    let count = parseInt(process.env.DEFAULT_COUNT);
    let offset = parseInt(process.env.DEFAULT_OFFSET);
    if(req.query.count){
        count = parseInt(req.query.count);
    }
    if(req.query.offset){
        offset = parseInt(req.query.offset);
    }
    
    JobOpening.find().skip(offset).limit(count).exec()
        .then(jobOpenings=>utils._fillResponse(response, process.env.STATUS_OK, jobOpenings))
        .catch(err=>utils._fillResponse(response, process.env.STATUS_INTERNAL_SERVER_ERROR, err))
        .finally(()=>utils._sendResponse(res, response));
}

const insertJobOpening = function(req, res){
    const response = {};
    let skills = [];
    if(req.body.skills){
        skills = req.body.skills.split(',').map(item=>item.trim());
    }
    const newJobOpening = {
        title: req.body.title,
        salary: req.body.salary,
        location: {},
        description: req.body.description,
        experience: req.body.experience,
        skills: skills,
        postDate: req.body.postDate
    }
    
    JobOpening.create(newJobOpening)
        .then(jobOpening=>utils._fillResponse(response, process.env.STATUS_CREATED, jobOpening))
        .catch(err=>utils._fillResponse(response, process.env.STATUS_INTERNAL_SERVER_ERROR, err))
        .finally(()=>utils._sendResponse(res, response));
}

const updateJobOpeningFull = function(req, res){
    _updateOneJobOpeningOne(req, res, _fullJobOpeningUpadeOne);
}

const updateJobOpeningPartial = function(req, res){
    _updateOneJobOpeningOne(req, res, _partialJobOpeningUpadeOne);
}

const _fullJobOpeningUpadeOne = function(req, jobOpening){
    if(!jobOpening) return;
    let skills = [];
    if(req.body.skills){
        skills = req.body.skills.split(',').map(item=>item.trim());
    }
    jobOpening.title = req.body.title;
    jobOpening.salary = req.body.salary;
    jobOpening.description = req.body.description;
    jobOpening.experience = req.body.experience;
    jobOpening.skills = skills;
    jobOpening.postDate = req.body.postDate;
    return jobOpening.save();
}

const _partialJobOpeningUpadeOne = function(req, jobOpening){
    if(!jobOpening) return;
    let skills = [];
    if(req.body.skills){
        skills = req.body.skills.split(',').map(item=>item.trim());
        jobOpening.skills = skills;
    }
    if(req.body.title){
        jobOpening.title = req.body.title;
    }
    if(req.body.salary){
        jobOpening.salary = req.body.salary;
    }
    if(req.body.description){
        jobOpening.description = req.body.description;
    }
    if(req.body.experience){
        jobOpening.experience = req.body.experience;
    }
    if(req.body.postDate){
        jobOpening.postDate = req.body.postDate;
    }
    return jobOpening.save();
}

module.exports = {
    deleteJobOpening,
    getAllJobOpenings,
    getOneJobOpening,
    insertJobOpening,
    updateJobOpeningFull,
    updateJobOpeningPartial
}