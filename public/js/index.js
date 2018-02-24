function initMap() {
  $('.g-map').each((index, element) => {
    let location = $(element).data('location');
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${location}&key=AIzaSyADGtkbVOohsuyhQc-wEJ3KP_ylbxH-bWE`;
    $.ajax({
      url,
      type: 'get',
      dataType: 'json',
      success: function(googleData) {
        if (googleData) {
          new google.maps.Map(element, {
              zoom: 4,
              center: {
                lat: googleData.results.geometry.location.lat,
                lng: googleData.results.geometry.location.lng
              },
            });
          }
      }
    });
  });
}
