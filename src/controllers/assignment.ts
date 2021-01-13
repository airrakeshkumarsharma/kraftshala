import { Request, Response } from "express";
import assignmentService from "@services/assignment";
import BaseController from "./base";
import { errorRes } from "@middlewares/error";
import { saveFile } from "@services/uploadFile";
import { assignmentUrlGenerator, solutionUrlGenerator } from "@helpers/urlGenerator";

export default class AssignmentController extends BaseController {
  service;
  constructor() {
    super(assignmentService);
    this.service = assignmentService;
  }

  assign = async (req: Request, res: Response) => {
    const { studentIds, assignmentId } = req.body;
    const { _id: instructorId }: any = req.user;

    // Check wether its deadline is over
    const isDeadlineOver = await this.service.isDeadlineOver(assignmentId);
    if (!isDeadlineOver) {
      throw errorRes.deadLineOver();
    }

    // Create Object to assign the assignment to all the student which is coming with studentIds
    const assignToAllStudents: any[] = [];
    studentIds.forEach((studentId: any) => assignToAllStudents.push({ assignmentId, studentId, instructorId }));

    await this.service.insertMany(assignToAllStudents);

    return res.send({ data: "Assignment assigned successfully" });
  };

  submitAssignment = async (req: Request, res: Response) => {
    const { assignmentId }: any = req.params;
    const { _id: studentId }: any = req.user;
    const { file } = req;

    // Check wether its deadline is over
    const isDeadlineOver = await this.service.isDeadlineOver(assignmentId);
    if (!isDeadlineOver) {
      throw errorRes.deadLineOver();
    }

    const { url } = saveFile(file.buffer, solutionUrlGenerator(file.mimetype));

    // Update Assignment
    const filters = { _id: assignmentId, studentId };
    const payload = { solutionPdf: url, isSubmitted: true, submittedAt: new Date() };
    await this.service.updateOne(filters, payload);

    return res.send({ data: "Assignment submitted successfully" });
  };
}
