exports.getImageHandler = async (event, context) => {
    const AWS = require('aws-sdk');
    const s3 = new AWS.S3({'region':'ap-northeast-1'});
    const params = {
        Bucket: 'learn-from-failure',
        StartAfter: 'upload/image'
    };
    const s3Images = await s3.listObjectsV2(params).promise();
    return {
        'statusCode': 200,
        'headers': {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            'Access-Control-Allow-Methods': 'GET'
        },
        'body': JSON.stringify({
            message: s3Images || []
        })
    };
};

exports.postImageHandler = async (event, context) => {
    const AWS = require('aws-sdk');
    const s3Bucket = new AWS.S3( { params: {Bucket: 'learn-from-failure'} } );
    const name = decodeURIComponent(event.body.split('name=')[1].split('&')[0]);
    const uploadFile = decodeURIComponent(event.body.split('uploadImage=')[1]);
    // ファイルとして必要な情報だけを抽出
    const matches = uploadFile.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    // BufferでBase64decodeしてバイナリに変換
    const imageBuffer = Buffer.from(matches[2], 'base64');
    const extension = matches[1].split('/')[1];

    const buf = Buffer.from(uploadFile, 'base64')
    const data = {
        Key: `upload/image/${name}.${extension}`,
        ContentType: imageBuffer.type,
        Body: imageBuffer
    };
    const ret = await s3Bucket.putObject(data).promise();
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Methods': 'POST'
        },
        'body': JSON.stringify({
            message: '201'
        })
    };
};

exports.deleteImageHandler = async (event, context) => {
    const AWS = require('aws-sdk');
    const key = decodeURIComponent(event.body.split('key=')[1].split('&')[0]);
    const s3Bucket = new AWS.S3( { params: {Bucket: 'learn-from-failure' } } );
    const data = {
        Key: key
    }

    const ret = await s3Bucket.deleteObject(data).promise();
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Methods': 'DELETE'
        },
        'body': JSON.stringify({
            message: '204'
        })
    };
};

exports.getTimeoutHandler1 = async (event, context) => {
    const timeoutfunc = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log(25000);
                resolve();
            }, 25000)
        });
    };
    const ret = await timeoutfunc();
    return {
        'statusCode': 200,
        'body': JSON.stringify({
            message: 'timsafe'
        })
    };
};

exports.getTimeoutHandler2 = async (event, context) => {
    const timeoutfunc = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log(30000);
                resolve();
            }, 30000)
        });
    };
    const ret = await timeoutfunc();
    return {
        'statusCode': 200,
        'body': JSON.stringify({
            message: 'timeout'
        })
    };
};