const Mongoose = require('mongoose')
const Bcrypt   = require('bcrypt')
const Config   = require('config')

var UserSchema = new Mongoose.Schema(
{
	"name" :    String,
	"surname":  String,
	"email":    { "type": String, "required": true, "unique": true },
	"password": { "type": String, "required": true },
	"is": 
	{
		"active": { "type": Boolean, "default": true }
	}
	
}, { versionKey: false })

// If we modify that function as arrow then scope changes and this becomes undefined.
UserSchema.pre('save', async function(next)
{
    if ( this.isModified("password") ) 
        this.password = await Bcrypt.hash(this.password, Config.get('bcrypt.saltRounds'))
        
    next();
});

module.exports = Mongoose.model('User', UserSchema)