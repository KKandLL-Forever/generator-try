//Generator入口
//导出一个继承自Yeoman Generator的类
const Generator = require("yeoman-generator")

module.exports = class extends Generator {
  prompting() {
    return this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Your project name?',
        default: this.appname
      },
    ])
      .then(answer => {
        //接收用户的输入值
        this.answers = answer
      })
  }
  
  writing() {
    //需要写入文件时调用
    const template = [
      '.browserslistrc',
      '.editorconfig',
      '.env.development',
      '.env.production',
      '.eslintrc.js',
      'babel.config.js',
      'package.json',
      'postcss.config.js',
      'README.md',
      'public/favicon.ico',
      'public/index.html',
      'src/App.vue',
      'src/main.js',
      'src/router.js',
      'src/assets/logo.png',
      'src/components/HelloWorld.vue',
      'src/store/actions.js',
      'src/store/getters.js',
      'src/store/index.js',
      'src/store/mutations.js',
      'src/store/state.js',
      'src/utils/request.js',
      'src/views/About.vue',
      'src/views/Home.vue'
    ]
    template.forEach(item => {
      this.fs.copyTpl(
        this.templatePath(item),
        this.destinationPath(item),
        this.answers
      )
    })
  }
}
