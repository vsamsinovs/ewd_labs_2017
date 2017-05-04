import express from 'express';
import _ from 'lodash';
import mongoose from 'mongoose';
import Contact from './contactModel';
import config from './../../config';


// Connect to database
mongoose.createConnection(config.mongoDb);

const router = express.Router();

router.get('/', (req, res) => {
  Contact.find((err, contacts) => {
    if (err) { return handleError(res, err); }
    return res.send(contacts);
  });
});

//Add a contact
router.post('/', (req, res) => {
  let newContact = req.body;
  if (newContact) {
    Contact.create(newContact, (err, contact) => {
      if (err) { return handleError(res, err); }
      return res.status(201).send({ contact });
    });
  } else {
    return handleError(res, err);
  }
});

//Update a contact
router.put('/:id', (req, res) => {
  let key = req.params.id;
  let updateContact = req.body;

  if (updateContact._id) { delete updateContact._id; }
  Contact.findById(req.params.id, (err, contact) => {
    if (err) { return handleError(res, err); }
    if (!contact) { return res.send(404); }
    const updated = _.merge(contact, updateContact);
    updated.save((err) => {
      if (err) { return handleError(res, err); }
      return res.send(contact);
    });
  });
});

//Delete a contact
router.delete('/:id', (req, res) => {
  let key = req.params.id;
  Contact.findById(key, (err, contact) => {
    if (err) { return res.status(400).send(err); }
    if (!contact) { return res.send(404); }
    contact.remove(err => {
      if (err) { return handleError(res, err); }
      return res.send(contact);
    });
  });
});

function handleError(res, err) {
  return res.status(500).send(err);
};

export default router;
