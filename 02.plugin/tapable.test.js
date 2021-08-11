const {
  SyncHook,
  SyncBailHook,
  SyncLoopHook,
  AsyncParallelHook,
  AsyncSeriesHook,
} = require('tapable');

class Lesson {
  constructor() {
    this.hooks = {
      //   go: new SyncHook(['address']),
      go: new SyncBailHook(['address']),
      //   leave: new AsyncParallelHook(['name', 'age']),
      leave: new AsyncSeriesHook(['name', 'age']),
    };
  }

  tap() {
    this.hooks.go.tap('class0318', (address) => {
      console.log('class0318,', address);
      return 111;
    });
    this.hooks.go.tap('class0410', (address) => {
      console.log('class0410,', address);
    });

    this.hooks.leave.tapAsync('class0510', (name, age, cb) => {
      setTimeout(() => {
        console.log('class0510,', name, age);
        cb();
      }, 2000);
    });

    this.hooks.leave.tapPromise('class0610', (name, age) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('class0610,', name, age);
          resolve();
        }, 1000);
      });
    });
  }

  start() {
    this.hooks.go.call('c318');
    this.hooks.leave.callAsync('jack', 18, () => {
      console.log('end~~~');
    });
  }
}

const l = new Lesson();
l.tap();
l.start();
