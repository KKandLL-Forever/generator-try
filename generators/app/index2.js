//Generator入口
//导出一个继承自Yeoman Generator的类
const path = require('path')
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
      {
        type: 'checkbox',
        name: 'preprocessor',
        message: 'which css preprocessor?',
        choices:[
          {
            name: 'Sass',
            value: 'Sass',
            checked: true
          },
          {
            name: 'Less',
            value: 'Less',
          },
        ],
        default: [
          {
            name: 'Sass',
            value: 'isSass',
            // checked: false
          },
          {
            name: 'Less',
            value: 'isLess',
            // checked: false
          }
        ]
      }
    ])
      .then(answer => {
        //接收用户的输入值
        this.answers = answer
        console.log(this.answers,'ss')
      })
  }
  
  writing() {
    let jsonPath = path.resolve(__dirname,'./package.json')
    console.log(xxx,'ppp')
    this.env.options.nodePackageManager = 'yarn';
    let fileDepend = this.fs.readJSON(this.destinationPath('package.json'))
    if(this.answers.preprocessor.length > 0){
      switch (this.answers.preprocessor[0]) {
        case 'Sass':
          fileDepend = {...fileDepend.devDependencies,...{"sass": "^1.18.0", "sass-loader": "^7.1.0",}}
          break;
        case 'Less':
          fileDepend = {...fileDepend.devDependencies,...{"less": "^3.13.0", "less-loader": "^7.3.0",}}
          break;
      }
    }
    const pkgJson = {
      devDependencies: {
        ...fileDepend
      },
      // dependencies: {
      //   react: '^16.2.0'
      // }
    };
    
    // // Extend or create package.json file in destination path
    this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
    
    //需要写入文件时调用
    const template = [
      '.browserslistrc',
      '.editorconfig',
      '.env.development',
      '.env.production',
      '.eslintrc.js',
      '.gitignore',
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
