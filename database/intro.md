# Sequelize 迁移使用简要说明

## 创建一张新的表

`node_modules/.bin/sequelize model:generate --name User --attributes firstName:string,lastName:string,email:string`

> Note: Sequelize will only use Model files, it's the table representation. On the other hand, the migration file is a change in that model or more specifically that table, used by CLI. Treat migrations like a commit or a log for some change in database.

## 创建新的迁移内容

`./node_modules/.bin/sequelize migration:create --name add-columns-to-telegramUsers`

## 执行迁移

`node_modules/.bin/sequelize db:migrate`

## 撤回迁移

`node_modules/.bin/sequelize db:migrate:undo`

可以使用 `--to` 参数指定撤回到的版本

`node_modules/.bin/sequelize db:migrate:undo:all --to XXXXXXXXXXXXXX-create-posts.js`

## 创建数据种子

`node_modules/.bin/sequelize seed:generate --name demo-user`

```javascript
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
        firstName: 'John',
        lastName: 'Doe',
        email: 'demo@demo.com'
      }], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
```

## 执行数据种子

`node_modules/.bin/sequelize db:seed:all`

> Note: Seeders execution is not stored anywhere unlike migrations, which use the SequelizeMeta table. If you wish to override this please read Storage section

## 撤回数据种子执行

撤回最近的数据种子的执行
`node_modules/.bin/sequelize db:seed:undo`

撤回所有的数据种子的执行
`node_modules/.bin/sequelize db:seed:undo:all`
