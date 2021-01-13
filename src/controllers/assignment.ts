import { Request, Response } from "express";
import assignmentService from "@services/assignment";
import BaseController from "./base";
import { errorRes } from "@middlewares/error";

export default class AssignmentController extends BaseController {
  service;
  constructor() {
    super(assignmentService);
    this.service = assignmentService;
  }

  assign = async (req: Request, res: Response) => {
    const { studentIds, ...data } = req.body;
    const { _id: instructorId }: any = req.user;

    // Check wether its deadline is over
    const assignmentDeadlineCondition = { instructorId, deadline: { $gt: new Date() } };
    const isDeadlineOver = await this.service.isDeadlineOver(assignmentDeadlineCondition);
    if (!isDeadlineOver) {
      throw errorRes.deadLineOver();
    }

    // Create Object to assign the assignment to all the student which is coming with studentIds
    const assignToAllStudents: any[] = [];
    studentIds.forEach((studentId: any) => assignToAllStudents.push({ ...data, studentId, instructorId }));

    await this.service.insertMany(assignToAllStudents);

    return res.send({ data: "Assignment assigned successfully" });
  };
}
