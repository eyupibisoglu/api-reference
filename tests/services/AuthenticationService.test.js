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




    

	describe('Authentication', () =>
	{
        before(async () =>
        {
            try
            {
                await User.remove({})
                const users = _.times(10, () => ({"name": Faker.name.firstName(), "surname": Faker.name.lastName(), "email": Faker.internet.email(), "password": Faker.internet.password()}))
                await User.insertMany( users )
            }
            catch (error)
            {
                console.log('#error A1', error)
            }
        })

        after(async () =>
        {
            await User.remove({})
        }) 

        describe('POST /api/v2/authentication/authenticate', () =>
	    {               
            it('should return 200', async () =>
            {
                const email    = Faker.internet.email()
                const password = Faker.internet.password()
                
                const user = await User.create({ email, password })
                const res  = await chai.request(server).post('/api/v1/authentication/authenticate').send({ email, password })

                Should(res.status).be.equal(200)
                Should(res.body).have.property('user')
                Should(res.body.user).have.property('email', email) 
                Should(res.body).have.property('accessToken')   
                Should(res.body.user).have.not.property('password', undefined)            
            })

            it('should return 409 abcence of email that belongs to registered user.', async () =>
            {
                const email    = Faker.internet.email()
                const password = Faker.internet.password()
                
                const user = await User.create({ email, password })
                const res  = await chai.request(server).post('/api/v1/authentication/authenticate').send({ email })

                Should(res.status).be.equal(409)
                Should(res.body).have.property('message', '"password" is required')        
            })

            it('should return 401 (Non Exists User)', async () => 
            {
                const email    = Faker.internet.email()
                const password = Faker.internet.password()

                const res = await chai.request(server).post('/api/v1/authentication/authenticate').send({ email, password })

                Should(res.status).be.equal(401)
                Should(res.body).have.property('message', 'User is not found.')     
            })

            it('should return 500 beacuse abcence of email', async () => 
            {
                const password = Faker.internet.password()

                const res = await chai.request(server).post('/api/v1/authentication/authenticate').send({ password })
                
                Should(res.status).be.equal(409)
                Should(res.body).have.property('message', '"email" is required') 
                
            })

            it('should return 500 beacuse abcence of password', async () => 
            {
                const email = Faker.internet.email()

                const res = await chai.request(server).post('/api/v1/authentication/authenticate').send({ email })
                
                Should(res.status).be.equal(409)
                Should(res.body).be.an.instanceOf(Object)
                Should(res.body.message).be.equal('"password" is required')
                
            })
        })
	})
