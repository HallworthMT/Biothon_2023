//********************************************************************/
//
//                    API VARIABLES
//
//
//*******************************************************************/

var baseUrl = 'https://api.inaturalist.org/v1/observations?';
var begDate = '&d1=2023-05-23';
var endDate = '&d2=2023-05-25';
var project = '&project_id=vce-biothon-2023-wings-over-vermont';

var VCEusers = ["rrebozo","mthallworth","kpmcfarland","nsharp","dlnarango",
"emilyanderson2","jloomisvce","kevtolan","hill_jasonm",
"beeboy","johnsonas131","lprothero","shindinger","jaloo",
"meloryb","NewbieHughbie","Toni_Luff","alyssafishman"]

// API strings
var qLatestObs = baseUrl + project + begDate + endDate + '&user_id='+ VCEusers+"&order=desc&order_by=created_at";



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
var d = data.results[0].created_at;

console.log(d);

document.getElementById("lastupload").innerHTML = "The Green Mountain Goatsuckers last uploaded data at: " + new Date(d).toLocaleString("en-US", { hour12: false });

     })
.catch(function (error) {
// if there's an error, log it
console.log(error);
});

