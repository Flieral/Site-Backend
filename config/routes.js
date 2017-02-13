exports['default'] = {
  routes: function (api) {
    return {

      get: [{
          path: '/SiteBackend/Subscribe/:Token',
          action: 'getSubscribeModelAction'
        },
        {
          path: '/SiteBackend/Message/:Token',
          action: 'getMessageModelAction'
        }
      ],

      post: [{
          path: '/SiteBackend/Subscribe/:Token',
          action: 'setSubscribeModelAction'
        },
        {
          path: '/SiteBackend/Message/:Token',
          action: 'setMessageModelAction'
        }
      ],

      put: [

      ],

      delete: [

      ]

    }
  }
}