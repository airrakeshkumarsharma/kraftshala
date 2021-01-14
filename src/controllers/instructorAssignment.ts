import { Request, Response } from "express";
import InstructorAssignmentService from "@services/instructorAssignment";
import BaseController from "./base";
import { saveFile } from "@services/uploadFile";
import { assignmentUrlGenerator } from "@helpers/urlGenerator";
import { instructorAssignmentProjection } from "@projection";
import moment from "moment";

export default class InstructorAssignmentController extends BaseController {
  service;
  constructor() {
    super(InstructorAssignmentService);
    this.service = InstructorAssignmentService;
  }

  upload = async (req: Request, res: Response) => {
    const { title, users, deadline, ...data } = req.body;
    const { _id: instructorId }: any = req.user; // FIXME:// Type script error. Need to solve
    const { file } = req;

    // Upload file
    const { url } = saveFile(file.buffer, assignmentUrlGenerator(title, file.mimetype));

    // Convert date where only consider date
    const onlyDate = new Date(moment(deadline).format("YYYY-MM-DD"));

    // Add alignments
    const dbData = { ...data, title, instructorId, question: url, deadline: onlyDate };
    await this.service.post(dbData);

    return res.send({ data: "Assignment created" });
  };

  getAll = async (req: Request, res: Response) => {
    const { _id: instructorId }: any = req.user;

    const filters = { instructorId };
    const projection = instructorAssignmentProjection(["basic", "minimal"]);
    const assignments = await this.service.get(filters, projection);

    return res.send({ data: assignments });
  };
}
