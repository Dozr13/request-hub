# Impersonation Permission Models

This document explains how to configure and switch between different impersonation permission models in the application.

I wasn't too certain on what direction to go with the permission models, so I just went with the ones I came up with lol. Feel free to adjust as needed.

## Configuration

Edit `lib/config/impersonation.ts` to change the permission model:

```typescript
export const IMPERSONATION_CONFIG = {
  permissionModel: 'STRICT_IMPERSONATION', // Change this line
  debugPermissions: process.env.NODE_ENV === 'development',
  allowCrossOrgAccess: false,
}
```

## Permission Models

### 1. STRICT_IMPERSONATION (Default)

**When impersonating, you only get the impersonated user's permissions.**

- Safest model - Ensures you experience exactly what the impersonated user experiences
- Best for debugging user-specific issues - See only what they can see
- No elevated permissions when impersonating - must stop impersonation to regain admin access

**Use case:** Debugging user-specific permission issues, testing user experience

```typescript
permissionModel: 'STRICT_IMPERSONATION'
```

### 2. ADMIN_OVERRIDE

**Original SUPER_ADMIN retains their permissions even when impersonating.**

- Best of both worlds - Admin can access everything while seeing user's context
- No need to stop impersonation to access admin features
- May not catch permission issues that affect the actual user

**Use case:** Administrative tasks while understanding user context

```typescript
permissionModel: 'ADMIN_OVERRIDE'
```

### 3. COMBINED_PERMISSIONS

**Uses the highest permission level between original and impersonated user.**

- Maximum access - Never lose permissions
- Least realistic - May not reflect actual user experience
- Can mask permission bugs

**Use case:** Development/testing when you need maximum flexibility

```typescript
permissionModel: 'COMBINED_PERMISSIONS'
```

## Quick Switching

For development, you can quickly switch models by changing one line:

```typescript
// For strict user experience testing
permissionModel: 'STRICT_IMPERSONATION'

// For admin work while impersonating
permissionModel: 'ADMIN_OVERRIDE'

// For maximum access during development
permissionModel: 'COMBINED_PERMISSIONS'
```

## Debug Information

When `debugPermissions: true` (enabled in development), you'll see:

1. Console logs showing permission decisions in API requests
2. Permission indicator in bottom-right corner of the UI
3. Meta information in API responses

## Permission Flow Examples

### STRICT_IMPERSONATION Example:

```
Original: SUPER_ADMIN → Impersonating: USER
Result: Can only see USER's organization requests
```

### ADMIN_OVERRIDE Example:

```
Original: SUPER_ADMIN → Impersonating: USER
Result: Can see ALL requests (admin retained) + User's context
```

### COMBINED_PERMISSIONS Example:

```
Original: SUPER_ADMIN → Impersonating: USER
Result: SUPER_ADMIN permissions (highest of the two)
```

## Best Practices

1. Start with STRICT_IMPERSONATION - Most realistic testing
2. Use ADMIN_OVERRIDE for admin tasks while impersonating
3. Avoid COMBINED_PERMISSIONS in production
4. Test permission changes by switching models and verifying behavior
5. Check debug logs to understand permission decisions

## API Integration

The permission system is automatically applied to:

- `GET /api/requests` - Request listing
- `GET /api/requests/[id]` - Individual request access
- `PATCH /api/requests/[id]` - Request updates
- `DELETE /api/requests/[id]` - Request deletion
- `POST /api/requests` - Request creation

All API endpoints will respect the configured permission model and log debug information when enabled.
