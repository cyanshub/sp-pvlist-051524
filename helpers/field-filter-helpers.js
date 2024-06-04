module.exports = {
  getFieldsFilter: function (fields, keyword) {
    fields = fields.filter(field =>
      field.name.toLowerCase().includes(keyword.toLowerCase()) ||
    field.fullAddress.toLowerCase().includes(keyword.toLowerCase()))
    return fields
  }
}
