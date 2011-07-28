if (holes === undefined) {
    alert("Holes data not found");
}

var manualHolesSeries = [];
var autoholesSeries = [];
var delta = 0;
var point = 0;

holes.forEach(function(e)
	      {
		  point++;
		  autoholesSeries.push({"x": point, "y": e.holeSize });

		  if (e.holeType == "UserDefined") {
		      manualHolesSeries.push({ "x": point, "y": e.holeSize });
		  }
	      });

dojo.require("dojox.charting.Chart2D");
dojo.require("dojox.charting.axis2d.Default");
dojo.require("dojox.charting.plot2d.Default");
dojo.require("dojox.charting.themes.Wetland");

dojo.addOnLoad(function() {
    var c = new dojox.charting.Chart2D("chartOne");
    c.addPlot("default", {
	type: "Lines",
	tension: 3
    })
	.addPlot("other", { type: "MarkersOnly" })
	.addAxis("x",
		 {
		 })
	.addAxis("y",
		 {
		     vertical: true,
		     min: 5,
		     max: 15
		 })
	.setTheme(dojox.charting.themes.Wetland)
	.addSeries("Series A", autoholesSeries, {plot: "default" })
    	.addSeries("Series B", manualHolesSeries, {plot: "other", fill : "red"})
	.render();
});

