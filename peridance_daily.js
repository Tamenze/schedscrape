const rp = require('request-promise');
const cheerio = require('cheerio');



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

		//adds class 'toluTest' to genre name cells
		$('section.main>div>table>tbody>tr>td:nth-child(1)>table>tbody>tr>td:only-child').each(function(index){
				$(this).parent('tr').addClass("toluTest")
			});

		//creates objects out of genre and classes
		$('section.main>div>table>tbody>tr>td:nth-child(1)>table>tbody>tr>td:only-child').each(function(index){

			var newObj = { 
				genre:$(this).text().replace(/\W/g, ' ').trim(),
				studio: "Peridance",
				classes: []
			}
			
			$(this).parent('tr').nextUntil($('.toluTest')).each(function(index, element){
				if (index === 0){
					return true
				}
				var newObj2 = {}
				$(this).children('td').each(function(index, elem){
					// console.log(index)
					if (index === 0){
						newObj2.time = $(this).text().replace(/\W/g, ' ').trim()
					}
					if (index === 1){
						newObj2.level = $(this).text().replace(/\W/g, ' ').trim()
					}
					if (index === 2){
						newObj2.teacher = $(this).text().replace(/\W/g, ' ').trim()
					}
				})
				newObj.classes.push(newObj2);

				//need to make a new class object for each tr (starting at index 1), using the parent genre, and add entry1 to time, entry 2 to level, entry 3 to teacher.
			})

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


