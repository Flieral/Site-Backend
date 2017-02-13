var setSubscribeModelLogic = require('../../logic/subscribe/setSubscribeModelLogic')

var Input = {
	token: {
		required: true
	}
}

exports.setSubscribeModelAction = {
	name: 'setSubscribeModelAction',
	description: 'Set Subscribe Model',
	inputs: Input,
	
	run: function (api, data, next) {
		var payload = JSON.parse(JSON.stringify(data.connection.rawConnection.params.body))
		console.log(Input)
		setSubscribeModelLogic.setSubscriberModel(data.params.token, payload, function (error, replies) {
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