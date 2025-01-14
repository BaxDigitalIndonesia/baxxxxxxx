// import { prisma } from "../lib/client";

// export const setupTestDB = () => {
//     beforeAll(async () => {
//         await prisma.$connect();
//     });

//     beforeEach(async () => {
//         await prisma.$transaction([
//             prisma.reviews.deleteMany(),
//             prisma.courses.deleteMany(),
//             prisma.affiliate.deleteMany(),
//             prisma.mentor.deleteMany(),
//             prisma.report.deleteMany(),
//             prisma.customer.deleteMany(),
//             prisma.transaction.deleteMany(),
//             prisma.category.deleteMany(),
//             prisma.service.deleteMany(),
//             prisma.profile.deleteMany(),
//             prisma.user.deleteMany(),
//         ]);
//     });

//     afterAll(async () => {
//         await prisma.$disconnect();
//     });
// };
