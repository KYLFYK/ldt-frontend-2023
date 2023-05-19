import React, { FC, useCallback, useRef, useState } from 'react'
import ReactFlow, {
  addEdge, Controls,
  MiniMap,
  ReactFlowInstance,
  ReactFlowProvider,
  useEdgesState,
  useNodesState
} from 'reactflow'
import { NODE_TYPES } from '../nodes/types'
import { useAppDispatch } from '../ducks'
import { setApplicationIsInit } from '../ducks/application/actions'
import { doSomething } from '../ducks/application/reducer'
import { nodeTypes } from '../nodes'
import { FlowMenu } from '../components/flow-menu'

const initNodes = [
  {
    id: '1',
    type: NODE_TYPES.CONDITION_BASE,
    data: { name: 'Jane Doe', job: 'CEO', emoji: '😎' },
    position: { x: 0, y: 50 },
  },
  {
    id: '2',
    type: NODE_TYPES.CONDITION_BASE,
    data: { name: 'Tyler Weary', job: 'Designer', emoji: '🤓' },

    position: { x: -200, y: 200 },
  },
  {
    id: '3',
    type: NODE_TYPES.CONDITION_BASE,
    data: { name: 'Kristi Price', job: 'Developer', emoji: '🤩' },
    position: { x: 200, y: 200 },
  },
]

const initEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
  },
  {
    id: 'e1-3',
    source: '1',
    target: '3',
  },
]

let id = 0
const getId = () => `dndnode_${id++}`

export const WorkFlows: FC = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null)
  const dispatch = useAppDispatch()

  dispatch(setApplicationIsInit(false))
  dispatch(doSomething(true))

  const [nodes, setNodes, onNodesChange] = useNodesState(initNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges)

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    []
  )

  const onDragOver = useCallback((event: any) => {
    event.preventDefault()
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move'
    }
  }, [])

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault()

      if (reactFlowWrapper.current && event.dataTransfer && reactFlowInstance) {
        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
        const type = event.dataTransfer.getData('application/reactflow')

        if (typeof type === 'undefined' || !type) {
          return
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        })

        const newNode = {
          id: getId(),
          type,
          position,
          data: { name: 'Kristi Price', job: 'Developer', emoji: '🤩' },
        }

        setNodes((nds) => nds.concat(newNode))
      }
    },
    [reactFlowInstance]
  )

  return (
    <div className="flex h-full flex-grow">
      <ReactFlowProvider>
        <div className="h-full flex-grow" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView={true}
            className="bg-blue-200"
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
          >
            <MiniMap />
            <Controls />
          </ReactFlow>
        </div>
        <FlowMenu />
      </ReactFlowProvider>
    </div>
  )
}
