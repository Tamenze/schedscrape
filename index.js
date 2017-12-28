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
		console.log($('table > tbody > tr > td > span').text())
		
		var times = []
		$('section.main>div>table>tbody>tr>td:nth-child(1)>table>tbody>tr>td:nth-child(1)').each(function(i, elem){
			times[i] = $(this).text()
		})
		console.log(times)

		//can make a new array for levels and teacher(incl links)
		//can set up a database that saves the relevant data for each day of the coming week 
	})
	.catch( (err) => {
		console.log(err);
	})


