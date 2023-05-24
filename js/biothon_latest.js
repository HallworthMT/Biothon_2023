//********************************************************************/
//
//                    API VARIABLES
//
//
//*******************************************************************/

var baseUrl = 'https://api.inaturalist.org/v1/observations?';
var begDate = '&d1=2023-05-22';
var endDate = '&d2=2023-05-25';
var project = '&project_id=vce-biothon-2023-wings-over-vermont';

var VCEusers = ["rrebozo","mthallworth","kpmcfarland","nsharp","dlnarango",
"emilyanderson2","jloomisvce","kevtolan","hill_jasonm",
"beeboy","johnsonas131","lprothero","shindinger","jaloo",
"meloryb","NewbieHughbie","Toni_Luff","alyssafishman"]

// API strings
var qLatestObs = baseUrl + project + begDate + endDate + '&user_id='+ VCEusers+"&order=desc&order_by=created_at";

var latest_obs = [];

var thisDay = new Date();
//********************************************************************//
//
//                    FUNCTIONS
//
//
//*******************************************************************//
fetch(qLatestObs)
.then(function (response) {
// Get a JSON object from each of the responses
return response.json();})
.then(function (data) {
 latest_obs[0] = data.results[0].created_at
console.log(latest_obs);
     })
.catch(function (error) {
// if there's an error, log it
console.log(error);
});
