import { Schema, model } from 'mongoose';
import { dataDetail } from '../utils/type';

const colllectDataSchema = new Schema<dataDetail>(
  {
    series: {
      type: String,
    },
    match: {
      type: String,
    },
    time: {
      type: String,
    },
    invesment: {
      type: Number,
    },
    returns: {
      type: Number,
    },
    numberOfPlayer: {
      type: Number,
    },
    created: {
      type: String,
    },
    comment: {
      type: String,
    },
    date: {
      type: String,
    },
  },
  { timestamps: true }
);

const colllectData = model('colllectData', colllectDataSchema);

export default colllectData;
