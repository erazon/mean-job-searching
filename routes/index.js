const express = require('express');
const jobOpeningController = require('../controllers/job-opening.controller');

const router = express.Router({mergeParams: true});

router.route('/job-openings')
    .get(jobOpeningController.getAllJobOpenings)
    .post(jobOpeningController.insertJobOpening);

router.route('/job-openings/:jobOpeningId')
    .get(jobOpeningController.getOneJobOpening)
    .delete(jobOpeningController.deleteJobOpening)
    .patch(jobOpeningController.updateJobOpeningPartial)
    .put(jobOpeningController.updateJobOpeningFull);

module.exports = router;