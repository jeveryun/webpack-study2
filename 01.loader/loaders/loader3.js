const { getOptions } = require('loader-utils');
const { validate } = require('schema-utils');

const schema = require('./schema.json');

module.exports = function (content, map, meta) {
  // 获取options
  const options = getOptions(this);

  console.log(333, options);

  // 校验options 是否合法
  validate(schema, options, {
    name: 'loader3',
  });

  return content;
};

module.exports.pitch = function () {
  console.log('pitch 3333');
};
