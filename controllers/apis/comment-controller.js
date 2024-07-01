// 抽取共用 services 層
const commentServices = require('../../services/comment-services')

const commentController = {
  postComment: (req, res, next) => {
    return commentServices.postComment(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },

  deleteComment: (req, res, next) => {
    return commentServices.deleteComment(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  }

}

module.exports = commentController
