import { useMap } from "react-leaflet";
import Route from "./Route";
import { LegInfoDto } from "../types/ApiResponses";
import React, { useEffect } from "react";

const Routes = ({ legs }: { legs: LegInfoDto[] }) => {
  const map = useMap();
  useEffect(() => {
    map.eachLayer((layer) => {
      const hasEmptyContrib = !(layer.getAttribution && layer.getAttribution());
      const hasNoContrib = !layer.getAttribution;
      if (hasEmptyContrib || hasNoContrib) {
        map.removeLayer(layer);
      }
    });
  });
  return legs.map((leg, index) => (
    <React.Fragment key={index}>
      <Route
        source={leg.startLocation}
        destination={leg.endLocation ?? leg.startLocation}
      />
    </React.Fragment>
  ));
};
export default Routes;
