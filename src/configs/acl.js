import { AbilityBuilder, Ability } from '@casl/ability'
import themeConfig from './themeConfig'

export const AppAbility = Ability

/**
 * Please define your own Ability rules according to your app requirements.
 * We have just shown Admin and Client rules for demo purpose where
 * admin can manage everything and client can just visit ACL page
 */
const defineRulesFor = (role, permission, permissions) => {
  const { can, rules } = new AbilityBuilder(AppAbility)

  if (permissions?.length) can(['read'], [...permissions])
  if (!themeConfig.acl) {
    can('manage', 'all')

    return rules
  }

  const userPerms = [
    'home',
    'courses',
    'chapter',
  ]

  /**
   * Admin can manage everything
   * @Usage of can function
   * When you set the permission to a role like "can(['read'], 'wallet')", it means that the user with this role can only read the wallet permission. But wallet permission has to be setted to the pages like this:
   * Home.acl = {
   *  action: 'read',
   *  permission: 'home'
   * }
   */
  switch (role) {
    case 'admin':
      can('manage', 'all')
      break

    case 'wallet-user':
      can(['read'], "wallet")
      can(['read'], userPerms)
      break

    case 'user':
      can(['read'], userPerms)
      break

    case 'public':
      can(['read'], "home")
      can(['read'], "courses")
      can(['read'], "roadmap")
      can(['read'], "solana")
      can(['read'], "build")
      can(['read'], "community")
      can(['read'], "chapter")
      can(['read'], "admin")
      break

    default:
      can(['read'], permission)
      break
  }

  return rules
}

export const buildAbilityFor = (role, permission, permissions) => {
  return new AppAbility(defineRulesFor(role, permission, permissions), {
    // https://casl.js.org/v5/en/guide/subject-type-detection
    // @ts-ignore
    detectSubjectType: object => object.type
  })
}

export const defaultACLObj = {
  action: 'manage',
  permission: 'all'
}

export default defineRulesFor
