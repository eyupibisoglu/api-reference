const defaultConfig = 
{
	"database":
	{
		"url": "mongodb://localhost:27017/api-reference",
		"collections":
		{
			"logs":
			{
				"cappedSize": 268435456
			}
		}
	},
	"port": process.env.PORT || 5000,
	"jwt":
	{
		"secret": "api-reference",
		"expiresIn": "9h"
	},
	"bcrypt":
	{
		"saltRounds": 10
	}
}

module.exports = defaultConfig