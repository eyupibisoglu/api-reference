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

before(async () =>
{
	await User.remove({})
	const users = _.times(10, () => User.create({"name": Faker.name.firstName(), "surname": Faker.name.lastName(), "email": Faker.internet.email(), "password": Faker.internet.password()}))
	await Promise.all( users )
})

after(async () =>
{
	await User.remove({})
})

describe('/api/v1/users', async () => 
{
	describe('GET /api/v1/users', () => 
	{
		it('should get users', async () => 
		{
			const users = await User.find()

			chai.request(server).get('/api/v1/users').end((err, res) => 
			{
				Should(res.status).be.equal(200)
				Should(res.body).be.an.instanceOf(Array)
				Should(res.body.length).be.equal(users.length)
			})
		})

		it('should get limited users', async () => 
		{
			const limit = 2
			const users = await User.find().limit(limit)

			chai.request(server).get('/api/v1/users?limit=' + limit).end((err, res) => 
			{
				Should(res.status).be.equal(200)
				Should(res.body).be.an.instanceOf(Array)
				Should(res.body.length).be.equal(users.length)
			})
		})
	})

	describe('GET /api/v1/users/:id', () => 
	{
		it('should get an user', async () => 
		{
			const user = await User.findOne()

			chai.request(server).get('/api/v1/users/' + user._id).end((err, res) => 
			{
				Should(res.status).be.equal(200)
				Should(res.body).be.an.instanceOf(Object)
				Should(res.body.name).be.equal(user.name)
			})
		})

		it('should return 204', async () => 
		{
			const id = '507f1f77bcf86cd799439011'

			chai.request(server).get('/api/v1/users/' + id).end((err, res) => 
			{
				Should(res.status).be.equal(204)
			})
		})
	})

	describe('POST /api/v1/users', () => 
	{
		it('should create an user and return that', async () => 
		{
			const name     = Faker.name.firstName()
			const surname  = Faker.name.lastName() 
			const email    = Faker.internet.email()
			const password = Faker.internet.password()

			chai.request(server).post('/api/v1/users').send({ name, surname, email, password }).end((err, res) => 
			{
				Should(res.status).be.equal(201)
				Should(res.body).be.an.instanceOf(Object)
				Should(res.body.name).be.equal(name)
				Should(res.body.surname).be.equal(surname)
				Should(res.body.email).be.equal(email)
				Should(res.body.password).be.equal(undefined)
			})
		})
	})
})

/*
describe('GET /api/v1/users/:tc', () => 
{
	it('it should GET the user', (done) => 
	{
		MongoClient.connect(databaseConnection).then(function (db) 
		{ 
			db.collection('users').update({ "tc": "10000000001" }, { $set: { "tc": "10000000001", active: true }}, { upsert: true }, function(err, result)
			{
		        should.not.exist(err);
		        
				chai.request(server).get('/api/v1/users/10000000001').end((err, res) => 
				{
					res.should.have.status(200);
					should.exist(res.body.data);
					res.body.data.should.be.a('object');
					res.body.ok.should.be.true;
					done();
				});
			});

		}).catch(function (error) 
		{
			console.error('Mongo > Connection > error:', error)
		})	

	})


});		
*/