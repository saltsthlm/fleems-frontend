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
  contactPerson: string;
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
  client: ClientResponseDto;
};

export type ClientResponseDto = {
  id: string;
  contactPerson: string;
  contactEmail: string;
  contactPhoneNumber: string;
  name: string;
  tasks: TaskInfoDto[];
};

export type LegInfoDto = {
  id: string;
  driver: Driver | null;
  vehicle: Vehicle | null;
  startTime: Date | null;
  endTime: Date | null;
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

export type Profile = {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  hd: string;
};
export type AssignmentInfoDto = {
  id: string;
  task: Task;
  driver: Driver;
  vehicle: Vehicle;
};

export type User = {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  authuser: string;
  hd: string;
  prompt: string;
};

export type Address = {
  "ISO3166-2-lvl4": string;
  city: string;
  city_district: string;
  country: string;
  country_code: string;
  county: string;
  house_number: string;
  municipality: string;
  neighbourhood: string;
  postcode: string;
  road: string;
  suburb: string;
};
