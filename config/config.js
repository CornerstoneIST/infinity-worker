module.exports = {
	development: {
		db: 'mongodb://heroku_app14220631:sa8fb17r1tvvijse1atvnrasbl@ds063177.mongolab.com:63177/heroku_app14220631',
		zd: {
			subdomain: 'cornerstoneistsandbox',
		    username: 'harut.muradyan@simplytech.co',
		    token: 'DOcSOMIZnuBXKFiTY9HwL0MyQ2TNGNhxLn2UBeTL'
		},

		fb: {
			host:'cornerstoneistsandbox.freshbooks.com',
			token:'9936916e20a4f05e4a81889b235ccce9'
		}
	},
	production: {
		//db: 'mongodb://localhost/zendesk',
		db: 'mongodb://heroku_app14220631:sa8fb17r1tvvijse1atvnrasbl@ds063177.mongolab.com:63177/heroku_app14220631',
		zd: {
			subdomain: 'cornerstoneistsandbox',
		    username: 'harut.muradyan@simplytech.co',
		    token: 'DOcSOMIZnuBXKFiTY9HwL0MyQ2TNGNhxLn2UBeTL'
		},

		fb: {
			host:'cornerstoneistsandbox.freshbooks.com',
			token:'9936916e20a4f05e4a81889b235ccce9'
		}
	},
	zd: {
		 subdomain: 'cornerstoneistsandbox',
	     username: 'harut.muradyan@simplytech.co',
	     token: 'DOcSOMIZnuBXKFiTY9HwL0MyQ2TNGNhxLn2UBeTL'
	},

	fb: {
		host:'cornerstoneistsandbox.freshbooks.com',
		token:'9936916e20a4f05e4a81889b235ccce9'
	}

}