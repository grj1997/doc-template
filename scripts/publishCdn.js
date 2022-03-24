const OSS = require('ali-oss')
const path = require('path')
const { version } = require('../package.json')

async function main() {
  const umdFile = path.join(__dirname, '../lib/unifyQrCode.umd.min.js');
  // TODO 需要配置自己的oss
  const oss =  new OSS({
    region: 'region',
    accessKeyId: 'accessKeyId',
    accessKeySecret: 'accessKeySecret',
    bucket: 'bucket',
  });
  await oss.put(`unifyQrCode/latest.js`, umdFile, {
    headers: {
      'Content-Disposition': 'attachment online',
    },
  });
  await oss.put(`unifyQrCode/${version}.js`, umdFile, {
    headers: {
      'Content-Disposition': 'attachment online',
    },
  });
  console.log('CDN 发布成功');
}

main();
