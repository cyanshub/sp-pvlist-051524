// 載入共用 Services 層
const commentServices = require('../../services/comment-services')

const commentController = {
  postComment: (req, res, next) => {
    return commentServices.postComment(req, (err, data) => {
      if (err) return next(err)
      req.session.creatededdata = data
      return res.redirect(`/fields/${data.comment.fieldId}`)
    })
  },
  deleteComment: (req, res, next) => {
    return commentServices.deleteComment(req, (err, data) => {
      if (err) return next(err)
      req.session.deleteddata = data
      req.flash('success_messages', '成功刪除訊息!')
      return res.redirect(`/fields/${data.comment.fieldId}`)
    })
  }
}

module.exports = commentController
