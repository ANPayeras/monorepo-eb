import React from 'react'
import { IconClockFilled, IconCopy, IconCopyCheck, IconProps, IconEdit, IconUpload, IconTrash, IconPhotoScan } from '@tabler/icons-react'

const IconsName = {
    copy: IconCopy,
    copyCheck: IconCopyCheck,
    clockFilled: IconClockFilled,
    edit: IconEdit,
    upload: IconUpload,
    trash: IconTrash,
    emptyImg: IconPhotoScan,
}

export type KeyTextIcons = keyof typeof IconsName;

const Icon = ({ name, iconProps = {} }: { name: KeyTextIcons, iconProps?: IconProps }) => {
    const Icon = IconsName[name]
    return <Icon {...iconProps} />
}

export default Icon