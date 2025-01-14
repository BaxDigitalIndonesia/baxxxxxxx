//user

import { Blob } from "buffer";

export interface Profile {
  // id:number;
  photo?: File | any;
  previewPoto?: File | any;
  birthday?: string;
  age?: string;
  job?: string;
  gender?: Gender;
  country?: string;
  region?: string;
  city?: string;
  district?: string;
  village?: string;
  street?: string;
  postalcode?: string;
  referralCode?: string;
}
export type Gender = "MALE" | "FEMALE";

export interface Register {
  name: string;
  email: string;
  phone: string;
  password: string;
  referrerId: string;
  // role: RoleName;
  role: string;
}
export interface RegisterByMitra {
  name: string;
  email: string;
  phone: string;
}

export interface Verify {
  userId: string;
  otp: string;
}
// Interface untuk tipe data kursus
export interface Course {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

export interface CourseCreateInput {
  title: string;
  description: string;
}

//type
export type RoleName =
  | "ADMIN"
  | "MITRA"
  | "AFFILIATE"
  | "CUSTOMER"
  | "STUDENTS"
  | "MENTOR";
