var getMessageModelLogic = require('../../logic/message/getMessageModelLogic')

var Input = {
	Token: {
		required: true
	}
}

exports.getMessageModelAction = {
	name: 'getMessageModelLogicAtion',
	description: 'Get Message Model',
	inputs: Input,
	
	run: function (api, data, next) {
		
	}
}