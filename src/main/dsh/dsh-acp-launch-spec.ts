// DSH chats run `dsh --profile acp` as a stdio ACP server (deepseek-harness-acp).
// The ACP profile is a structured engine, not the dsh-web browser UI or the dsh-tui terminal.

import { join } from 'node:path'
import type { AcpLaunchSpec } from '../acp/launch/acp-launch-contract'
import { GENERIC_ACP_DIALECT } from '../acp/acp-dialects/acp-dialect'
import { directoryAccountBinding } from '../acp/launch/acp-account-binding'
import type { StructuredAgentSessionHistory } from '../native-chat/conversation-adoption/structured-agent-cli-conversations'

// DSH keeps its native ACP session IDs; the chat cannot adopt DSH terminal conversations.
const DSH_SESSION_HISTORY: StructuredAgentSessionHistory = {
  rowAgents: ['dsh'],
  rowSessionId: (link) => link.handle.nativeId,
  parseResumeArgs: () => null
}

export const DSH_ACP_LAUNCH_SPEC: AcpLaunchSpec = {
  agent: 'dsh',
  command: 'dsh',
  args: () => ['--profile', 'acp'],
  env: {},
  dialect: GENERIC_ACP_DIALECT,
  loginCommand: [],
  account: directoryAccountBinding('DSH_HOME', (homePath) => join(homePath, '.dsh')),
  installDirectories: () => [],
  // Models are listed inside the session (configOptions); DSH cannot delete a listing session.
  modelDiscovery: { kind: 'session', listingNamesConfiguredModel: false },
  transcriptImport: null,
  sessionHistory: DSH_SESSION_HISTORY,
  keepsEverySession: true
}
