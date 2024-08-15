// 引入需要操作資料表的 Model
const { Comment, User, Field } = require('../models')

const commentServices = {
  postComment: (req, cb) => {
    const { text, fieldId } = req.body
    const userId = req.user.id
    // 檢查評論是否存在
    if (!text) throw Object.assign(new Error('請輸入訊息!'), { status: 422 })
    if (text.trim().length === 0) throw Object.assign(new Error('請勿輸入空白字串!'), { status: 422 })
    return Promise.all([
      User.findByPk(userId),
      Field.findByPk(fieldId, {
        include: [Comment]
      })
    ])
      .then(([userAuth, field]) => {
        if (!userAuth) throw Object.assign(new Error('下評論的使用者不存在!'), { status: 404 })
        if (!field) throw Object.assign(new Error('被評論的案場不存在!'), { status: 404 })
        field.update({
          commentCounts: field.Comments.length + 1
        })
        return Comment.create({
          text,
          userId,
          fieldId
        })
      })
      .then(newComment => cb(null, { comment: newComment }))
      .catch(err => cb(err))
  },
  deleteComment: (req, cb) => {
    const { fieldId } = req.body
    const commentId = Number(req.params.id)
    const userId = req.user.id
    return Promise.all([
      // 拿出關聯 model, 避免使用者密碼外洩
      Comment.findByPk(commentId, {
        include: [
          { model: User, attributes: { exclude: ['password'] } }
        ]
      }),
      User.findByPk(userId),
      Field.findByPk(fieldId, {
        include: [Comment]
      })
    ])
      .then(([comment, userAuth, field]) => {
        if (!comment) throw Object.assign(new Error('該則訊息不存在!'), { status: 404 })
        if (!field) throw Object.assign(new Error('被評論的案場不存在!'), { status: 404 })

        // 如果被刪的訊息不是自己的則擋掉, 管理員例外
        if (userAuth.isAdmin !== true && userAuth.email !== comment.User.email) {
          Object.assign(new Error('禁止刪除其他人的評論'), { status: 403 })
        }
        field.update({
          commentCounts: field.Comments.length < 1 ? 0 : field.Comments.length - 1
        })
        return comment.destroy()
      })
      .then(deletedComment => cb(null, { comment: deletedComment }))
      .catch(err => cb(err))
  }
}

module.exports = commentServices
