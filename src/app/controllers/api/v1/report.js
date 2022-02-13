const express = require('express');
const { Parser } = require('json2csv');
const utility = require('./../../../../utility/util');
const router = express.Router();

router.get('/', (req, res) => {
  // Block #1
  // To block the process execution
  for (let i = 0; i < 30000; i++) {
    console.log('Generating report...', i);
  }

  // Block #2
  const processName = 'TestProcess';
  const headerData = {id: 123, name: 'test'};
  const fields = Object.keys(headerData);
  const opts = { fields };
  console.log('opts >>>', opts);
  let csv = '';
  try {
    const parser = new Parser(opts);
    csv = parser.parse(fields);
    console.log('header fields >>>', csv);
  } catch (err) {
    console.error(err);
  }
  const currentDate = utility.formatDate(new Date());
  const fileName = `${processName}_${currentDate}.csv`;
  res.setHeader('Content-disposition', 'attachment; filename='+fileName);
  res.set('Content-Type', 'text/csv');
  // res.status(200).send(csv);
  res.write(csv);
  res.end();
});

module.exports = router;
