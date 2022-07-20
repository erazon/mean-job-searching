const mongoose = require('mongoose');
const utils = require('./utils.controller');
const JobOpening = mongoose.model('JobOpening');

const deleteLocation = function(req, res){
    const response = {};

    JobOpening.findById(req.params.movieId)
        .then(movie=>_deleteLocationByJobOpening(req, movie))
        .then(movieAfterLocationDelete=>{
            console.log('after deleting cast', movieAfterLocationDelete);
            if(!movieAfterLocationDelete){
                utils._fillResponse(response, process.env.STATUS_NOT_FOUND, {message: process.env.MSG_CAST_NOT_FOUND});
            }
            else{
                utils._fillResponse(response, process.env.STATUS_OK, movieAfterLocationDelete);
            }
        })
        .catch(err=>utils._fillResponse(response, process.env.STATUS_INTERNAL_SERVER_ERROR, err))
        .finally(()=>utils._sendResponse(res, response));
}

const getAllLocation = function(req, res){
    //console.log('getAllLocations');
    //console.log('movie id', req.params.movieId);
    const response = {};
    if(!mongoose.isValidObjectId(req.params.movieId)){
        utils._fillResponse(response, process.env.STATUS_USER_ERROR, {message: process.env.MSG_INVALID_MOVIE_ID});
        utils._sendResponse(res, response);
        return;
    }

    JobOpening.findById(req.params.movieId).select(process.env.SUB_COLLECTION_CASTS).exec()
        .then(movie=>{
            if(!movie){
                utils._fillResponse(response, process.env.STATUS_NOT_FOUND, {message: process.env.MSG_MOVIE_NOT_FOUND});
            }
            else{
                utils._fillResponse(response, process.env.STATUS_OK, movie.casts);
            }
        })
        .catch(err=>utils._fillResponse(response, process.env.STATUS_INTERNAL_SERVER_ERROR, err))
        .finally(()=>utils._sendResponse(res, response));
}

const getOneLocation = function(req, res){
    const response = {};
    if(!mongoose.isValidObjectId(req.params.movieId)){
        utils._fillResponse(response, process.env.STATUS_USER_ERROR, {message: process.env.MSG_INVALID_MOVIE_ID});
        utils._sendResponse(res, response);
        return;
    }
    if(!mongoose.isValidObjectId(req.params.castId)){
        utils._fillResponse(response, process.env.STATUS_USER_ERROR, {message: process.env.MSG_INVALID_CAST_ID});
        utils._sendResponse(res, response);
        return;
    }

    JobOpening.findById(req.params.movieId)
        .then(movie=>{
            console.log('found movie', movie);
            if(!movie){
                utils._fillResponse(response, process.env.STATUS_NOT_FOUND, {message: process.env.MSG_MOVIE_NOT_FOUND});
            }
            else{
                const cast = movie.casts.id(req.params.castId);
                if(cast){
                    utils._fillResponse(response, process.env.STATUS_OK, cast);
                }
                else{
                    utils._fillResponse(response, process.env.STATUS_NOT_FOUND, {message: process.env.MSG_CAST_NOT_FOUND});
                }
            }
        })
        .catch(err=>utils._fillResponse(response, process.env.STATUS_INTERNAL_SERVER_ERROR, err))
        .finally(()=>utils._sendResponse(res, response));
}

const insertLocation = function(req, res){
    const response = {};
    if(!mongoose.isValidObjectId(req.params.movieId)){
        utils._fillResponse(response, process.env.STATUS_USER_ERROR, {message: process.env.MSG_INVALID_MOVIE_ID});
        utils._sendResponse(res, response);
        return;
    }

    JobOpening.findById(req.params.movieId)
        .then(movie=>_insertLocation(req, movie))
        .then(movie=>{
            if(!movie){
                utils._fillResponse(response, process.env.STATUS_NOT_FOUND, {message: process.env.MSG_MOVIE_NOT_FOUND});
            }
            else{
                utils._fillResponse(response, process.env.STATUS_OK, movie);
            }
        })
        .catch(err=>utils._fillResponse(response, process.env.STATUS_INTERNAL_SERVER_ERROR, err))
        .finally(()=>utils._sendResponse(res, response));
}

const updateLocationFull = function(req, res){
    console.log('updateLocationFull called');
    _updateLocationOne(req, res, _fullLocationUpdateOne);
}

const updateLocationPartial = function(req, res){
    console.log('updateLocationPartial called');
    _updateLocationOne(req, res, _partialLocationUpdateOne);
}

const _deleteLocationByJobOpening = function(req, movie){
    console.log('_deleteLocationByJobOpening', movie);
    if(!movie) return;

    let cast = movie.casts.id(req.params.castId);
    console.log('cast', cast);
    if(!cast) return;

    movie.casts.id(req.params.castId).remove();
    return movie.save();
}

const _fullLocationUpdateOne = function(req, movie){
    if(!movie) return;

    let cast = movie.casts.id(req.params.castId);
    if(!cast) return;

    movie.casts.id(req.params.castId).name = req.body.name;
    movie.casts.id(req.params.castId).debut_year = req.body.debut_year;
    return movie.save();
}

const _insertLocation = function(req, movie){
    if(!movie) return;

    const castInput = {
        name: req.body.name,
        debut_year: req.body.debut_year
    }
    movie.casts.push(castInput);
    return movie.save();
}

const _partialLocationUpdateOne = function(req, movie){
    if(!movie) return;

    let cast = movie.casts.id(req.params.castId);
    if(!cast) return;

    if(req.body.name){
        movie.casts.id(req.params.castId).name = req.body.name;
    }
    if(req.body.debut_year){
        movie.casts.id(req.params.castId).debut_year = req.body.debut_year;
    }
    
    return movie.save();
}

const _updateLocationOne = function(req, res, castUpdateCallback){
    const response = {};
    if(!mongoose.isValidObjectId(req.params.movieId)){
        utils._fillResponse(response, process.env.STATUS_USER_ERROR, {message: process.env.MSG_INVALID_MOVIE_ID});
        utils._sendResponse(res, response);
        return;
    }
    if(!mongoose.isValidObjectId(req.params.castId)){
        utils._fillResponse(response, process.env.STATUS_USER_ERROR, {message: process.env.MSG_INVALID_CAST_ID});
        utils._sendResponse(res, response);
        return;
    }

    JobOpening.findById(req.params.movieId)
        .then(movie=>castUpdateCallback(req, movie))
        .then(updatedJobOpening=>{
            console.log(updatedJobOpening);
            if(!updatedJobOpening){
                utils._fillResponse(response, process.env.STATUS_NOT_FOUND, {message: process.env.MSG_CAST_NOT_FOUND});
            }
            else{
                utils._fillResponse(response, process.env.STATUS_OK, updatedJobOpening);
            }
        })
        .catch(err=>utils._fillResponse(response, process.env.STATUS_INTERNAL_SERVER_ERROR, err))
        .finally(()=>utils._sendResponse(res, response));
}

module.exports = {deleteLocation, getAllLocations, getOneLocation, insertLocation, updateLocationFull, updateLocationPartial};