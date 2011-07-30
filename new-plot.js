$(function () {
    var d = [];

    var manualHolesSeries = [];
    var autoholesSeries = [];
    var delta = 0;
    var point = 0;
    var POINT = false;

    holes.forEach(function(e)
		  {
		      var x_value;

		      if (delta == 0)
			  delta = e.Date;

		      point++;

		      if (point < 10000 || point > 20000)
		       	  return;

		      if (POINT) {
			  x_value = point;
		      } else {
			  x_value = e.Date;
		      }

		      autoholesSeries.push([x_value, e.holeSize]);

		      if (e.holeType === "UserDefined") {
			  manualHolesSeries.push([x_value, e.holeSize]);
		      }
		  });

    var options = {
        xaxis: { mode: "time", tickLength: 5},
        selection: { mode: "x" },
	grid: { hoverable: true, clickable: true }
    };

    var plot = $.plot($("#placeholder"), [
	{
	    label: "Auto holes",
	    data: autoholesSeries
	},
	{
	    label: "Manual holes",
	    data: manualHolesSeries,
	    points: { show: true },
	    clickable: true,
	    hoverable: true
	}
    ], options);

    var overview = $.plot($("#overview"), [
	{
	    data: autoholesSeries,
	},
	{
	    data: manualHolesSeries,
	    points: { show: true },
	    clickable: true,
	    hoverable: true
	}
    ], {
        series: {
            lines: { show: true, lineWidth: 1 },
            shadowSize: 0
        },
        xaxis: { ticks: [], mode: "time" },
        yaxis: { ticks: [], min: 0, max: 15 },
        selection: { mode: "x" }
    });

    // now connect the two

    $("#placeholder").bind("plotselected", function (event, ranges) {
        // do the zooming
        plot = $.plot($("#placeholder"), [
	{
	    data: autoholesSeries
	},
	{
	    data:manualHolesSeries,
	    points: { show: true }
	}
    ],
                      $.extend(true, {}, options, {
                          xaxis: { min: ranges.xaxis.from, max: ranges.xaxis.to }
                      }));

        // don't fire event on the overview to prevent eternal loop
        overview.setSelection(ranges, true);
    });

    function showTooltip(x, y, contents) {
        $('<div id="tooltip">' + contents + '</div>').css( {
            position: 'absolute',
            display: 'none',
            top: y + 5,
            left: x + 5,
            border: '1px solid #fdd',
            padding: '2px',
            'background-color': '#fee',
            opacity: 0.80
        }).appendTo("body").fadeIn(200);
    }

    var previousPoint = null;
    $("#placeholder").bind("plothover", function (event, pos, item) {

        if (item) {
            if (previousPoint != item.dataIndex) {
                previousPoint = item.dataIndex;

                $("#tooltip").remove();
                var x = item.datapoint[0].toFixed(2),
                y = item.datapoint[1].toFixed(2);

                showTooltip(item.pageX, item.pageY,
                            "Accl here: " + y);
            }
        }
        else {
            $("#tooltip").remove();
            previousPoint = null;
        }
    });

    $("#placeholder").bind("plotclick", function (event, pos, item) {
        if (item) {
            plot.highlight(item.series, item.datapoint);
        }
    });

    $("#overview").bind("plotselected", function (event, ranges) {
        plot.setSelection(ranges);
    });
});
