
// import { CourseCreateInput } from "@/interface";
// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     const courses = await getAllCourses();
//     return NextResponse.json(courses);
//   } catch (error) {
//     return new NextResponse();
//   }
// }

// export async function POST(request: Request) {
//   const data: CourseCreateInput = await request.json();
//   try {
//     const newCourse = await createCourse(data);
//     return NextResponse.json(newCourse, { status: 201 });
//   } catch (error) {
//     return new NextResponse();
//   }
// }
