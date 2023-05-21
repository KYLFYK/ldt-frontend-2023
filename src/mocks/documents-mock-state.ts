import moment from 'moment'

import { TDocuments } from '../types/documents'

export const DocumentsMockState: {
  tree: TDocuments
} = {
  tree: {
    files: [
      {
        createAt: moment()
          .add(-4, 'days')
          .set({
            hours: 12,
            minutes: 36,
          })
          .toISOString(),
        updateAt: moment()
          .add(-4, 'days')
          .set({
            hours: 12,
            minutes: 36,
          })
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
            createAt: moment()
              .set({
                hours: 12,
                minutes: 36,
                years: 2023,
                days: 22,
                months: 5,
              })
              .toISOString(),
            updateAt: moment()
              .set({
                hours: 12,
                minutes: 36,
                years: 2023,
                days: 22,
                months: 5,
              })
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
