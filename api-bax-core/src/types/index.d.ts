/**
 * Global Configuration
 */

export type RoleName =
    | "ADMIN"
    | "MITRA"
    | "AFFILIATE"
    | "CUSTOMER"
    | "STUDENTS"
    | "MENTOR";
export type Gender = "MALE" | "FEMALE";
export interface Register {
    name: string;
    email: string;
    phone: string;
    referrerId:string;
    password: string;
    role: RoleName;
}
export interface UpdatedRegister {
    email: string;
    phone: string;
    password: string;
    role: RoleName;
}
export interface Login {
    email: string;
    password: string;
}
export interface RegisterAffiliate {
    name: string;
    email: string;
    phone: string;
    password: string;
    role: RoleName;
    referrerId: string;
}
export interface Profile {
    photo?: string;
    birthday?: Date;
    age?: string;
    job?: string;
    gender?: float;
    // mitraId: string;
    // affId: string;
    // lectId: string;
    // studentId: string;
}
export interface Address {
    id: number;
    country: string;
    region: string;
    city: string;
    district: string;
    village: string;
    street: string;
    postalcode: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Customer {
    referrerId: string;
    visitorIp: string;
    latitude: string;
    longitude: string;
    country: string;
    region: string;
    city: string;
    os: string;
    device: string;
}

export interface Transaction {
    userId: string;
    qty: number;
    totalPrice: string;
    paymentMethod: string;
    status: string;
    serviceId: string;
}

export interface PaymentDetails {
    orderId: string;
    grossAmount: number;
    name: string;
    email: string;
    phone: string;
}

export interface TransactionNotif {
    user_id: string;
    order_id: string;
    gross_amount: string;
    transaction_status: string;
}

export interface Service {
    categoryId: number;
    name: string;
    qty: number;
    price: number;
    userId: string;
}
export interface Cart {
    serviceId: string;
}
interface User {
    id: string;
    role: string;
    email: string;
}

export interface AuthenticatedRequest extends Request {
    user: User;
}
interface AffiliatePerformance {
    name: string;
    affiliateId: string;
    performance: {
        totalBalance: number;
        totalSales: number;
        totalCustomer: number;
        topProduct: string;
    };
}
export interface Report {
    userId: string;
    totalSales: number;
    topProduct: string;
    affiliatePerformance: {
        name: string;
        affiliateId: string;
        performance: {
            totalBalance: number;
            totalSales: number;
            totalCustomer: number;
            topProduct: string;
        };
    }[];
    commission: number;
}

// export interface Report {
//     userId: string;
//     totalSales: number;
//     topProduct: string;
//     affiliatePerformance: Record<string, any>;

//     commission: number;
// }
export interface Course {
    name: string;
    desc: string;
    capacity: number;
    userId: string;
    mentorId: string;
}

export interface Mentor {
    adminId: string;
    userIdMentor: string;
}
export interface Student {
    mentorId: string;
    userIdStudent: string;
    courseId: string;
}
export interface Phase {
    name: string;
    desc: string;
    phase: number;
    courseId: string;
}

export interface Chapter {
    name: string;
    desc?: string;
    chapter: number;
    phaseId: string;
}

export interface Lesson {
    chapterId: string;
    name: string;
    desc?: string;
    image?: string;
    video?: string;
    day: Day; // Sesuaikan dengan tipe enum atau string dari Day
    StartTime: Date;
    EndTime: Date;
}
export enum Day {
    MONDAY = "MONDAY",
    TUESDAY = "TUESDAY",
    WEDNESDAY = "WEDNESDAY",
    THURSDAY = "THURSDAY",
    FRIDAY = "FRIDAY",
}

export interface Review {
    rating?: number; // Rating default 5
    comment?: string;
    userId: string;
    courserId: string;
}

export interface Exam {
    title: string;
    desc: string;
    type: string;
    StartTime: Date;
    EndTime: Date;
    lessonId: string;
    mentorId?: string;
}

export interface Attendance {
    checkIn: Date;
    checkOut: Date;
    present: boolean;
    studentId: string;
    lessonId: string;
    resultId: string;
}

export interface Result {
    score: number;
    examId: string;
    studentId: string;
    attendeeId: string;
}

export interface Announcement {
    title: string;
    desc: string;
    date: Date;
    courseId: string;
}

export interface Event {
    title: string;
    desc: string;
    image?: string;
    startDate: Date;
    endDate: Date;
    courseId: string;
}

//   export type ModelName =
//   | "user"
//   | "mitra"
//   | "affiliate"
//   | "lecturer"
//   | "student";

declare global {
    export type ModelName =
        | "user"
        | "mitra"
        | "affiliate"
        | "lecturer"
        | "student";
    export type RoleName =
        | "ADMIN"
        | "MITRA"
        | "AFFILIATE"
        | "CUSTOMER"
        | "STUDENTS"
        | "MENTOR";
    export type Gender = "MALE" | "FEMALE";

    // export interface Register {
    //     name: string;
    //     email: string;
    //     phone: string;
    //     password: string;
    //     role: RoleName;
    // }

    // export interface Login {
    //     email: string;
    //     password: string;
    // }
}
/**
 * Specific Configuration
 */
declare interface CreateUserParams {
    name: string;
    email: string;
    phone: string;
}

declare interface Address extends Profile {
    country: string;
    region: string;
    city: string;
    district: string;
    village: string;
    street: string;
    postalcode: string;
}

export {};
