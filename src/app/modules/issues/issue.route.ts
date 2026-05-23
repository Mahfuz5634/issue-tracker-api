import { Router } from "express";
import { IssueController } from "./issue.controller";
import { auth, roleCheck } from "../../middleware/auth";


const router = Router();

router.post(
  "/",
  auth,
  roleCheck(["contributor", "maintainer"]),
  IssueController.createIssue
);

router.get("/", IssueController.getAllIssues);

router.get("/:id", IssueController.getSingleIssue);

router.patch(
  "/:id",
  auth,
  roleCheck(["maintainer","contributor"]),
  IssueController.updateIssue
);

router.delete(
  "/:id",
  auth,
  roleCheck(["maintainer"]),
  IssueController.deleteIssue
);

export default router;