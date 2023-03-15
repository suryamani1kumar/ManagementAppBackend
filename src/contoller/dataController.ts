import { Response, Request } from 'express';
import moment from 'moment';
import data from '../Schema/dataSchema';
import { StatusCodes } from 'http-status-codes';

const addData = async (req: Request, res: Response) => {
  const {
    series,
    match,
    time,
    invesment,
    returns,
    numberOfPlayer,
    created,
    comment,
    date,
  } = req.body;

  const Date = moment(date, 'MM/DD/YYYY').format('dddd, MMM Do YYYY');

  try {
    const collectData = new data({
      series,
      match,
      time,
      invesment,
      returns,
      numberOfPlayer,
      created,
      comment,
      date: Date,
    });
    const saveData = await collectData.save();
    res.status(StatusCodes.OK).send(saveData);
  } catch (error: any) {
    console.log(error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: true, message: 'Internal Server Error' });
  }
};

const getDatafilter = async (req: Request, res: Response) => {
  const { time, created, numberOfPlayer, Data, series } = req.body;
  if (time && numberOfPlayer) {
    const timefilter = await data.find({
      $and: [{ time: time }, { numberOfPlayer: numberOfPlayer }],
    });

    const timefilterInvesment: number = timefilter.reduce((sum, curr) => {
      return sum + curr.invesment;
    }, 0);

    const timefilterReturn: number = timefilter.reduce((sum, curr) => {
      return sum + curr.returns;
    }, 0);

    const winPercentage: number =
      (timefilterReturn / timefilterInvesment) * 100;

    const output = {
      invesMent: timefilterInvesment,
      returns: timefilterReturn,
      totalMatch: timefilter.length,
      winPercentage: `${winPercentage.toFixed(2)} %`,
      time: time,
    };

    res.send(output);
  } else if (series) {
    const seriesfilter = await data.find({ series: series });
    const seriesName = seriesfilter.map((item) => {
      return item.series;
    });
    res.send(seriesName);
  } else if (created) {
    const createdfilter = await data.find({ created: created });
    res.send(createdfilter);
  } else if (numberOfPlayer) {
    const playerfilter = await data.find({ numberOfPlayer: numberOfPlayer });

    const invesMent = playerfilter.reduce((sum, curr) => {
      return sum + curr.invesment;
    }, 0);

    const returns = playerfilter.reduce((sum, curr) => {
      return sum + curr.returns;
    }, 0);

    const output = {
      invesMent: invesMent,
      returns: returns,
      totalMatch: playerfilter.length,
    };

    res.send(output);
  } else {
    // const today = moment().format("Do MMM YYYY");
    // const getdata = await data.find({ date: today });
    const datafilter = await data.find({ date: Data });
    console.log(datafilter);
    res.send(datafilter);
  }
};

const getData = async (req: Request, res: Response) => {
  try {
    const getdata = await data.find();

    const totalMatch = getdata.length;

    const totalInvesment = getdata.reduce((sum, aurr) => {
      return sum + aurr.invesment;
    }, 0);

    const totalreturn = getdata.reduce((sum, aurr) => {
      return sum + aurr.returns;
    }, 0);

    const Return = getdata.filter((ite) => {
      return ite.returns > 0;
    });

    const numberOfReturn = Return.length;

    const totalgain = totalreturn - totalInvesment;

    const winPercentage: number = (numberOfReturn / totalMatch) * 100;

    const winPercentageonGain: number = (totalreturn / totalInvesment) * 100;

    const object = {
      totalMatch: totalMatch,
      totalInvesment: totalInvesment,
      totalreturn: totalreturn,
      totalgain: totalgain,
      numberOfReturn: numberOfReturn,
      gainpercentage: `${winPercentageonGain.toFixed(2)}% `,
      winPercentage: `${winPercentage.toFixed(2)}% `,
      ReturnHistory: Return,
      total: getdata,
    };
    res.send(object);
  } catch (error: any) {
    res.send(error.message);
  }
};

const getAllData = async (req: Request, res: Response) => {
  const { pageNumber, limit } = req.query;

  const page: number = parseInt(pageNumber as any) || 0;
  const limits: number = parseInt(limit as any) || 1;

  // calculating the starting and ending index
  const startIndex = (page - 1) * limits;
  console.log(startIndex);
  // const endIndex = page * limits;
  // const getData = await data.find({}).limit(endIndex).skip(startIndex);
  const getData = await data
    .find({}, { __v: 0 })
    .limit(limits)
    .skip(startIndex);
  // const getData = await data.find();
  res.send(getData);
};
export { addData, getData, getDatafilter, getAllData };
