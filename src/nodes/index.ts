import { FC } from 'react'

import { CustomNode } from '../components/custom-node'
import { EntryPoints } from './entry-points'
import { NODE_TYPES } from './types'

export const nodeTypes: {
    [key in NODE_TYPES]?: FC
} = {
    ...EntryPoints,
    [NODE_TYPES.CONDITION_BASE]: CustomNode,
}
