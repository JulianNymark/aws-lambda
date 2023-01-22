# AWS Lambda made simple!

<p align='center'>
  <img align='center' src="./README/aws_lambda.webp">
</p>

# How to run

## local testing

```bash
cd functionName
npm run start
```

## deploy to lambda

`npm run update --name=bicycleAPI`


usually it is:

`cd functionName/`

followed by:

`npm run start`


---

look at npm scripts in each individual lambda function for specifics on running the function locally (for testing). Every function is a bit different. Most of the lambdas assume that they are in fact running in a lambda, so they might break if the `event.handler` is not called correctly! (some of the lambdas npm scripts send in a more complex looking `event.json` object, others are fine without it!)
