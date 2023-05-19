import React, { FC } from 'react'

import { NODE_TYPES } from '../nodes/types'

export const FlowMenu: FC = () => {
  const onDragStart = (event: any, nodeType: any) => {
    event.dataTransfer.setData('application/reactflow', nodeType)
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <aside className="basis-1/4 border-l border-b-black bg-gray-900 px-10 py-16 text-sm text-blue-50">
      <div className="flex-col gap-1">
        <div
          className="cursor-grabbing rounded bg-blue-600 px-8 py-4"
          onDragStart={(event) => onDragStart(event, NODE_TYPES.ENTRY_POINT)}
          draggable={true}
        >
          Начало процесса
        </div>
      </div>
    </aside>
  )
}
