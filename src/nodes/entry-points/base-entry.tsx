import React, { FC, memo } from 'react'
import { Handle, Position } from 'reactflow'

export const BaseEntry: FC = memo(() => {
  return (
    <div className="h-12 w-12 rounded-full bg-gray-900">
      <Handle
        type="source"
        position={Position.Right}
        className="h-2.5 w-2.5 !bg-teal-500"
      />
    </div>
  )
})
