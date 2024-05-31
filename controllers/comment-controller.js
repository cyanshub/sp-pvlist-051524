// 引入需要操作資料表的 Model
const { Comment, User, Field } = require('../models')

const commentController = {
  postComment: (req, res, next) => {
    const { text, fieldId } = req.body
    const userId = req.user.id
    // 檢查評論是否存在
    if (!text) throw new Error('請輸入訊息!')
    if (text.trim().length === 0) throw new Error('請勿輸入空白字串!')
    return Promise.all([
      User.findByPk(userId),
      Field.findByPk(fieldId)
    ])
      .then(([user, field]) => {
        if (!user) throw new Error('下評論的使用者不存在!')
        if (!field) throw new Error('被評論的案場不存在!')
        return Comment.create({
          text,
          userId,
          fieldId
        })
      })
      .then(newComment => {
        res.redirect(`fields/${fieldId}`)
        return { comment: newComment }
      })
      .catch(err => next(err))
  },
  deleteComment: (req, res, next) => {
    const commentId = req.params.id
    const userId = req.user.id
    return Promise.all([
      // 拿出關聯 model, 避免使用者密碼外洩
      Comment.findByPk(commentId, {
        include: [
          { model: User, attributes: { exclude: ['password'] } }
        ]
      }),
      User.findByPk(userId)
    ])
      .then(([comment, user]) => {
        if (!comment) throw new Error('該則訊息不存在!')

        // 如果被刪的訊息不是自己的則擋掉, 管理員例外
        if (user.isAdmin !== true && user.email !== comment.User.email) {
          const err = new Error('禁止刪除root使用者的評論!')
          err.status = 404
          throw err
        }
        return comment.destroy()
      })
      .then(deletedComment => {
        res.redirect(`/fields/${deletedComment.fieldId}`)
        return { comment: deletedComment }
      })
      .catch(err => next(err))
  }
}

module.exports = commentController
