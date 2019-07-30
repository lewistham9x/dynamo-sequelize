# dynamo-sequelize

[![Build Status](https://travis-ci.org/zxdong262/dynamo-sequelize.svg?branch=release)](https://travis-ci.org/zxdong262/dynamo-sequelize)

A sequelize wrapper to support Sequelize and Dynamodb(limited).

## Use

```js
import Sequelize from 'sequelize'
import SequelizeDynamo from 'dynamo-sequelize'

// Only when dialect === 'dynamo', will use dynamodb,
// otherwise all args passes to Sequelize
const sequelize = new SequelizeDynamo(
  'sqlite://./db.sqlite',
  {
    define: {
      timestamps: true
    },
    logging: false,
    dialect: 'dynamo'
  }
)
let inst = sequelize.define('Ass', {
  id: { // Glip user ID
    type: Sequelize.STRING,
    primaryKey: true
  },
  name: { // glip user name
    type: Sequelize.STRING
  },
  email: { // Glip user email
    type: Sequelize.STRING
  },
  token: { // user token
    type: Sequelize.JSON
  },
  enabled: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  signed: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  privateChatOnly: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  data: { // all other data associcated with this user
    type: Sequelize.JSON
  }
})

let before = await inst.findAll()
// create
let a1 = await inst.create({
  data: {
    a: 0,
    b: []
  }
})
expect(a1.enabled).toEqual(true)
expect(a1.signed).toEqual(true)
expect(a1.privateChatOnly).toEqual(true)
expect(a1.data.a).toEqual(0)
expect(a1.data.b.length).toEqual(0)
let { id } = a1
let after = await inst.findAll()
// findAll
expect(after.length).toEqual(before.length + 1)

// findByPk
let one = await inst.findByPk(id)
expect(one.id).toEqual(a1.id)

// update
await inst.update({
  enabled: false
}, {
  where: {
    id
  }
})

let a2 = await inst.findByPk(id)
expect(a2.enabled).toEqual(false)

// find
await inst.create({
  id: 'xxx'
})
let fl = await inst.find({
  where: {
    id: 'xxx',
    enabled: true
  }
})
expect(fl.length).toEqual(1)
expect(fl[0].id).toEqual('xxx')

// findOne
let oo = await inst.findOne({
  where: {
    id
  }
})
expect(oo.id).toEqual(id)
```

## Supported features && limitations

- Enable dynamodb only when `dialect === 'dynamo'`
- Only support Model deinfe by `inst.define`
- Only support Model methods: `find`, `findAll`, `findOne`, `create`, `findByPk`, `update`.
- `find`, `findOne` and `findAll` only support `where` query.
- `update` only support `where` query.
- All `where` query must have `id`.
- Set envs through .env file, check [.env.sample](.env.sample) for detail.
- Supported data types:

```js
function typeMapper(type) {
  switch (type) {
    case Sequelize.STRING:
    case Sequelize.TEXT:
      return String
    case Sequelize.JSON:
      return Object
    case Sequelize.BOOLEAN:
      return Boolean
    case Sequelize.INTEGER:
    case Sequelize.BIGINT:
    case Sequelize.FLOAT:
    case Sequelize.DECIMAL:
    case Sequelize.DOUBLE:
      return Number
    case Sequelize.DATE:
      return Date
    default:
      throw new Error(`do not support type: ${type}`)
  }
}
```

## Why use it

Sequelize is really easy to use, just lack dynamodb support, while for AWS Lambda user, Dynamodb ease the pain of VPS settings, more ideal for lightweight services. With this module you may migrate to Dynamodb easily.

## Build/test

```bash
# compile
npm run build

# test
npm run test
```

## License

MIT
