import { FC, ReactElement } from "react";
import { Status, Wrapper } from "@googlemaps/react-wrapper";
import Skeleton from "react-loading-skeleton";
import { GoogleMapComponent } from "./GoogleMapComponent";
import { googleMapProps } from "./GoogleMap.props";
import "react-loading-skeleton/dist/skeleton.css";
import "./GoogleMap.scss";

const render = (status: Status): ReactElement =>
    status === Status.LOADING ? <Skeleton height={300} width={500} /> : <></>;

const GoogleMap: FC = () => {
    return (
        <div className="google-map">
            <Wrapper apiKey={googleMapProps.api} render={render}>
                <GoogleMapComponent center={googleMapProps.center} zoom={googleMapProps.zoom} />
            </Wrapper>
        </div>
    );
};

export { GoogleMap };
