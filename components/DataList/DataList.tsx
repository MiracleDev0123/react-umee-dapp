import { Box, BoxProps, GridSizeType, ResponsiveContext } from 'grommet'
import * as React from 'react'
import { DataListBody, DataListHeader } from '.'
import { useContext } from 'react'
export interface IDataListColumn {
  title: string
  size: GridSizeType
  display?: boolean
  tooltip?: string
}

export interface DataListProps {
  background?: BoxProps['background']
  children?: any[]
  columns: IDataListColumn[]
}

const DataList = ({ background, children, columns }: DataListProps) => {
  const size = useContext(ResponsiveContext)

  if (size === 'small') {
    return (
      <Box>
        <DataListBody>{children}</DataListBody>
      </Box>
    )
  }

  return (
    <Box align="center" round="8px" fill="horizontal">
      <DataListHeader columns={columns} />
      <DataListBody>{children}</DataListBody>
    </Box>
  )
}

export default DataList
