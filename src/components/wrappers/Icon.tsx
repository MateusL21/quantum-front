import { Icon as IconifyIcon } from '@iconify/react'
import type { IconProps } from '@iconify/react'

const Icon = ({ icon, ...props }: { icon: string } & IconProps) => {
  return <IconifyIcon icon={`tabler:${icon}`} {...props} />
}
export default Icon
