import { apiClient } from '../../api/config';
import type { CreateRegistrationDto, Registration } from './types';

export function createRegistration(dto: CreateRegistrationDto) {
  return apiClient<Registration>('/registrations', {
    method: 'POST',
    body: JSON.stringify(dto),
  });
}
