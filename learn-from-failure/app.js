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
        'body': JSON.stringify({
            message: '201'
        })
    };
};
