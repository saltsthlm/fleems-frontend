export type Driver = {
  emailAddress: string;
  id: string;
  licenseNumber: string;
  name: string;
  phoneNumber: string;
  photo: string;
};

export type Client = {
  id: string;
  contactPrson: string;
  contactEmail: string;
  contactPhoneNumber: string;
  name: string;
  tasks: TaskInfoDto[];
};
export type TaskInfoDto = {
  id: string;
  startDestination: string;
  endDestination: string;
  dateCreated: Date;
  dateFinished: Date;
  expectedDistance: number;
  expectedTime: number;
  startDate: Date;
  product: string;
  payload: number;
  quantity: number;
  legs: LegInfoDto[];
};

export type Task = {
  id: string;
  startDestination: string;
  endDestination: string;
  dateCreated: Date;
  dateFinished: Date;
  expectedDistance: number;
  expectedTime: number;
  startDate: Date;
  product: string;
  payload: number;
  quantity: number;
  legs: LegInfoDto[];
};

export type LegInfoDto = {
  id: string;
  driver: Driver;
  vehicle: Vehicle;
  startTime: Date;
  endTime: Date;
  startLocation: string;
  endLocation: string;
  distanceDriven: number;
};

export type Vehicle = {
  id: string;
  licenseNumber: string;
  payload: number;
  height: number;
  weight: number;
  length: number;
  distanceDriven: number;
  model: string;
};
