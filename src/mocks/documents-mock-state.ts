import dayjs from 'dayjs'

import { TDocuments } from '../types/documents'

export const DocumentsMockState: {
  tree: TDocuments
} = {
  tree: {
    files: [
      {
        createAt: dayjs()
          .add(-4, 'days')
          .set('hours', 12)
          .set('minutes', 32)
          .toISOString(),
        updateAt: dayjs()
          .add(-4, 'days')
          .set('hours', 12)
          .set('minutes', 36)
          .toISOString(),
        fileName: 'Договор №413-341-34',
        mediaType: 'document',
        mimeType: '.docx',
        id: -1,
      },
    ],
    children: [
      {
        name: 'Важные документы',
        files: [
          {
            createAt: dayjs()
              .set('hours', 12)
              .set('minutes', 36)
              .set('years', 2023)
              .set('days', 22)
              .set('months', 5)
              .toISOString(),
            updateAt: dayjs()
              .set('hours', 12)
              .set('minutes', 36)
              .set('years', 2023)
              .set('days', 22)
              .set('months', 5)
              .toISOString(),
            fileName: 'Отчет 22.05.2023',
            mediaType: 'document',
            mimeType: '.docx',
            id: -2,
          },
        ],
        id: '1234',
        children: [
          {
            name: 'Очен важные документы',
            id: '783459',
            files: [],
            children: [],
          },
        ],
      },
    ],
    name: 'root',
    id: '123',
  },
}
