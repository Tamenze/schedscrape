const rp = require('request-promise');
const cheerio = require('cheerio');
// const wtj = require('website-to-json')


// wtj.extractData('http://www.peridance.com/openclasses.cfm', {
// 	fields: ['data'],
// 	parse: function($){
// 		return {
// 			test: $('#container > header > pagetitle.secondary').text(),
// 			date: $('#container > header > pagesubtitle').text(),
// 			times: $('div > table > tbody > tr > td > table > tbody > tr > td').text()
// 			// times: $('#container > section#main > section.main > div > table > tbody > tr > td:nth-child(1) > table > tbody > tr > td:nth-child(1)').map(function(val){
// 			// 	return $(this).text()
// 			// }).get()
// 			// times: $('section.main>div>table>tbody>tr>td:nth-child(1)>table>tbody>tr>td:nth-child(1)').map(function(val){
// 			// 	return $(this).text()
// 			// }).get()
// 		}
// 	}
// })
// .then(function(res){
// 	console.log(JSON.stringify(res, null, 2))
// })
// .catch( (err) => {
// 	console.log(err);
// })


const options = {
	uri: "http://www.peridance.com/openclasses.cfm",

	//tells request-promise to take the returned body and load it into cheerio before returning to us
	transform: function(body){ 
		return cheerio.load(body);
	}	
}

rp(options)
	.then( ($)=> {


		//each class is an object? with type, time, level, teacher, and studio location
		// var classObj = {
		// 	date: $('table > tbody > tr > td > span').text(),
		// 	classType: ,
		// 	time:  ,
		// 	level: ,
		// 	teacher: ,
		// 	studio: 
		// }

		//hits table, if td is only child of its parent tr, that is a classType and every row (starting one removed) is a class, and should be made into its own class object

		$('section.main>div>table>tbody>tr>td:nth-child(1)>table>tbody>tr>td:only-child').each(function(index){
				$(this).parent('tr').addClass("toluTest")
			});


		$('section.main>div>table>tbody>tr>td:nth-child(1)>table>tbody>tr>td:only-child').each(function(index){


			var newObj = { 
				genre:$(this).text().replace(/\W/g, ' ').trim(),
				classes: []
			}
			
			$(this).parent('tr').nextUntil($('.toluTest')).each(function(index, element){
				$(this).children('td').each(function(){
					newObj.classes.push($(this).text().replace(/\W/g, ' ').trim())
				})


				// newObj.classes.push($(this).text().replace(/\W/g, ' ').trim())
			})//problem is this is resulting in nextAll, getting all follds instead of stopping at the next genre. i'm not selecting the nextUntil selector correctly somehow.
			///

			console.log(newObj)
			console.log("--------------")
			// return

		})


		//option: add all table data to an object under the headers of time, level, 

		//can make a new array for levels and teacher(incl links)
		//can set up a database that saves the relevant data for each day of the coming week 
	})
	.catch( (err) => {
		console.log(err);
	})


