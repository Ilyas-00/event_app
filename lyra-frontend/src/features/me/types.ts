export type Role = 'SUPER_ADMIN' | 'SERVICE_ADMIN' | 'USER'

export type Me = {
  tgi: string
  role: Role
  serviceId: string | null
}
