// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
exports.helloHandler = async (event, context) => {
    try {
        return {
            'statusCode': 200,
            'body': JSON.stringify({
                message: 'hello world!!'
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }
};

exports.testHandler = async (event, context) => {
    return {
        'statusCode': 200,
        'body': JSON.stringify({
            message: 'test'
        })
    };
};

exports.postImageHandler = async (event, context) => {
    return {
        'statusCode': 200,
        'body': JSON.stringify({
            message: 'test'
        })
    };
};
