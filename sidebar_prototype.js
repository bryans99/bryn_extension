
// The configuration object needs to be created using an API.
// Chatty should be used to send the message.
// An API should probably be built on top of chatty that configures
// and sends the message.

window.parent.postMessage({
	payload: {
		event: 'extensions_dsl',
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
						}
					]
				},
			]
		}
	},
	source: 'extension_framework_client'
}, window.parent.location.origin)
