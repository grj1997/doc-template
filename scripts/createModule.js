const qa = require("prompts");
const fs = require("fs-extra");
const { join } = require("path");
const { dedent } = require("vtils");
const exec = require("execa");

async function main() {
  const { name, hasPayload } = await qa([
    {
      name: "name",
      message: "要创建的组件，请用驼峰命名,如：sycnWx",
      type: "text",
    },
    {
      name: "hasPayload",
      message: "所属板块？",
      type: "toggle",
      active: "TV",
      inactive: "mobile",
      initial: true,
    },
  ]);
  if (name) {
    const srcDir = join(
      __dirname,
      `../packages/${hasPayload ? "TV" : "mobile"}/${name}`
    );
    const docFile = join(join(__dirname, '../src/views'), `${name}-doc.vue`)
    const vueFile = join(srcDir, `${name}.vue`);
    const exportJs = join(srcDir, `index.js`);
    fs.mkdirSync(srcDir);
    await fs.writeFile(docFile, dedent`
<template>
  <div class="${name}-doc"></div>
</template>
<!--test-->
<script>
  export default {
    name: "${name}-doc",
    components: {},
    data() {
      return {}
    },
    mounted() {
    },
    methods: {}
  }
</script>

<style scoped lang="scss">
  .${name}-doc {
  }
</style>
    `)

    await fs.writeFile(
      vueFile,
      dedent`

<template>
  <div class="${name}">
  </div>
</template>
<!--demo-->
<script>
  export default {
    name: "${name}",
    emits: {},
    props: {},
    data() {
      return {}
    },
    mounted() {
    },
    methods: {}
  }
</script>

<style scoped lang="scss">
  .${name} {
  }
</style>

    `
    );
await fs.writeFile(
      exportJs,
      dedent`
import ${name} from './${name}.vue'
export default ${name}
    `
    );
    await exec('npm', ['run', 'updateExportJs'], {
      stdio: 'inherit',
    });
    console.log("✔️ 组件 已创建");
  }
}

main();
