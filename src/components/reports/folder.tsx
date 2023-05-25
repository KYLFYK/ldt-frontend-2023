import React, { FC, useCallback } from 'react'
import { NavigateFunction } from 'react-router-dom'

import { TDocNode } from '../../types/documents'
import { FolderButton } from './folder-button'

type TProps = {
  node: TDocNode
  parentRoutePath: string
  navigate: NavigateFunction
}

export const Folder: FC<TProps> = ({ node, navigate, parentRoutePath }) => {
  const handleOpenFolder = useCallback(() => {
    navigate(`${parentRoutePath}/${node.id}`)
  }, [node])

  return <FolderButton text={node.name} onClick={handleOpenFolder} />
}
