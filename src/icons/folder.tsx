import { FolderIcon as LibFolderIcon } from '@heroicons/react/20/solid'
import React, { FC } from 'react'

import { TIconProps } from './index'

const FolderIcon: FC<TIconProps> = (props) => {
    return <LibFolderIcon {...props} />
}

export default FolderIcon
