function initMap() {
  $('.g-map').each((index, element) => {
    let location = $(element).data('location');
    console.log(location);
    new google.maps.Map(element, {
        zoom: 4,
        center: {
          lat: 40.428914,
          lng: -3.704043
        }
      });
  })

}
