export type CreateDriver = {
  emailAddress: string;
  licenseNumber: string;
  name: string;
  phoneNumber: string;
  photo: string;
};
export type CreateAssignment = {
  taskId: string;
  driverId: string;
  vehicleId: string;
};

export type CreateVehicle = {
  licenseNumber: string;
  payload: number;
  height: number;
  weight: number;
  length: number;
  distanceDriven: number;
  model: string;
};
