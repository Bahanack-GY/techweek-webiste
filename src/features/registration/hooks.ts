import { useMutation } from '@tanstack/react-query';
import { createRegistration } from './api';
import type { CreateRegistrationDto } from './types';

export function useCreateRegistration() {
  return useMutation({
    mutationFn: (dto: CreateRegistrationDto) => createRegistration(dto),
  });
}
