const testConfig = 
{
	"database":
	{
		"url": "mongodb://localhost:27017/api-reference-test",
		"collections":
		{
			"logs":
			{
				"cappedSize": 268435456 // Quarter GB as Byte.
			}
		}
	}
}

module.exports = testConfig