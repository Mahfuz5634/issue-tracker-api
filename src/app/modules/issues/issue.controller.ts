import type { Request, Response } from "express";
import { sendErrorResponse, sendSuccessResponse } from "../../utils/response";
import { IssueService } from "./issue.service";

export const IssueController = {
  async createIssue(req: any, res: Response) {
    try {
      const issue = await IssueService.createIssue(req.body, req.user.id);

      return sendSuccessResponse(res, {
        statusCode: 201,
        message: "Issue created successfully",
        data: issue,
      });
    } catch (error: any) {
      return sendErrorResponse(res, {
        statusCode: 400,
        message: error.message,
      });
    }
  },

  async getAllIssues(req: Request, res: Response) {
    try {
      const issues = await IssueService.getAllIssues(req.query);

      return sendSuccessResponse(res, {
        statusCode: 200,
        data: issues,
      });
    } catch (error: any) {
      return sendErrorResponse(res, {
        statusCode: 500,
        message: error.message,
      });
    }
  },

  async getSingleIssue(req: Request, res: Response) {
    try {
      const issue = await IssueService.getSingleIssue(Number(req.params.id));

      return sendSuccessResponse(res, {
        statusCode: 200,
        data: issue,
      });
    } catch (error: any) {
      return sendErrorResponse(res, {
        statusCode: 404,
        message: error.message,
      });
    }
  },

  async updateIssue(req: any, res: Response) {
    try {
      const updatedIssue = await IssueService.updateIssue(
        Number(req.params.id),
        req.body,
        req.user,
      );

      return sendSuccessResponse(res, {
        statusCode: 200,
        message: "Issue updated successfully",
        data: updatedIssue,
      });
    } catch (error: any) {
      return sendErrorResponse(res, {
        statusCode: 400,
        message: error.message,
      });
    }
  },

  async deleteIssue(req: Request, res: Response) {
    try {
      await IssueService.deleteIssue(Number(req.params.id));

      return sendSuccessResponse(res, {
        statusCode: 200,
        message: "Issue deleted successfully",
      });
    } catch (error: any) {
      return sendErrorResponse(res, {
        statusCode: 404,
        message: error.message,
      });
    }
  },
};
