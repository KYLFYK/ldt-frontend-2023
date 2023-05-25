import { DocumentIcon as LibDocumentIcon } from '@heroicons/react/20/solid'
import React, { FC } from 'react'

import { TIconProps } from './index'

const DocumentIcon: FC<TIconProps> = (props) => {
  return <LibDocumentIcon {...props} />
}

export default DocumentIcon
