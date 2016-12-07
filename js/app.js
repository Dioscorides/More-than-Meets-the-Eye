var map, infowindow;
localStorage.placeData = localStorage.placeData ? localStorage.placeData : "";

function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 52.162821,
            lng: 4.485137
        },
        mapTypeId: google.maps.MapTypeId.SATELLITE,
        zoom: 17,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: true,
        rotateControl: false,
        fullscreenControl: true,
    });

    infowindow = new google.maps.InfoWindow();

    $.get('js/data.json', function (tabledata) {
      tabledata.map(placeMapper);
      //Datatable options go here!
      $('#datatablex').DataTable({
        responsive: true,
        "columnDefs": [
          {
            "targets": [2],
            "visible": false,
            "searchable": false
          },
          {
            "targets": [1],
            "visible": false,
            "searchable": false
          }
        ]
      });
    });
}

function placeMapper(place) {
    //Here goes the stuff for the Infowindow
    var infowindowContent = "<h3>" + place.title + "</h3><br><p>" + place.Description + "<br/>" + '<a href="http://catalogue.leidenuniv.nl/primo_library/libweb/action/search.do?mode=Basic&vid=UBL_V1&vl(freeText0)=' + place.title.replace(" ", "%20") + ' &fn=search&tab=special&" target="_blank">View UBL Special Collections</a>' + "</p>";
    //Here goes the stuff for the Datatable
    var row = $("<tr>" + "<td>" + place.title + "</td>" + "<td>" + place.lat + "</td>" + "<td>" + place.lon + "</td>" + "<td>" + '<a href="http://catalogue.leidenuniv.nl/primo_library/libweb/action/search.do?mode=Basic&vid=UBL_V1&vl(freeText0)=' + place.title.replace(" ", "%20") + ' &fn=search&tab=special&" target="_blank">View UBL Special Collections</a>' + "</td>" + "</tr>");
    //Here goes the stuff for the street view

    var clickToggle = function () {
        map.setCenter({
            lat: place.lat,
            lng: place.lon
        });
        map.setZoom(19);
        infowindow.setContent(infowindowContent);
        infowindow.open(map, marker);
        row.parent().find('tr').removeClass('bolderText');
        row.addClass('bolderText');

        //Smootly scroll up to the map when a row is clicked
        $('html, body').animate({
          scrollTop: $("#home").offset().top
        }, 500);
    }
    $("#datatablex").find('tbody').append(row);

    var marker = new google.maps.Marker({
        position: {
            lat: place.lat,
            lng: place.lon
        },
        map: map,
        title: place.title
    });
    row.click(clickToggle);
    marker.addListener('click', clickToggle);
}
