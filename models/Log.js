const Config   = require('config')
const Mongoose = require('mongoose')

const LogSchema = new Mongoose.Schema(
{
	"request":
	{
		"method": { "type": String, "required": true },
		"action": { "type": String, "required": true },
		"data"	: { "type": Object }
	},
	"response":
	{
		"status": { "type": Number, "required": true },
		"data":   { "type": Object }
	},
	"createdAt": { "type": Number, "default": Date.now }
	
}, { versionKey: false, capped: { "size": Config.get('database.collections.logs.cappedSize') }})

module.exports = Mongoose.model('Log', LogSchema)

	