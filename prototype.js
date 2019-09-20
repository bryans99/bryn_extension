window.parent.postMessage({
	payload: {
		event: 'extensions_dsl',
		component: {
			type: 'flow_layout',
			children: [
				{
					type: 'dashboard',
					dashboardId: 'block_bing_ads::bing_ads_clicks',
					height: 300,
					width: 400
				},
				{
					type: 'iframe',
					srcUrl: 'https://example.com',
					height: 300,
					width: 400
				},
				{
					type: 'iframe',
					jsName: 'hello.js',
					height: 300,
					width: 400
				}
			]
		}
	},
	source: 'extension_framework_client'
}, window.parent.location.origin)

