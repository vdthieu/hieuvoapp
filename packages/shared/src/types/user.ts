import type { UserRole } from '../constants/roles';

export interface SafeUser {
  id: string;
  email: string;
  name: string | null;
  role: UserRole;
}
