import { coordinateData } from '@/components/main/echarts/data/coordinateData'
import type { IDataType } from '@/types'

export const convertData = function (data: any) {
  const res: IDataType[] = []
  for (let i = 0; i < data.length; i++) {
    const geoCoord = coordinateData[data[i].name]
    if (geoCoord) {
      res.push({
        name: data[i].name,
        value: geoCoord.concat(data[i].value),
      })
    }
  }
  return res
}
