import { useCallback, useRef, useState } from "react";
import { GoogleMap, Marker, withGoogleMap } from "react-google-maps";
import { compose, withProps } from "recompose";

const MyMapComponent = compose(
  withProps({
    loadingElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withGoogleMap
)((props) => {
  const [center, setCenter] = useState({ lat: props.lat, lng: props.lng });
  const refMap = useRef();
  const handleBoundsChanged = () => {
    const mapCenter = refMap.current.getCenter();
    setCenter(mapCenter);
  };
  return (
    <GoogleMap
      key={props.lat + props.lng}
      defaultZoom={props.defaultZoom}
      defaultCenter={{ lat: props.lat, lng: props.lng }}
      defaultOptions={props.mapOptions && props.mapOptions}
      ref={refMap}
      onBoundsChanged={useCallback(handleBoundsChanged)}
      onDragEnd={() => {
        props.onDragEnd({ mapLat: center.lat(), mapLng: center.lng() });
      }}
    >
      {/* <Marker position={{ lat: props.lat, lng: props.lng }} /> */}
      <Marker key={props.lat + props.lng} position={center} />
    </GoogleMap>
  );
});

export default MyMapComponent;
