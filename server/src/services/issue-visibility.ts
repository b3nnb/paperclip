import { nonIdleSlackIssueCondition } from "./slack-conversation-state.js";
import { and, isNull, sql, type SQL, type SQLWrapper } from "drizzle-orm";
import { issues, projects } from "@paperclipai/db";

export function visibleIssueCondition(): SQL {
  return and(isNull(issues.hiddenAt), isNull(issues.harnessKind))!;
}

export function visibleIssueSql(alias = "issues") {
  return `"${alias}"."hidden_at" IS NULL AND "${alias}"."harness_kind" IS NULL`;
}

/** Work queues and execution totals omit persistent conversation containers. */
export function executionIssueCondition(): SQL {
  return and(visibleIssueCondition(), isNull(issues.conversationAgentId), nonIdleSlackIssueCondition())!;
}

/**
 * Night-crew lot contract (doc/plans/2026-10-02-night-crew.md §1): an issue
 * parked in a zone-"a" project never surfaces on an attention surface —
 * company feeds, the inbox, notification-eligible events. Invisibility is
 * enforced server-side here, not by UI hiding. Execution paths (agents
 * researching and building lot items) keep full access and must NOT use this
 * condition. For the issues table in scope (unaliased, as in
 * `visibleIssueCondition`).
 */
export function lotProjectIssueCondition(): SQL {
  return sql`NOT EXISTS (
    SELECT 1 FROM ${projects} lot_project
    WHERE lot_project.id = ${issues.projectId} AND lot_project.zone = 'a'
  )`;
}

/**
 * Same contract as {@link lotProjectIssueCondition} for queries whose subject
 * table references an issue by id (thread interactions, decisions, recovery
 * actions, runs). Issues with a null id reference never match, so rows about
 * non-issue subjects always pass.
 */
export function issueIdOutsideLotProjectCondition(issueId: SQLWrapper): SQL {
  return sql`NOT EXISTS (
    SELECT 1
    FROM ${issues} lot_issue
    JOIN ${projects} lot_project ON lot_project.id = lot_issue.project_id
    WHERE lot_issue.id = ${issueId} AND lot_project.zone = 'a'
  )`;
}
