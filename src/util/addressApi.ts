import { Address } from "../types/ApiResponses";
import { Coordinate } from "../types/ComponentTypes";

export function coordinatesToAddres(coord: Coordinate): Promise<Address> {
  return fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${coord["x"]}&lon=${coord["y"]}&format=json`,
    {
      headers: {
        "User-Agent": "fleems",
      },
    }
  )
    .then((res) => res.json())
    .then((res) => {
      return res.address;
    });
}

export function coordinateStringToCoordinate(coord: string): Coordinate {
  const parts = coord.split(",");
  return { x: Number(parts[0]), y: Number(parts[1]) };
}
