const Markup = require('telegraf/markup')
const { addSticker } = require('../utils')


module.exports = async (ctx) => {
  const sticker = await ctx.db.Sticker.findOne({
    fileId: ctx.match[2],
  }).populate('stickerSet')

  if (sticker) {
    const result = await addSticker(ctx, sticker.file)

    if (result.ok) {
      ctx.answerCbQuery(ctx.i18n.t('callback.sticker.answerCbQuery.restored'))

      ctx.editMessageText(ctx.i18n.t('callback.sticker.restored'), {
        reply_markup: Markup.inlineKeyboard([
          Markup.callbackButton(ctx.i18n.t('callback.sticker.btn.delete'), `delete_sticker:${result.ok.stickerInfo.file_id}`),
          Markup.callbackButton(ctx.i18n.t('callback.sticker.btn.copy'), `restore_sticker:${result.ok.stickerInfo.file_id}`),
        ]),
      }).catch(() => {})
    }
    else if (result.error) {
      if (result.error.telegram) {
        ctx.answerCbQuery(ctx.i18n.t('error.answerCbQuery.telegram', {
          error: result.error.telegram.description,
        }), true)
      }
    }
  }
  else {
    ctx.answerCbQuery(ctx.i18n.t('callback.sticker.error.not_found'), true)
  }
}
