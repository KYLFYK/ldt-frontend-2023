import { FC } from 'react'

import { NODE_TYPES } from '../types'
import { BaseEntry } from './base-entry'

export const EntryPoints: {
    [key in NODE_TYPES]?: FC
} = {
    [NODE_TYPES.ENTRY_POINT]: BaseEntry,
}
