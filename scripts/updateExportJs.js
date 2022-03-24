const fs = require("fs-extra");
const { join } = require("path");
const { dedent } = require("vtils");

const srcDirTV = join(
  __dirname,
  `../packages/TV`
);
const srcDirMobile = join(
  __dirname,
  `../packages/mobile`
);
async function main (srcDir, key) {
  let arr = []
  fs.readdirSync(srcDir).forEach(file => {
    const path = join(srcDir, file)
    let stat = fs.statSync(path)
    if (stat.isDirectory()) {
      let _p = `.${path.split(key)[1].replace(/\\/g, '/')}/index`
      arr.push({
        name: _p.split('/')[1],
        path: `import ${_p.split('/')[1]} from '${_p}'`
      })
    }
  })
  await fs.writeFile(srcDir + '/index.js', dedent`
${
arr.map(item => item.path).join('\n')
}
export default [
  ${
    arr.map(item => item.name).join(',\n')
  }
]
  `)
}
main(srcDirTV, 'TV')
main(srcDirMobile, 'mobile')
