exports['default'] = {
  routes: function (api) {
    return {

      get: [{
          path: '/:apiVersion/siteBackend/subscribe/:token',
          action: 'getSubscribeModelAction'
        },
        {
          path: '/:apiVersion/SiteBackend/Message/:token',
          action: 'getMessageModelAction'
        }
      ],

      post: [{
          path: '/:apiVersion/Sitebackend/Subscribe/:token',
          action: 'setSubscribeModelAction'
        },
        {
          path: '/:apiVersion/SiteBackend/Message/:token',
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