const Mongoose = require('mongoose')
const Config   = require('config')
const Faker    = require('faker')
const _ 	   = require('lodash')
const Should   = require('should')

// ### Database ###
Mongoose.connect( Config.get('database.url') )
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


    describe('POST /api/v2/authentication/authenticate', () =>
    {               
        it('should return 200 (Email ✓, password ✓)', async () =>
        {
            const email    = Faker.internet.email()
            const password = Faker.internet.password()
            
            await User.create({ email, password })
            const res  = await chai.request(server).post('/api/v1/authentication/authenticate').send({ email, password })

            Should(res.status).be.equal(200)
            Should(res.body).have.property('user')
            Should(res.body.user).have.property('email', email) 
            Should(res.body).have.property('accessToken')   
            Should(res.body.user).have.not.property('password', undefined)            
        })

        it('should return 409 abcence of password that belongs to registered user. (Email ✓, password none)', async () =>
        {
            const email    = Faker.internet.email()
            const password = Faker.internet.password()
            
            await User.create({ email, password })
            const res  = await chai.request(server).post('/api/v1/authentication/authenticate').send({ email })

            Should(res.status).be.equal(409)
            Should(res.body).have.property('message', '"password" is required')        
        })

        it('should return 409 abcence of password that belongs to registered user. (Email ✗, password none)', async () =>
        {
            const email    = Faker.internet.email()
            
            const res  = await chai.request(server).post('/api/v1/authentication/authenticate').send({ email })

            Should(res.status).be.equal(409)
            Should(res.body).have.property('message', '"password" is required')        
        })

        it('should return 409 abcence of email that belongs to registered user. (Email none, password ✓)', async () =>
        {
            const email    = Faker.internet.email()
            const password = Faker.internet.password()
            
            await User.create({ email, password })
            const res  = await chai.request(server).post('/api/v1/authentication/authenticate').send({ password })

            Should(res.status).be.equal(409)
            Should(res.body).have.property('message', '"email" is required')        
        })

        it('should return 409 abcence of email that belongs to registered user. (Email none, password ✗)', async () =>
        {
            const password = Faker.internet.password()
            
            const res  = await chai.request(server).post('/api/v1/authentication/authenticate').send({ password })

            Should(res.status).be.equal(409)
            Should(res.body).have.property('message', '"email" is required')        
        })

        it('should return 401 (Email ✗, password ✗)', async () => 
        {
            const email    = Faker.internet.email()
            const password = Faker.internet.password()

            const res = await chai.request(server).post('/api/v1/authentication/authenticate').send({ email, password })

            Should(res.status).be.equal(401)
            Should(res.body).have.property('message', 'User is not found.')     
        })

        it('should return 401 because email is right but password is wrong. (Email ✓, password ✗)', async () => 
        {
            const email         = Faker.internet.email()
            const password      = Faker.internet.password()
            const wrongPassword = Faker.internet.password()

            await User.create({ email, password })
            const res = await chai.request(server).post('/api/v1/authentication/authenticate').send({ email, password: wrongPassword })

            Should(res.status).be.equal(401)
            Should(res.body).have.property('message', 'Password is wrong.')     
        })

        it('should return 401 because password is right but email is wrong. (Email ✗, password ✓)', async () => 
        {
            const email      = Faker.internet.email()
            const wrongEmail = Faker.internet.email()
            const password   = Faker.internet.password()

            await User.create({ email, password })
            const res = await chai.request(server).post('/api/v1/authentication/authenticate').send({ email: wrongEmail, password })

            Should(res.status).be.equal(401)
            Should(res.body).have.property('message', 'User is not found.')     
        })

        it('should return 401 because email is right but password is wrong. (Email none, password none)', async () => 
        {
            const res = await chai.request(server).post('/api/v1/authentication/authenticate').send({})
console.log(res.body)
            Should(res.status).be.equal(409)
            Should(res.body).have.property('message', '"email" is required')     
        })
    })
})
