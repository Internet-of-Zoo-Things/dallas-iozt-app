export default {
  ROOT: {
    name: 'Root',
    privilege: 0,
    description: 'Root access to the application'
  },
  ADMIN: {
    name: 'Admin',
    privilege: 1,
    description: 'Admin access to create/assign/delete users and any zoo data'
  },
  DEVELOPER: {
    name: 'Developer',
    privilege: 2,
    description: 'Developer access to modification of data and debug functionality'
  },
  GENERAL: {
    name: 'General user',
    privilege: 3,
    description: 'General access to view application and edit animals/feeders'
  },
  VIEWER: {
    name: 'Viewer',
    privilege: 10,
    description: 'View-only site access'
  }
}
