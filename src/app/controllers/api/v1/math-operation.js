const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const event = req.body;
  console.log('Received event:', JSON.stringify(event, null, 2));
  if (event.a === undefined || event.b === undefined || event.op === undefined) {
    res.send({ success: false, message: 'Invalid Input', statusCode: 400 });
  }

  var result = {};
  result.a = Number(event.a);
  result.b = Number(event.b);
  result.op = event.op;

  if (isNaN(event.a) || isNaN(event.b)) {
    res.send({ success: false, message: 'Invalid Operand', statusCode: 400 });
  }

  switch (event.op) {
    case "+":
    case "add":
      result.c = result.a + result.b;
      break;
    case "-":
    case "sub":
      result.c = result.a - result.b;
      break;
    case "*":
    case "mul":
      result.c = result.a * result.b;
      break;
    case "/":
    case "div":
      result.c = result.b === 0 ? NaN : Number(event.a) / Number(event.b);
      break;
    default:
      res.send({ success: false, message: 'Invalid Operator', statusCode: 400 });
      break;
  }
  res.send({ success: true, message: 'Summation successful!', data: result, statusCode: 200 });
});

module.exports = router;

