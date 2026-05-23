import type { Response } from "express";
import { IssueService } from "./issue.service";


export const IssueController = {
  async createIssue(req: any, res: Response) {
    try {
      const issue = await IssueService.createIssue(
        req.body,
        req.user.id
      );

      res.status(201).json({
        success: true,
        message: "Issue created successfully",
        data: issue,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  async getAllIssues(req: Request, res: Response) {
    try {
      const issues =
        await IssueService.getAllIssues(req.query);

      res.status(200).json({
        success: true,
        data: issues,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  async getSingleIssue(req: Request, res: Response) {
    try {
      const issue =
        await IssueService.getSingleIssue(
          Number(req.params.id)
        );

      res.status(200).json({
        success: true,
        data: issue,
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  },

  async updateIssue(req: any, res: Response) {
    try {
      const updatedIssue =
        await IssueService.updateIssue(
          Number(req.params.id),
          req.body,
          req.user
        );

      res.status(200).json({
        success: true,
        message: "Issue updated successfully",
        data: updatedIssue,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  async deleteIssue(req: Request, res: Response) {
    try {
      await IssueService.deleteIssue(
        Number(req.params.id)
      );

      res.status(200).json({
        success: true,
        message: "Issue deleted successfully",
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  },
};