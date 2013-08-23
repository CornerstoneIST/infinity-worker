module.exports = {
	development: {
		db: 'mongodb://heroku_app14220631:sa8fb17r1tvvijse1atvnrasbl@ds063177.mongolab.com:63177/heroku_app14220631',
		zd: {
			subdomain: 'cornerstoneist',
		    username: 'jpogosyan@cornerstoneist.com',
		    token: 'lK5fuxstO87o2Hh7ZDW5pdzO56FcdNH6xj6DiDkm'
		},

		fb: {
			host:'cornerstoneist.freshbooks.com',
			token:'10d8cfaddff7dc9e986d33f2b266b637'
		}
	},
	production: {
		//db: 'mongodb://localhost/zendesk',
		db: 'mongodb://heroku_app14220631:sa8fb17r1tvvijse1atvnrasbl@ds063177.mongolab.com:63177/heroku_app14220631',
		zd: {
			subdomain: 'cornerstoneist',
		    username: 'jpogosyan@cornerstoneist.com',
		    token: 'lK5fuxstO87o2Hh7ZDW5pdzO56FcdNH6xj6DiDkm'
		},

		fb: {
			host:'cornerstoneist.freshbooks.com',
			token:'10d8cfaddff7dc9e986d33f2b266b637'
		}
	},
	zd: {
		 subdomain: 'cornerstoneist',
	     username: 'jpogosyan@cornerstoneist.com',
	     token: 'lK5fuxstO87o2Hh7ZDW5pdzO56FcdNH6xj6DiDkm'
	},

	fb: {
		host:'cornerstoneist.freshbooks.com',
		token:'10d8cfaddff7dc9e986d33f2b266b637'
	}

}