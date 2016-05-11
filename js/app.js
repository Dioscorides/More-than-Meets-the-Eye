var map, infowindow;
localStorage.placeData = localStorage.placeData ? localStorage.placeData : "";

function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 52.166404,
            lng: 4.482089
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

    function placeMapper(place) {
        //Here goes the stuff for the Infowindow
        var infowindowContent = "<h3>" + place.title + "</h3><br><p>" + place.Description + "<br/>" + '<a href=http://catalogue.leidenuniv.nl/primo_library/libweb/action/dlSearch.do?&group=GUEST&onCampus=false&vid=UBL_V1&institution=UBL&tab=special&search_scope=UBL_LMS&ct=facet&fctN=facet_rtype&fctV=Images&query=any,contains,' + place.title.replace(" ", "%20") + ' target="_blank">View UBL Special Collections</a>' + "</p>";
        //Here goes the stuff for the Datatable
        var row = $("<tr>" + "<td>" + place.title + "</td>" + "<td>" + place.lat + "</td>" + "<td>" + place.lon + "</td>" + "<td>" + '<a href=http://catalogue.leidenuniv.nl/primo_library/libweb/action/dlSearch.do?&group=GUEST&onCampus=false&vid=UBL_V1&institution=UBL&tab=special&search_scope=UBL_LMS&ct=facet&fctN=facet_rtype&fctV=Images&query=any,contains,' + place.title.replace(" ", "%20") + ' target="_blank">View UBL Special Collections</a>' + "</td>" + "</tr>");
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
    $(document).ready(function () {
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
    });
}