import { UserRoles } from '../../models'

/**
 * Import / Export helper functions here
 */

export * from './usePrevious'

export function compareUserRoles(role1, role2) {
  try {
    const extractPrivilege = (r) => {
      if (typeof r === 'string') {
        const tmp = UserRoles[r]
        if (!tmp) throw Error(`Unknown role ${r}`)
        return tmp.privilege
      }
      if (typeof r === 'object') {
        if (!r.privilege) throw Error('Unknown object used in role comparison')
        return r.privilege
      }
    }

    const a = extractPrivilege(role1)
    const b = extractPrivilege(role2)

    return (a < b) ? 1 : (a === b) ? 0 : -1
  } catch (err) {
    throw Error(err)
  }
}
