mapboxgl.accessToken = 'pk.eyJ1Ijoia2NheXQiLCJhIjoiY2tsZWY0cGJmMWRtZjJucXRqdGJhdnJ2OSJ9.5yR0jnpb7zMjnGWCj_Jr-g';
// function to translate NYC land use codes into a color and a description

var FAR = (code) => {
  switch (code) {
    case 1:
      return {
        // color: '#ccc',
        description: 'Max Residential FAR = 10',
      };
    case 2:
      return {
        // color: 'red',
        description: 'Max Residential FAR = 7.52',
      };
    case 3:
      return {
        // color: '#FF9900',
        description: 'Max Residential FAR = 6.02',
      };
    case 4:
      return {
        // color: '#f7cabf',
        description: 'Max Residential FAR = 5',
      };
    case 5:
      return {
        // color: '#ea6661',
        description: 'Max Residential FAR = 4',
      };
    case 6:
      return {
        // color: '#d36ff4',
        description: 'Max Residential FAR = 3.44',
      };
      case 7:
        return {
          // color: 'tan',
          description: 'Max Residential FAR = 3',
        };
         case 8:
            return {
              // color: 'white',
              description: 'Max Residential FAR = 2.43',
            };
            case 9:
                return {
                  // color: 'yellow',
                  description: 'Max Residential FAR = 2',
                };
                case 10:
                    return {
                      // color: 'yellow',
                      description: 'Max Residential FAR = 1.25',
                    };
                    case 11:
                        return {
                          // color: 'yellow',
                          description: 'Max Residential FAR = 0.9',
                        };
                        case 12:
                            return {
                              // color: 'yellow',
                              description: 'Max Residential FAR = 0.75',
                            };
                            case 13:
                                return {
                                  // color: 'yellow',
                                  description: 'Max Residential FAR = 0.5',
                                };
      }
      };

// };
var map = new mapboxgl.Map({
container: 'mapcontainer', // container ID
style: 'mapbox://styles/mapbox/streets-v11', // style URL
center: [-73.841124,40.725053], // starting position [lng, lat]
zoom: 11.5 // starting zoom
 });

 map.on('style.load', function (){
     map.addSource('gismap', {
        type: 'geojson',
        data: 'data/gismap.geojson'

 });

    map.addLayer({
      'id': 'fill-layer',
      'type': 'fill',
      'source': 'gismap',
      'layout': {},
      'paint': {
      'fill-color': {
        property: 'ResidFAR',
        stops: [
          [0.5,'white',],
          [0.75,'white',],
          [0.9,'grey',],
          [1.25,'grey',],
          [2,'#df65b0',],
          [2.43,'#e7298a',],
            [3, '#d4b9da',],
            [3.44, '#c994c7',],
            [4, '#df65b0',],
            [5, '#e7298a' ,],
            [6.02, '#ce1256',],
            [7.52,'#980043',],
            [10, '#67001f',]

        ]
      }
      ,
          'fill-outline-color': 'grey',
          'fill-opacity': 0.8
        }
      });


        // add an empty data source, which we will use to highlight the lot the user is hovering over
          map.addSource('highlight-feature', {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: []
            }
          })

          // add a layer for the highlighted lot
          map.addLayer({
            id: 'highlight-line',
            type: 'line',
            source: 'highlight-feature',
            paint: {
              'line-width': 2,
              'line-opacity': 0.9,
              'line-color': 'white',
            }
          });
        })

        // Create a popup, but don't add it to the map yet.
        var popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false
        });

        map.on('mousemove', function (e) {
          // query for the features under the mouse, but only in the lots layer
          var features = map.queryRenderedFeatures(e.point, {
              layers: ['fill-layer'],
          });

          if (features.length > 0) {
            // show the popup
            // Populate the popup and set its coordinates
            // based on the feature found.

            var hoveredFeature = features[0]
            var address = hoveredFeature.properties.ZoneDist1
              var built = hoveredFeature.properties.BuiltFAR
            var maxfar = hoveredFeature.properties.ResidFAR

            var popupContent = `
              <div>
              <h4>Zoning District:  ${address}</h4> <br/>
                 <p> Built FAR =  ${built}<br/>
              Max Residential FAR =  ${maxfar} </p>
              </div>
            `

            popup.setLngLat(e.lngLat).setHTML(popupContent).addTo(map);

            // set this lot's polygon feature as the data for the highlight source
            map.getSource('highlight-feature').setData(hoveredFeature.geometry);

            // show the cursor as a pointer
            map.getCanvas().style.cursor = 'pointer';
          } else {
            // remove the Popup
            popup.remove();

            map.getCanvas().style.cursor = '';
          }

        })
  ;

 // })
// var popup = new mapboxgl.popup({})
//  map.on('mousemove', function (e){
//
//    var features = map.queryRenderedFeatures(e.point, {
//      layers: ['filllayer']
//    });
//
//    console.log()
//  })
