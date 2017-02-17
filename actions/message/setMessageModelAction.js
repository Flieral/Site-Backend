var setMessageModelLogic = require('../../logic/message/setMessageModelLogic.js')

var Input = {
	token: {
		required: true
	}
}

exports.setMessageModelAction = {
	name: 'setMessageModelAction',
	description: 'Set Message Model',
	inputs: Input,
	
	run: function (api, data, next) {
		var payload = JSON.parse(JSON.stringify(data.connection.rawConnection.params.body))
		setMessageModelLogic.setMessageModel(data.params.token, payload, function (error, replies) {
			if (error) {
				data.response.error = error.error
				next(error)
			}
			else {
				data.response.result = replies
				next()
			}
		})
	}
}
