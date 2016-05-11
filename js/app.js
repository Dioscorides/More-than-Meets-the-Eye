var map, infowindow;
localStorage.placeData = localStorage.placeData ? localStorage.placeData : "";

function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        center: 
        {
            lat: 52.156944,
            lng: 4.497010
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
        var infowindowContent = "<h3>" + place.title + "</h3><br><p>" + place.Description + "<br/>" + '<a href="' + place.title + '">View UBL Special Collections</a>' + "</p>";
        //Here goes the stuff for the Datatable
        var row = $("<tr>" + "<td>" + place.title + "</td>" + "<td>" + place.lat + "</td>" + "<td>" + place.lon + "</td>" + "<td>" + '<a href="' + place.title + '">View UBL Special Collections</a>' + "</td>" + "</tr>");
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
            if (tabledata instanceof Array) {
                tabledata = tabledata.concat(JSON.parse("[" + localStorage.placeData.slice(0, -1) + "]") || []);
            } else {
                console.log("AJAX error");
                tabledata = JSON.parse("[" + localStorage.placeData.slice(0, -1) + "]") || [];
            }
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