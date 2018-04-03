const rp = require('request-promise');
const cheerio = require('cheerio');

const options = {
	uri: "https://www.broadwaydancecenter.com/week-schedule?date%5Bvalue%5D%5Bdate%5D=04%2F02%2F2018&style=All&level=All&instructor=All",

	transform: function(body){
		return cheerio.load(body);
	}
}

rp(options)
	.then(($)=>{

		//var classObj = {
		//date: "",
		//classes: [
			// {
			// 	time: "",
			// 	title: "",
			//  teacher: "",
			// 	genre: "",
			// 	level: ""	
			// }
		// ]}

		$('table').each(function(x){
			var classObj = {
				date: $(this).find('caption').text(),
				classes: []
			};
			
			$(this).find('tbody>tr').each(function(index){
				var newObj = {
					time: $(this).find("td:nth-child(1)").text().trim(),
					title: $(this).find("td:nth-child(2)").contents().get(0).nodeValue.split(" with ")[0],
					teacher: $(this).find("td:nth-child(2)").contents().get(0).nodeValue.split(" with ")[1],
					genre: $(this).find("td:nth-child(2)").contents().get(0).nodeValue.match(/\b[A-Z]+(?:\s+[A-Z]+)*\b/)[0],
					level: $(this).find("td:nth-child(3)").text().trim()
				};
				classObj.classes.push(newObj)

			})

			console.log(classObj);
			console.log("-----------")
		})

	}).catch( (err) => {
		console.log(err);
	})


// next as of 4/2: 
// -BDC can be by scraped by genre too/instead, if I decide
// -Remaining studios: EXPG, Brickhouse, Ailey Ext
// -More Important: testing neat, tabled display of these saved objects 

