import { DocumentIcon as LibDocumentIcon } from '@heroicons/react/24/outline'
import React, { FC } from 'react'

import { TIconProps } from './index'

const DocumentIcon: FC<TIconProps> = (props) => {
  return <LibDocumentIcon {...props} />
}

export default DocumentIcon
