
const counterApp = () => {
  let count = 0

  const listener = (event) => {
    if (!event) {
      return
    }
    const { data, origin } = event
    if (origin !== window.parent.location.origin || !data) {
      return
    }
    const { source, payload } = data
    if (source !== 'extension_framework_client' || !payload) {
      return
    }
    if (payload.event === 'increment_click') {
      count += 1
    } else if (payload.event === 'decrement_click') {
      count -= 1
    }
    window.parent.postMessage({
      payload: {
        event: 'update_model',
        modelName: 'counter',
        path: 'count',
        value: count
      },
      source: 'extension_framework_client'
    })
  }

  window.addEventListener('message', listener)
  window.addEventListener('unload', () => {
    window.removeEventListener('message', listener)
  })
}

const propagateApp = () => {

  const listener = (event) => {
    if (!event) {
      return
    }
    const { data, origin } = event
    if (origin !== window.parent.location.origin || !data) {
      return
    }
    const { source, payload } = data
    if (source !== 'extension_framework_client' || !payload) {
      return
    }
    if (payload.event === 'update_field_text' && payload.modelName === 'propagate') {
      window.parent.postMessage({
        payload: {
          event: 'update_model',
          modelName: 'propagate',
          path: payload.path === 'fieldA' ? 'fieldB' : 'fieldA',
          value: payload.value
        },
        source: 'extension_framework_client'
      })
    }
  }

  window.addEventListener('message', listener)
  window.addEventListener('unload', () => {
    window.removeEventListener('message', listener)
  })
}

(function () {

  // The configuration object needs to be created using an API.
  // Chatty should be used to send the message.
  // An API should probably be built on top of chatty that configures
  // and sends the message.

  window.parent.postMessage({
    payload: {
      event: 'render_component_tree',
      component: {
        type: 'row_layout',
        children: [
          {
            type: 'sidebar',
            initialItemIndex: 0,
            width: 250,
            heading: {
              label: 'My Sidebar',
              icon: 'Flag'
            },
            items: [
              {
                label: 'Dashboard (TODO)',
                icon: 'Dashboard',
                payload: {
                  targetId: 'main_view',
                  event: 'show_card',
                  cardId: 'bing_ads_clicks_dashboard',
                },
              },
              {
                label: 'Example.com',
                icon: 'External',
                payload: {
                  targetId: 'main_view',
                  event: 'show_card',
                  cardId: 'example_iframe',
                },
              },
              {
                label: "Wil's Special!",
                icon: 'ApplicationSelect',
                payload: {
                  targetId: 'main_view',
                  event: 'show_card',
                  cardId: 'wils_special_iframe',
                },
              },
              {
                label: "Counter",
                icon: 'ApplicationSelect',
                payload: {
                  targetId: 'main_view',
                  event: 'show_card',
                  cardId: 'counter',
                },
              },
              {
                label: "Propagate",
                icon: 'ApplicationSelect',
                payload: {
                  targetId: 'main_view',
                  event: 'show_card',
                  cardId: 'propagate',
                },
              },
            ]
          },
          {
            type: 'card_layout',
            id: 'main_view',
            cards: [
              {
                id: 'bing_ads_clicks_dashboard',
                type: 'dashboard',
                dashboardId: 'block_bing_ads::bing_ads_clicks',
              },
              {
                id: 'example_iframe',
                type: 'iframe',
                srcUrl: 'https://example.com',
              },
              {
                id: 'wils_special_iframe',
                type: 'iframe',
                jsName: 'hello.js',
              },
              {
                id: 'counter',
                type: 'column_layout',
                children: [
                  {
                    type: 'button',
                    label: 'Increment',
                    payload: {
                      event: 'increment_click'
                    }
                  },
                  {
                    type: 'button',
                    label: 'Decrement',
                    payload: {
                      event: 'decrement_click'
                    }
                  },
                  {
                    type: 'field_text',
                    label: 'Counter',
                    modelName: 'counter',
                    path: 'count',
                    readOnly: true,
                  },
                ],
              },
              {
                id: 'propagate',
                type: 'column_layout',
                children: [
                  {
                    type: 'field_text',
                    label: 'Field A',
                    modelName: 'propagate',
                    path: 'fieldA',
                  },
                  {
                    type: 'field_text',
                    label: 'Field B',
                    modelName: 'propagate',
                    path: 'fieldB',
                  },
                ],
              },
            ]
          },
        ]
      }
    },
    source: 'extension_framework_client'
  }, window.parent.location.origin)

  counterApp()
  propagateApp()
})()
