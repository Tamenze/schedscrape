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


		//each class is an object with type, time, level, teacher, and studio location
		// var classObj = {
			// genre: "",
			// studio: "Peridance",
			// classes: [
			// 	{
			// 		time: "",
			// 		level: "",
			// 		teacher: ""
			// 	}
			// ]
		// }

		//hits table, if td is only child of its parent tr, that is a classType and every row (starting one removed) is a class, and should be made into its own class object

		//adds helper class 'toluTest' to genre name cells
		$('section.main>div>table>tbody>tr>td:nth-child(1)>table>tbody>tr>td:only-child').each(function(index){
				$(this).parent('tr').addClass("toluTest")
			});

		//creates objects out of genre and classes
		$('section.main>div>table>tbody>tr>td:nth-child(1)>table>tbody>tr>td:only-child').each(function(index){

			var classObj = {
				date: $('table > tbody > tr > td > span').text().split("for: ")[1], 
				genre:$(this).text().replace(/\W/g, ' ').trim(),
				studio: "Peridance",
				classes: []
			}
			
			$(this).parent('tr').nextUntil($('.toluTest')).each(function(index, element){
				if (index === 0){
					return true
				}
				var newObj2 = {}

				//takes each tr, adds td@index0 to time, index1 to level, index2 to teacher.
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
				classObj.classes.push(newObj2);

			})

			console.log(classObj)
			console.log("--------------")

		})

	})
	.catch( (err) => {
		console.log(err);
	})


