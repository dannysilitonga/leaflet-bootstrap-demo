        // create variable to hold map element, give initial settings to map
        var map = L.map('map',{ center: [-23.6832,-46.5957], zoom: 10});

        // add map tiles layer to map element

        L.mapbox.accessToken = 'pk.eyJ1IjoicmRhbmllbGwiLCJhIjoiY2ttcGZsdTl4MDM1djJ3bm5iZXU2dnhwOCJ9.WdM8qnEwVWfISjL4DZ54Mg';
            
        var mapboxTiles = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token=' + L.mapbox.accessToken, {
               attribution: '© <a href="https://www.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
               tileSize: 512,
               zoomOffset: -1
        });

        map.addLayer(mapboxTiles);

      // added this variable to set point data style as circle-marker
      var geojsonMarkerOptions = {
          radius: 7,
          fillColor: "#00ccff",
          color: "#006680",
          weight: 1,
          opacity: 0.5,
          fillOpacity: 0.8
      };

      $.getJSON("data/transit_sao_paulo_lines.geojson",function(data){
        L.geoJson(data,{color:"#00008b", weight:4, opacity: 0.5}).addTo(map);
      });

      $.getJSON("data/transit_sao_paulo_stops.geojson",function(data){
        L.geoJson(data, {
          pointToLayer: function (feature, latlng) {
              return L.circleMarker(latlng, geojsonMarkerOptions);
          },
          onEachFeature: function (feature, layer) {
              layer.bindPopup(feature.properties.name);
          }
      }).addTo(map);

      });