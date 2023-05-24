/********************************************************************/
//
//                    API VARIABLES
//
//
//*******************************************************************/

var baseUrl = 'https://api.inaturalist.org/v1/observations/species_counts?';
var project = '&project_id=vce-biothon-2023-wings-over-vermont';
var begDate = '&d1=2023-05-24';
var endDate = '&d2=2023-05-25';
var VCEusers = ["rrebozo","mthallworth","kpmcfarland","nsharp","dlnarango",
                "emilyanderson2","jloomisvce","kevtolan","hill_jasonm",
                "beeboy","johnsonas131","lprothero","shindinger","jaloo",
                "meloryb","NewbieHughbie","Toni_Luff","alyssafishman"];

var qSpeciesCount = baseUrl + project + begDate + endDate + "&user_id=" + VCEusers

console.log(qSpeciesCount)
/********************************************************************/
//
//                    FUNCTIONS
//
//
//*******************************************************************/
fetch(qSpeciesCount)
.then(function (responses) {
// Get a JSON object from each of the responses
return responses.json();
})
.then(function (data) {
return data.results})
.then(function (data){
var tname[] = data.map(function(x){
                x.taxon.name})
var count[] = data.map(function (y){
                y.count})
console.log(tname);
console.log(count);         
})
.catch(function (error) {
// if there's an error, log it
console.log(error);
});

