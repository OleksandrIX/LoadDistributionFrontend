interface GoogleMapProps{
    api: string,
    center: google.maps.LatLngLiteral,
    zoom: number
}

const googleMapProps: GoogleMapProps = {
    api: process.env.REACT_APP_GOOGLE_MAP_API_KEY || "",
    center: { lat: 50.430082, lng: 30.543070 },
    zoom: 15
};

export {googleMapProps};
