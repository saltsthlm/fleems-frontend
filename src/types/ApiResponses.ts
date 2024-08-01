export type Driver = {
  emailAddress: string;
  id: string;
  licenseNumber: string;
  name: string;
  phoneNumber: string;
  photo: string;
};

export type DriverInfoDto = {
  emailAddress: string;
  id: string;
  licenseNumber: string;
  name: string;
  phoneNumber: string;
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
  state: string;
  startAddress: Address;
  endAddress: Address;
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
  startAddress: Address;
  endAddress: Address;
  state: string;
};

export type TableTask = {
  id: string;
  dateCreated: string;
  dateFinished: string;
  expectedDistance: number;
  expectedTime: number;
  startDate: string;
  product: string;
  payload: number;
  quantity: number;
  state: string;
  client: string;
  startAddress: string;
  endAddress: string;
};

export type ClientResponseDto = {
  id: string;
  contactPerson: string;
  contactEmail: string;
  contactPhoneNumber: string;
  name: string;
  tasks: TaskInfoDto[];
};
export type ClientInfoDto = {
  id: string;
  contactPerson: string;
  contactEmail: string;
  contactPhoneNumber: string;
  name: string;
};

export type LegInfoDto = {
  id: string;
  driver: DriverInfoDto | null;
  vehicle: Vehicle | null;
  startTime: Date | null;
  endTime: Date | null;
  startLocation: string;
  endLocation: string;
  distanceDriven: number;
  startAddress: Address;
  endAddress: Address;
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
  id: string;
  city: string;
  country: string;
  houseNumber: string;
  postcode: string;
  road: string;
};

export type Waypoint = {
  distance: number;
  location: number[];
  hint: string;
  name: string;
};
export type SpeedViolation = {
  driver: string;
  speed: number;
  date: Date;
};
export type RestViolation = {
  driver: string;
  time: number;
  date: Date;
};
