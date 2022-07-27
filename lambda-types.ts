type LambdaEvent = {
    "version": "2.0",
    "routeKey": "$default",
    "rawPath": "/",
    "rawQueryString": "",
    "headers": {
        "x-amzn-tls-cipher-suite": "ECDHE-RSA-AES128-GCM-SHA256",
        "x-amzn-tls-version": "TLSv1.2",
        "x-amzn-trace-id": "Root=1-62e0e865-6ef70869418597f72e4d807b",
        "x-forwarded-proto": "https",
        "host": "y5nwr7b2od6ecw7g6lwu7g4mqi0ttfhj.lambda-url.eu-central-1.on.aws",
        "x-forwarded-port": "443",
        "x-forwarded-for": "84.209.1.72",
        "accept": "*/*",
        "user-agent": "curl/7.79.1"
    },
    "requestContext": {
        "accountId": "anonymous",
        "apiId": "y5nwr7b2od6ecw7g6lwu7g4mqi0ttfhj",
        "domainName": "y5nwr7b2od6ecw7g6lwu7g4mqi0ttfhj.lambda-url.eu-central-1.on.aws",
        "domainPrefix": "y5nwr7b2od6ecw7g6lwu7g4mqi0ttfhj",
        "http": {
            "method": "GET",
            "path": "/",
            "protocol": "HTTP/1.1",
            "sourceIp": "84.209.1.72",
            "userAgent": "curl/7.79.1"
        },
        "requestId": "3821960c-bad8-4f37-8c76-3b0befdb64d2",
        "routeKey": "$default",
        "stage": "$default",
        "time": "27/Jul/2022:07:25:25 +0000",
        "timeEpoch": 1658906725771
    },
    "isBase64Encoded": false
}
type LambdaContext = {
    "callbackWaitsForEmptyEventLoop": true,
    "functionVersion": "$LATEST",
    "functionName": "printRequestData",
    "memoryLimitInMB": "128",
    "logGroupName": "/aws/lambda/printRequestData",
    "logStreamName": "2022/07/27/[$LATEST]473035e211154c65ac941f0486561a3f",
    "invokedFunctionArn": "arn:aws:lambda:eu-central-1:403574577225:function:printRequestData",
    "awsRequestId": "3821960c-bad8-4f37-8c76-3b0befdb64d2"
}