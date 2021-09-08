const fs = require('fs');
const babelParser = require('@babel/parser');
const babelTraverse = require('@babel/traverse').default;

function myWebpack(config) {
  return new Compiler(config);
}

class Compiler {
  constructor(options = {}) {
    this.options = options;
  }

  // 启动webpack打包
  run() {
    //1.读取入口文件内容
    // 入口文件路径
    const filePath = this.options.entry;
    const file = fs.readFileSync(filePath, 'utf-8');
    //2.将其解析成ast抽象语法树
    const ast = babelParser.parse(file, {
      sourceType: 'module', // 解析文件的模块方案是 ES module
    });
    // debugger;
    console.log(ast);

    // 收集依赖
    babelTraverse(ast, {
      // 内部会遍历ast 中program.body, 判断里面的语句类型
      // 如果 type：ImportDeclaration 就会触发当前函数
      ImportDeclaration(code) {
        debugger;
        console.log(code);
      },
    });
  }
}

module.exports = myWebpack;
