var baseUrl = 'https://api.inaturalist.org/v1/observations/species_counts?';
var project = '&project_id=vce-biothon-2023-wings-over-vermont';

var VCEusers = ["rrebozo","mthallworth","kpmcfarland","nsharp","dlnarango",
                "emilyanderson2","jloomisvce","kevtolan","hill_jasonm",
                "beeboy","johnsonas131","lprothero","shindinger","jaloo",
                "meloryb","NewbieHughbie","Toni_Luff","alyssafishman"];

var yr1first = '&d1=2023-05-24';
var yr0first = '&d2=2023-05-25';

// API strings
var allProjectObs = baseUrl+project
var VCEteam = baseUrl+project+yr1first+yr0first+"&user_id="+VCEusers

var obsSppData = [];

//********************************************************************//
//
//                    FUNCTIONS
//
//
//*******************************************************************//
Promise.all([fetch(allProjectObs),
             fetch(VCEteam)])

      .then(function (responses) {
       // Get a JSON object from each of the responses
      return Promise.all(responses.map(function (response) {
                                       return response.json();}
                                     )
                        );
                      })
      .then(function (data) {
      var data1 = data.map(function (d) {
          return d.total_results
                                     })

      // add data to global variable
      // totalSpp, current yr, past year
          obsSppData=[300,data1[0],data1[1],200]

          console.log(`obsSppData: ${Object.values(obsSppData)}`)

              })
        .then(function(){
        //  interval value
        var htmlID = "observedSpecies";
          var lineColor="steelblue"
          var lineWidth=1.5;
          var margin={top: 10,
                  right: 30,
                  bottom: 60,
                  left: 60};
          var spaceSides = 800;
          var spaceTopBot = 100;
          // set the dimensions and margins of the graph
          //var margin = {top: 10, right: 30, bottom: 30, left: 60},
          //    width = 460 - margin.left - margin.right,
          //    height = 400 - margin.top - margin.bottom;
           var width = spaceSides - margin.left - margin.right;
           var height = spaceTopBot - margin.top - margin.bottom;

          // append the svg object to the body of the page
          var svg = d3.select("#" + htmlID)
            .append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
            .append("g")
              //.attr("transform",
              //      "translate(" + margin.left + "," + margin.top + ")");

            // Add X axis --> it is a date format
            var x = d3.scaleLinear()
              .domain([0,Math.max(...obsSppData)])
              //.domain(d3.extent(xVals))
              .range([0, width]);

              // Add Y axis
              var y = d3.scaleLinear()
                .domain([0,1])
                .range([height, 0])
                //.padding(0.1);


              // add x axis label
                svg.append("text")
                   .attr("class", "x label")
                   .attr("text-anchor", "middle")
                   .attr("x", x(Math.max(...obsSppData)/2))
                   .attr("y", height+40)
                   .text("Observed species");

               // 300 species to at least show the goal
                   var sppTotBar = svg.selectAll(".totsppbar")
                       .data(obsSppData)
                       .enter()
                       .append("rect");

                   sppTotBar.attr("x", function(d){return x(0)})
                       .attr("y", function(d){ return y(0.99)})
                       .attr("width", function(d){ return x(obsSppData[0])})
                       .attr("height", 28)
                       .attr("fill", "#D0D0D0");

              // All species so far in the project
              var sppYrBar = svg.selectAll(".sppyrbar")
                           .data(obsSppData)
                           .enter()
                           .append("rect");

                  sppYrBar.attr("x", function(d){return x(0)})
                           .attr("y", function(d){ return y(0.8)})
                           .attr("width", function(d){ return x(obsSppData[1])})
                           .attr("height", 20)
                           .attr("fill", "#7f807d");
               // VCE species on Biothon day
            var sppLastBar = svg.selectAll(".lastsppbar")
                                        .data(obsSppData)
                                        .enter()
                                        .append("rect");

                    sppLastBar.attr("x", function(d){return x(0)})
                            .attr("y", function(d){ return y(0.7)})
                            .attr("width", function(d){ return x(obsSppData[2])})
                            .attr("height", 14)
                            .attr("fill", "#017301");
                          
// Bars
var goalBar = svg.selectAll(".goalppbar")
.data(obsSppData)
.enter()
.append("rect");

goalBar.attr("x", function(d){return x(obsSppData[3])})
.attr("y", function(d){ return y(1)})
.attr("width", function(d){ return x(1)})
.attr("height", 30)
.attr("fill", "7433ff");

            svg.append("g")
              .attr("transform", "translate(0," + height + ")")
              .call(d3.axisBottom(x));

        //    svg.append("g")
        //      .call(d3.axisLeft(y));


          })

.catch(function (error) {
// if there's an error, log it
console.log(error);
});
