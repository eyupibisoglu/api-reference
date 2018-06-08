const Mongoose = require('mongoose')
const Config   = require('config')
const Faker    = require('faker')
const _ 	   = require('lodash')
const Should   = require('should')

// ### Database ###
const Connection = Mongoose.connect( Config.get('database.url') )
const User 		 = require('../../models/User')

let chai   = require('chai')
let server = require('../../app')


chai.use(require('chai-http'))



describe('/api/v1/authentication', async () => 
{
	describe('POST /api/v1/authentication/authenticate', () => 
	{
		it('should create an user and return 200', async () => 
		{
            const email    = Faker.internet.email()
            const password = Faker.internet.password()
            
            const user = await User.create({ email, password })

			chai.request(server).post('/api/v1/authentication/authenticate').send({ email, password }).end((err, res) => 
			{
				Should(res.status).be.equal(200)
				Should(res.body).be.an.instanceOf(Object)
				Should(res.body.email).be.equal(email)
				Should(res.body.password).be.equal(undefined)
			})
        })
        
        it('should return 401', async () => 
		{
			const email    = Faker.internet.email()
			const password = Faker.internet.password()

			chai.request(server).post('/api/v1/authentication/authenticate').send({ email, password }).end((err, res) => 
			{
				Should(res.status).be.equal(401)
				Should(res.body).be.an.instanceOf(Object)
				Should(res.body.message).be.equal('Email is not found.')
			})
        })
        
	})
})