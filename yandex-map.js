window.onload = function () {
    var map = new YMaps.Map(document.getElementById("YMapsID"));

    map.setCenter(new YMaps.GeoPoint(30.316244,59.939319), 13); // SPb

    map.addControl(new YMaps.TypeControl());
    map.addControl(new YMaps.ToolBar());
    map.addControl(new YMaps.Zoom());
    map.addControl(new YMaps.ScaleLine());

    map.enableScrollZoom();

    var points = [];
    var userMark = [];
    var point = 0;

    holes.forEach(function(e)
		  {
		      if (e.lng == 0 || e.lat == 0)
			  return;

		      point++;
		      if (point < 10000 || point > 20000)
		       	  return;

		      var hole;

		      if (Math.abs(e.holeSize - 9.8) > 4) {
			  hole = new YMaps.Placemark(new YMaps.GeoPoint(e.lng, e.lat));
			  hole.name = "Hole " + e.holeSize;
			  hole.descriptio = "Hole";
		      }

		      if (e.holeType == "UserDefined") {
			  hole = new YMaps.Placemark(new YMaps.GeoPoint(e.lng, e.lat), {style: "default#redSmallPoint"});
			  hole.name = "Hole " + e.holeSize;
			  hole.description = "User hole";
		      }

		      userMark.push(hole);

		      points.push(new YMaps.GeoPoint(e.lng, e.lat));
		  });

    userMark.forEach(function(e) { map.addOverlay(e); });

    map.addOverlay(new YMaps.Polyline(points));
};
