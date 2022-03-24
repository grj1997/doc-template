const OSS = require('ali-oss')
const path = require('path')
const fs = require("fs-extra");
// TODO 需要配置自己的oss
const oss =  new OSS({
  region: 'region',
  accessKeyId: 'accessKeyId',
  accessKeySecret: 'accessKeySecret',
  bucket: 'bucket',
});

async function putOSS (src,dist) {
  try {
    let result = await oss.put(dist, src, {
      headers: {
        'Content-Disposition': 'attachment online',
      }
    });
    console.log('上传文件', src)
  } catch (e) {
    console.log(e);
  }
}
function addFileToOSSSync(src,dist){
  var docs = fs.readdirSync(src);
  docs.forEach(function(doc){
    var _src = src + '/' + doc,
      _dist = dist + '/' + doc;
    var st = fs.statSync( _src);
    // 判断是否为文件
    if( st.isFile()&&doc!=='.DS_Store' ){
      putOSS(_src,_dist);
    }
    // 如果是目录则递归调用自身
    else if( st.isDirectory() ){
      addFileToOSSSync( _src,_dist);
    }
  })
}
async function main() {
  const umdFile = path.join(__dirname, '../dist');
  const result = await oss.list({
    prefix: 'unifyQrCode/docs'
  })
  for (var i in result.objects) {
    await oss.delete(result.objects[i].name)
    console.log('移除线上-', result.objects[i].name)
  }
  addFileToOSSSync(umdFile, 'unifyQrCode/docs')
}

main();
