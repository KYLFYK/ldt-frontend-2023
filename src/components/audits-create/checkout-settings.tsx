import React, { ChangeEvent, FC, useCallback, useState } from 'react'

import { FileList } from '../ui/file-list'
import { RadioGroup } from '../ui/radio-group'
import { UploadFile } from '../ui/upload-file'

export const CheckoutSettings: FC = () => {
  const [file, setFile] = useState<File | undefined>(undefined)

  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }, [])

  const clearFile = useCallback(() => {
    setFile(undefined)
  }, [])

  return (
    <div className="col-span-8 px-5">
      <div className="mb-6 text-xl font-semibold">Объём проверки</div>
      <RadioGroup
        options={[
          {
            value: 'upload',
            label: 'Загрузить файл',
          },
          {
            value: 'api',
            label: 'Выбрать из ЕМИАС',
            disabled: true,
          },
        ]}
        defaultValue={{
          value: 'upload',
          label: 'Загрузить файл',
        }}
      />
      {file ? (
        <FileList
          files={[file]}
          containerClassName="sm:mt-2"
          onFileRemove={clearFile}
        />
      ) : (
        <UploadFile
          placeholder={'Выберите файл'}
          restrictions={'XLSX или CSV'}
          handleChange={handleFileChange}
          accept={'.xls,.xlsx,.csv'}
        />
      )}
    </div>
  )
}
