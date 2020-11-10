import moment from 'moment';


export default function parseGraphQL(data, today, endDate){

	let parsedData = {
		'British Columbia': {},
		'Alberta': {},
		'Manitoba': {},
		'Saskatchewan': {},
		'Ontario': {},
		'Quebec': {},
		'Newfoundland and Labrador': {},
		'Prince Edward Island': {},
		'Nova Scotia': {},
		'New Brunswick': {}
	}

	// generate an array of dates that we are displaying on the graph
	let reportedDate = [];
	while (endDate <= today) {
    	reportedDate.push(endDate.format('YYYY-M-D'));
    	endDate = endDate.clone().add(1, 'd');
	}
	parsedData['reportedDate'] = reportedDate;

	// loop through our case data and append it to each regions array so we can easily display it
	data.forEach(element => {
		let healthRegion = element.node.healthRegion.healthRegion;
		let province = element.node.healthRegion.province;

		if(healthRegion in parsedData[province]){
			parsedData[province][healthRegion].activeCases.push(element.node.activeCases)

		}else{
			let caseData = {'activeCases': [element.node.activeCases]}
			parsedData[province][healthRegion] = caseData;
		}
	});

	return parsedData;
	
}