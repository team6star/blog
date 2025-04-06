//  Strapi 项目的数据库配置文件
// 引入 Node.js 的 path 模块，用于处理文件路径
const path = require('path');

// 导出一个函数，接收环境变量对象作为参数（Strapi 的标准配置方式）
module.exports = ({ env }) => ({
  connection: {
    // 指定数据库客户端为 SQLite
    client: 'sqlite',
    connection: {
      filename: path.join(__dirname, '..', env('DATABASE_FILENAME', '.tmp/data.db')),
    },
    useNullAsDefault: true,
  },
});
