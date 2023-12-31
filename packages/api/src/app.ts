/**
 * The following lines intialize dotenv,
 * so that env vars from the .env file are present in process.env
 */
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as cors from 'cors';
import * as path from 'path';
import * as expressSitemapXml from 'express-sitemap-xml';
const promMid = require('express-prometheus-middleware');
import { generateURLs } from './utils';
import api from './api';
import './download';
dotenv.config();

const app: express.Application = express();

app.use(cors());
app.use('/api', api);
app.use(expressSitemapXml(generateURLs, 'https://www.globalfootballrankings.com'));
app.use(promMid({
  metricsPath: '/metrics',
  collectDefaultMetrics: true,
  requestDurationBuckets: [0.1, 0.5, 1, 1.5],
  requestLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
  responseLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
}));

app.use(express.static(path.resolve(__dirname, './public')));
app.all('*', (req, res) => res.sendFile(path.resolve(__dirname, './public/index.html')));

// catch 404 and forward to error handler
app.use((_req, res) => {
  res.status(404).send('Not Found');
});

const port = process.env.port || 5000;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});