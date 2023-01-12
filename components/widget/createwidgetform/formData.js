import * as Yup from 'yup';

export const validateSchema = Yup.object().shape({
	name: Yup.string()
		.min(2, "Too Short!")
		.max(50, "Too Long!")
		.required("Please enter your company name"),
	domain_name: Yup.string()
		.min(2, "Too Short!")
		.max(50, "Too Long!")
		.required("Please enter your company website"),
	// widgetLayout: Yup.string()
	// 	.min(2, "Too Short!")
	// 	.max(50, "Too Long!")
	// 	.required("Select Widget"),
	// platform_filter: Yup.string()
	// .min(2, 'Too Short!')
	// .max(50, 'Too Long!')
	// .required('Add Atleast 1 platform '),
	// rating_filter: Yup.string()
	// .min(2, 'Too Short!')
	// .max(50, 'Too Long!')
	// .required('Required'),
	// order_filter: Yup.string()
	// .min(2, 'Too Short!')
	// .max(50, 'Too Long!')
	// .required('Required'),
});

// export const filterData = {
// 	rating: [
// 		{ label: "4 out of 5", value: "4/5", key: 0 },
// 		{ label: "5 only", value: "5only", key: 1 },
// 	],

// 	platform: [
// 		{ label: "Google", value: "google", key: 0 },
// 		{ label: "Yelp", value: "yelp", key: 1 },
// 		{ label: "Facecbook", value: "facecbook", key: 2 },
// 	],
// 	orderBy: [
// 		{ label: "Acsending", value: "Asc", key: 0 },
// 		{ label: "Descending", value: "Desc", key: 1 },
// 	],
// };

export const selectData = {
	rating: [
		{ label: "minimum 5 stars", value: { "symbol": "<=", value: "5" } }
	],

	platform: [

		{ label: 'Google', value: 'googlemaps', key: 0 },
		{ label: 'Yelp', value: 'yelp', key: 1 },
		{ label: 'Facecbook', value: 'facecbook', key: 2 },
		{ label: 'Carwise', value: 'carwise', key: 3 },

	],
	orderBy: [
		{ label: 'Ascending', value: 'asc', key: 0 },
		{ label: 'Descending', value: 'desc', key: 1 },

	]
}

export const widgetType = [
	// {
	// 	id: 1,
	// 	name: "All",
	// 	value: "all"
	// },
	{
		id: 2,
		name: "Slider",
		value: "slider"
	},
	// {
	// 	id: 3,
	// 	name: "Sidebar",
	// 	value: "sidebar"
	// },
	{
		id: 4,
		name: "List",
		value: "list"
	},
	{
		id: 5,
		name: "Grid",
		value: "grid"
	},
	{
		id: 6,
		name: "Badge",
		value: "badge"
	},
	// {
	// 	id: 7,
	// 	name: "Button",
	// 	value: "button"
	// },
	{
		id: 8,
		name: "Floating",
		value: "floating"
	},
	// {
	// 	id: 9,
	// 	name: "Popup",
	// 	value: "popup"
	// },

]