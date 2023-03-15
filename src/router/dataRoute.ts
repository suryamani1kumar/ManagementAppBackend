import express from 'express';
import * as addData from '../contoller/dataController';
// import { paginatedResult } from '../utils/paginatedResult';
// import colllectData from '../Schema/dataSchema';

const data = express.Router();
data.post('/addData', addData.addData);
data.post('/getDatafilter', addData.getDatafilter);
data.get('/getData', addData.getData);
data.get('/getAllData', addData.getAllData);
// data.get('/getAllData', paginatedResult(colllectData), (req, res) => {});

export default data;
