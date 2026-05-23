import { db } from "../../config/db";

export const IssueService = {
  //create Issue
  async createIssue(playload: any, reporter_id: number) {
    const result = await db.query(
      `
            INSERT INTO issues
            (title,description,type,reporter_id)
            VALUES($1,$2,$3,$4)
            RETURNING *
            
            
            `,
      [playload.title, playload.description, playload.type, reporter_id],
    );
    return result.rows[0];
  },

  //get all issue
  async getAllIssues(filters: any) {
    let query = `SELECT * FROM issues`;
    const conditions: string[] = [];
    const values: any[] = [];

    if (filters.type) {
      values.push(filters.type);
      conditions.push(`type =$${values.length}`);
    }
    if (filters.status) {
      values.push(filters.status);
      conditions.push(`status = $${values.length}`);
    }
    if (conditions.length > 0) {
      query += ` WHERE ` + conditions.join(" AND ");
    }
    if (filters.sort === "oldest") {
      query += ` ORDER BY created_at ASC`;
    } else {
      query += ` ORDER BY created_at DESC`;
    }

    const issuesRes = await db.query(query, values);
    const issues = issuesRes.rows;

    const reporterIds = [...new Set(issues.map((i: any) => i.reporter_id))];

    const usersRes = await db.query(
      `
        SELECT id, name, role from users WHERE id = ANY($1)
        `,
      [reporterIds],
    );

    const users = usersRes.rows;
    const issuesWithReporter = issues.map((issue: any) => {
      const reporter = users.find((u: any) => u.id === issue.reporter_id);

      return {
        ...issue,
        reporter,
      };
    });
    return issuesWithReporter;
  },

  //get single issues

  async getSingleIssue(id: number) {
    const issueRes = await db.query(
      `
        SELECT * FROM issues WHERE id =$1
        `,
      [id],
    );
    const issue = issueRes.rows[0];

    if (!issue) {
      throw new Error("Issue not found");
    }

    const userRes = await db.query(
      `
        SELECT id,name,role FROM users WHERE id = $1
        
        `,
      [issue.reporter_id],
    );
    return {
      ...issue,
      reporter: userRes.rows[0],
    };
  },

  //update Issues
  async updateIssue(id: number, payload: any, user: any) {
    const issueRes = await db.query(`SELECT * FROM issues WHERE id = $1`, [id]);
    const issue = issueRes.rows[0];
    if (!issue) {
      throw new Error("Issue not found");
    }

    if (user.role === "contributor" && issue.reporter_id !== user.id) {
      throw new Error("Forbidden");
    }

    if (user.role === "contributor" && issue.status !== "open") {
      throw new Error("Cannot edit non-open issue");
    }

    const updatedTitle = payload.title || issue.title;
    const updatedDescription = payload.description || issue.description;
    const updatedType = payload.type || issue.type;
    const updatedStatus = payload.status || issue.status;

    const result = await db.query(
      `
        
        
        UPDATE issues
        SET
            title = $1,
            description= $2,
            type = $3,
            status = $4,
            updated_at = CURRENT_TIMESTAMP
      WHERE id = $5
      RETURNING *`,
      [updatedTitle, updatedDescription, updatedType, updatedStatus, id],
    );
    return result.rows[0];
  },

  //delete issues
  async deleteIssue(id: number) {
    const issueRes = await db.query(`SELECT * FROM issues WHERE id = $1`, [id]);
    if (!issueRes.rows[0]) {
      throw new Error("Issue not found");
    }

    await db.query(`DELETE FROM issues WHERE id =$1`, [id]);
    return;
  },
};
