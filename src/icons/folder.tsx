import { FolderIcon as LibFolderIcon } from '@heroicons/react/24/outline'
import React, { FC } from 'react'

import { TIconProps } from './index'

const FolderIcon: FC<TIconProps> = (props) => {
  return <LibFolderIcon {...props} />
}

export default FolderIcon
