export enum UserRole {
  METHODIST = 'methodist',
  CHIEF_PHYSICIAN = 'chief_physician',
  SUB_CHIEF = 'sub_chief',
  ADMIN = 'admin',
  MEDICAL_SUBSTITUTE = 'medical_substitute',
  EXPERT_DEPUTY = 'expert_deputy',
}

enum TPermission {
  VIEW_AUDITS = 'VIEW_AUDITS',
  EDIT_AUDITS = 'EDIT_AUDITS',
  CREATE_AUDITS = 'CREATE_AUDITS',
  EDIT_SAMPLE = 'EDIT_SAMPLE',
  CREATE_SAMPLE = 'CREATE_SAMPLE',
}

export enum TPermissionScope {
  ALL = 'ALL',
  DEPARTMENT = 'DEPARTMENT',
  OWN = 'OWN',
  NONE = 'NONE',
}

export type TUserPermissions = {
  name: TPermission
  scope: TPermissionScope
}

export type TUserRights = {
  role: UserRole
  permissions: TUserPermissions[]
}
