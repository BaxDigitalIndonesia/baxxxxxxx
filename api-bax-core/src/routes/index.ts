import { Router } from "express";
import authRouter from "./auth.routes";
import userRouter from "./user.routes";
import profileRouter from "./profile.routes";
import addressRouter from "./address.routes";
import serviceRouter from "./service.routes";
import customerRouter from "./customer.routes";
import transactionRouter from "./transaction.routes";
import categoryRouter from "./category.routes";
import reportRouter from "./report.routes";
import courseRouter from "./course.routes";
import phaseRouter from "./phase.routes";
import chapterRouter from "./chapter.routes";
import lessonoRouter from "./lesson.routes";
import reviewRouter from "./review.routes";
import examRouter from "./exam.routes";
import attendanceRouter from "./attendance.routes";
import resultRouter from "./result.routes";
import announcementRouter from "./announcement.routes";
import eventRouter from "./event.routes";
import oauthRouter from "./oauth.routes";
import mentorRouter from "./mentor.routes";
import studentRouter from "./student.routes";
import affiliateRouter from "./affiliate.routes";
import cartRouter from "./cart.routes";
const router = Router(); 
  
router.use("/auth", authRouter);
router.use("/auth", oauthRouter);
router.use("/users", userRouter);
router.use("/affiliates", affiliateRouter);
router.use("/profiles", profileRouter);
router.use("/addresses", addressRouter);
router.use("/services", serviceRouter);
router.use("/carts", cartRouter);
router.use("/customers", customerRouter);
router.use("/payments", transactionRouter);
router.use("/category", categoryRouter);
router.use("/reports", reportRouter);
router.use("/mentors", mentorRouter);
router.use("/students", studentRouter);
router.use("/courses", courseRouter);
router.use("/phases", phaseRouter);
router.use("/chapters", chapterRouter);
router.use("/lessons", lessonoRouter);
router.use("/reviewer", reviewRouter);
router.use("/exams", examRouter);
router.use("/attendances", attendanceRouter);
router.use("/results", resultRouter);
router.use("/announcements", announcementRouter);
router.use("/events", eventRouter);







export default router;
