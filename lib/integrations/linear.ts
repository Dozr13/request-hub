import { LinearClient } from '@linear/sdk'
import crypto from 'crypto'

// Initialize Linear client inside functions to ensure env vars are loaded
function getLinearClient() {
  if (!process.env.LINEAR_API_KEY) {
    throw new Error('LINEAR_API_KEY is not configured')
  }

  return new LinearClient({
    apiKey: process.env.LINEAR_API_KEY,
  })
}

interface CreateLinearTaskParams {
  title: string
  description: string
  category: string
  requestId: string
  companyName: string
  userId: string
}

interface LinearTaskResponse {
  id: string
  identifier: string
  url: string
  success: boolean
  error?: string
}

/**
 * Create a new task in Linear from a request
 */
export async function createLinearTask(
  params: CreateLinearTaskParams
): Promise<LinearTaskResponse> {
  try {
    const linearClient = getLinearClient()

    // Get the default team (you may want to configure this)
    const teams = await linearClient.teams()
    const defaultTeam = teams.nodes[0]

    if (!defaultTeam) {
      throw new Error('No Linear team found')
    }

    // Create the task
    const taskPayload = await linearClient.createIssue({
      teamId: defaultTeam.id,
      title: `[${params.category}] ${params.title}`,
      description: `
**Company:** ${params.companyName}
**Category:** ${params.category}
**Request ID:** ${params.requestId}

---

${params.description}
      `.trim(),
      labelIds: [], // You can add label IDs here if you have them configured
      priority: 2, // Medium priority
    })

    const task = await taskPayload.issue

    if (!task) {
      throw new Error('Failed to create Linear task')
    }

    return {
      id: task.id,
      identifier: task.identifier,
      url: task.url,
      success: true,
    }
  } catch (error) {
    console.error('Error creating Linear task:', error)
    return {
      id: '',
      identifier: '',
      url: '',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Update Linear task status based on request status
 */
export async function updateLinearTaskStatus(
  taskId: string,
  status: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const linearClient = getLinearClient()
    const task = await linearClient.issue(taskId)

    if (!task) {
      throw new Error('Task not found')
    }

    // Get all available states for the team
    const team = await task.team
    if (!team) {
      throw new Error('Team not found')
    }

    const states = await team.states()
    const stateNodes = states.nodes

    // Map request status to Linear states
    const statusMapping: Record<string, string> = {
      SUBMITTED: 'Todo',
      IN_PROGRESS: 'In Progress',
      REVIEWING: 'In Review',
      COMPLETED: 'Done',
    }

    const targetStateName = statusMapping[status]
    if (!targetStateName) {
      throw new Error(`Unknown status: ${status}`)
    }

    // Find the target state
    const targetState = stateNodes.find(
      (state) => state.name === targetStateName
    )
    if (!targetState) {
      throw new Error(`Linear state not found: ${targetStateName}`)
    }

    // Update the task state
    await task.update({
      stateId: targetState.id,
    })

    return { success: true }
  } catch (error) {
    console.error('Error updating Linear task status:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Update request status based on Linear task status
 */
export async function syncLinearTaskStatus(taskId: string) {
  try {
    const linearClient = getLinearClient()
    const task = await linearClient.issue(taskId)

    if (!task) {
      throw new Error('Task not found')
    }

    const taskState = await task.state
    if (!taskState) {
      throw new Error('Task state not found')
    }

    // Map Linear states to your request statuses
    const statusMapping: Record<string, string> = {
      Todo: 'PENDING',
      'In Progress': 'IN_PROGRESS',
      'In Review': 'REVIEWING',
      Done: 'COMPLETED',
      Canceled: 'CANCELLED',
    }

    const requestStatus = statusMapping[taskState.name] || 'PENDING'

    return {
      taskId,
      status: requestStatus,
      linearStatus: taskState.name,
      success: true,
    }
  } catch (error) {
    console.error('Error syncing Linear task status:', error)
    return {
      taskId,
      status: null,
      linearStatus: null,
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Get Linear webhook signature for verification
 */
export function verifyLinearWebhook(
  payload: string,
  signature: string
): boolean {
  // Implement webhook signature verification if needed
  // Linear uses HMAC-SHA256 for webhook signing
  const secret = process.env.LINEAR_WEBHOOK_SECRET

  if (!secret) {
    console.warn('LINEAR_WEBHOOK_SECRET not configured')
    return true // Skip verification in development
  }

  const hmac = crypto.createHmac('sha256', secret)
  hmac.update(payload)
  const digest = hmac.digest('hex')
  const expected = `sha256=${digest}`

  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
}
