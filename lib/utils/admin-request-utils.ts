export function getStatusDisplayName(status: string): string {
  switch (status) {
    case 'PENDING':
      return 'New'
    case 'IN_PROGRESS':
      return 'Action Required'
    case 'REVIEWING':
      return 'Reviewing'
    default:
      return status.replace('_', ' ')
  }
}

export async function updateRequestStatus(
  requestId: string,
  newStatus: string
): Promise<boolean> {
  try {
    const response = await fetch(`/api/requests/${requestId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }),
    })

    if (response.ok) {
      return true
    } else {
      console.error('Failed to update request status')
      return false
    }
  } catch (error) {
    console.error('Error updating request status:', error)
    return false
  }
}
