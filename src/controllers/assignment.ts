import { Request, Response } from "express";
import assignmentService from "@services/assignment";
import BaseController from "./base";
import { saveFile } from "@services/uploadFile";
import { assignmentUrlGenerator } from "@helpers/urlGenerator";

export default class AssignmentController extends BaseController {
  service;
  constructor() {
    super(assignmentService);
    this.service = assignmentService;
  }

  upload = async (req: Request, res: Response) => {
    const { title, ...data } = req.body;
    const { _id: instructorId }: any = req.user; // FIXME:// Type script error. Need to solve
    const { file } = req;

    // Upload file
    const { url } = saveFile(file.buffer, assignmentUrlGenerator(title, file.mimetype));

    // Add alignments
    const dbData = { ...data, title, instructorId, question: url };
    this.service.post(dbData);

    return res.send({ data: "Assignment created" });
  };
}
