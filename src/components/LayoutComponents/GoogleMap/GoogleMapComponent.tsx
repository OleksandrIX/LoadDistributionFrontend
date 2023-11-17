import { FC, useEffect, useRef } from "react";
import { googleMapProps } from "./GoogleMap.props";

interface GoogleMapComponentProps {
    center: google.maps.LatLngLiteral;
    zoom: number;
}

const GoogleMapComponent: FC<GoogleMapComponentProps> = ({ center, zoom }) => {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (ref.current) {
            const { lat, lng } = googleMapProps.center;
            const map = new window.google.maps.Map(ref.current, googleMapProps);
            new window.google.maps.Marker({
                position: { lat, lng },
                title: "MITIT",
                map: map
            });
        }
    }, [center, zoom]);

    return <div ref={ref} className="google-map__frame" />;
};

export {GoogleMapComponent};
