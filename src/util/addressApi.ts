import { Address } from "../types/ApiResponses";
import { Coordinate } from "../types/ComponentTypes";

export function coordinatesToAddres(coord: Coordinate): Address {
  fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${coord["x"]}&lon=${coord["y"]}&format=json`,
    {
      headers: {
        "User-Agent": "fleems",
      },
    }
  )
    .then((res) => res.json())
    .then((res) => {
      //console.log(res);
      //console.log(res.display_name);
      console.log(res.address);
      return res.address;
    });
}
