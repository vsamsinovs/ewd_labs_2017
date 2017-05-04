import config from './config';
import express from 'express';
import contactsRouter from './api/contacts';
import bodyParser from 'body-parser';
import postsRouter from './api/posts';

import mongoose from 'mongoose';
import {loadContacts} from './contactsData';

const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded());

server.use('/api/contacts', contactsRouter);
server.use(express.static('public'));

server.use('/api/posts', postsRouter);

server.listen(config.port, config.host, () => {
  console.info('Express listening on port', config.port);
});

mongoose.connect(config.mongoDb);
// Populate DB with sample data
if(config.seedDb) {
    loadContacts();
}