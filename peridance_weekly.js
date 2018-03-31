const rp = require('request-promise');
const cheerio = require('cheerio');


const options = {
	uri:"http://www.peridance.com/openclasses_Weekly.cfm",
	transform: function(body){
		return cheerio.load(body);
	}
}

rp(options)
	.then( ($)=>{

	$('table>tbody>tr>td:only-child').each(function(){
		console.log($(this).text());
	})

}).catch((err)=>{
	console.log(err)
})