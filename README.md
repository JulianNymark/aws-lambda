<p align='center'>
  <img align='center' src="./README/aws_lambda.webp">
</p>

# AWS Lambda made simple!

# Hosted functions / DEMO

| Function | URL |
| --- | --- |
| bicycleAPI | https://tsrvwopboogczyvb3tjewfq3ga0lltpz.lambda-url.eu-central-1.on.aws/api/v1 |

# How to run

## prerequisites

The scripts in the root `package.json` interact with AWS lambda (deploy, fetch... ). For these to work you must have a working `aws` cli setup (run `aws configure`).

The scripts use the following tools:

| Tool | Description |
| --- | --- |
| jq | command line JSON manipulation utility |
| unzip | zip and unzip packages to send to AWS |
| curl | CLI requests utility |
| aws | cli main utility to interact with AWS resources from CLI |

## local testing

```bash
cd functionName
npm i
npm run start
```

## deploy to lambda

`npm run update --name=functionName`


## helper functions (wrap aws cli)

- `npm run list-functions`
- `npm run fetch --name=functionName`
- `npm run update --name=functionName`


---

look at npm scripts in each individual lambda function for specifics on running the function locally (for testing). Every function is a bit different. Most of the lambdas assume that they are in fact running in a lambda, so they might break if the `event.handler` is not called correctly! (some of the lambdas npm scripts send in a more complex looking `event.json` object, others are fine without it!)
