import config from './config';
import express from 'express';
import contactsRouter from './api/contacts';
import bodyParser from 'body-parser';
import postsRouter from './api/posts';
import commentsRouter from './api/comments/comment.api';

import mongoose from 'mongoose';
import { loadContacts } from './contactsData';
import { loadPosts } from './postsData';
import { loadComments } from './commentsData';

import { Mockgoose } from 'mockgoose';
import { nodeEnv } from './config';

import cors from 'cors';

export const server = express();

server.use(cors())
server.use(bodyParser.json());
server.use(bodyParser.urlencoded());

server.use(express.static('public'));

server.use('/api/contacts', contactsRouter);
server.use('/api/posts', postsRouter);
server.use('/api/posts', commentsRouter);

server.listen(config.port, config.host, () => {
  console.info('Express listening on port', config.port);
});

// Connect to database
if (nodeEnv == 'test') {
  //use mockgoose for testing
  var mockgoose = new Mockgoose(mongoose);
  mockgoose.prepareStorage().then(() => {
    mongoose.connect(config.mongoDb);
  });
}
else {
  //use real deal for everything else
  mongoose.connect(config.mongoDb);
}
mongoose.connection.on('error', function (err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
});

// Populate DB with sample data
if (config.seedDb) {
  loadContacts();
  loadPosts();
  loadComments();
}