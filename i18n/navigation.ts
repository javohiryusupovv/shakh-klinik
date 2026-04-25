// Shared navigation helpers for both RSC and client components.
// next-intl v4 — createNavigation(routing) returns typed { Link, useRouter, usePathname, redirect, ... }
// The same module re-exports across server/client boundaries — Next picks the right
// implementation via next-intl's react-server / react-client resolution.
import { createNavigation } from 'next-intl/navigation'
import { routing } from '@/i18n/routing'

export const { Link, useRouter, usePathname, redirect, permanentRedirect, getPathname } =
  createNavigation(routing)
