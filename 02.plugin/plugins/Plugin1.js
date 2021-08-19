class Plugin1 {
  apply(compiler) {
    compiler.hooks.emit.tap('Plugin1', (compilation) => {
      console.log('emit.tap 111');
    });

    compiler.hooks.emit.tapAsync('Plugin1', (compilation, cb) => {
      setTimeout(() => {
        console.log('emit.tap 111');
        cb();
      }, 1000);
    });

    compiler.hooks.emit.tapPromise('Plugin1', (compilation, cb) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('emit.tap 111');
          resolve();
        }, 2000);
      });
    });

    compiler.hooks.afterEmit.tap('Plugin1', (compilation) => {
      console.log('afterEmit.tap 111');
    });

    compiler.hooks.done.tap('Plugin1', (status) => {
      console.log('done.tap 111');
    });
  }
}

module.exports = Plugin1;
