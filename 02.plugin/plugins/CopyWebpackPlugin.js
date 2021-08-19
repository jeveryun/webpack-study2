const { validate } = require('schema-utils');
const path = require('path');
const globby = require('globby');
const fs = require('fs');
const { promisify } = require('util');
const webpack = require('webpack');
const { RawSource } = webpack.sources;

const schema = require('./schema.json');

const readFile = promisify(fs.readFile);

const name = 'CopyWebpackPlugin';

class CopyWebpackPlugin {
  constructor(options = {}) {
    // 验证options是否符合规范
    validate(schema, options, {
      name: 'CopyWebpackPlugin',
    });
    this.options = options;
  }
  apply(compiler) {
    //初始化compilation
    compiler.hooks.thisCompilation.tap(name, (compilation) => {
      // 添加资源hooks
      compilation.hooks.additionalAssets.tapAsync(name, async (cb) => {
        // 将form中的资源复制到to中，输出出去
        const { from, to = '.', ignore } = this.options;
        // context 就是webpack 配置
        // 运行指令的目录
        const context = compiler.options.context;
        //将输入变成绝对路径
        const absoluteFrom = path.isAbsolute(from)
          ? from
          : path.resolve(context, from);

        // 1，过滤掉要忽略的文件
        // globby(要处理的文件夹，options)
        const paths = await globby(absoluteFrom.replace(/\\/g, '/'), {
          ignore,
        });

        console.log(paths); // 所有要加载的文件路径数组

        // 2，读取paths中所有资源
        const files = await Promise.all(
          paths.map(async (absolutePath) => {
            const data = await readFile(absolutePath);
            const relativePath = path.basename(absolutePath);

            const filename = path.join(to, relativePath);
            return {
              data,
              filename,
            };
          })
        );

        // 3，生成webpack格式的资源
        const assets = files.map((file) => {
          const source = new RawSource(file.data);
          return {
            source,
            filename: file.filename,
          };
        });

        // 4，添加compilation中，输出出去
        assets.forEach((asset) => {
          compilation.emitAsset(asset.filename, asset.source);
        });

        cb();
      });
    });
  }
}

module.exports = CopyWebpackPlugin;
