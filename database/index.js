const collections = require('./models')
const connection = require('./connection')


const db = {}

Object.keys(collections).forEach((collectionName) => {
  db[collectionName] = connection.model(collectionName, collections[collectionName])
})

db.User.updateData = (tgUser) => new Promise(async (resolve, reject) => {
  let telegramId = tgUser.id

  if (tgUser.telegram_id) telegramId = tgUser.telegram_id

  let user = await db.User.findOne({ telegram_id: telegramId })

  if (!user) {
    user = new db.User()
    user.telegram_id = tgUser.id
  }
  user.first_name = tgUser.first_name
  user.last_name = tgUser.last_name
  user.username = tgUser.username
  user.updatedAt = new Date()
  await user.save()

  resolve(user)
})

db.Sticker.addSticker = () => new Promise(async (resolve, reject) => {

  const sticker = new db.User()

  resolve(sticker)
})

module.exports = {
  db,
}