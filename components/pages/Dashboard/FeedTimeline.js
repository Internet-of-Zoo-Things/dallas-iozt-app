import React from 'react'
import PropTypes from 'prop-types'
import Chart from 'react-google-charts'
import moment from 'moment'
import styled from 'styled-components'
import lodash from 'lodash'
import { generateColorStr } from '../../../utils/functions/ui'
import { Typography } from '../../primitives'

const Circle = styled.div`
  border-radius: 100%;
  width: 0.75rem;
  height: 0.75rem;
  background-color: ${({ color }) => color};
`

const Legend = ({ feeder, color, className }) => (
  <div className={`flex justify-center items-center ${className}`}>
    <Circle color={color} className="mr-1" />
    <Typography variant="subtitle">{feeder}</Typography>
  </div>
)
Legend.propTypes = {
  feeder: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string
}

const _ = ({ schedule }) => {
  const series = {}
  const axes = { y: {} }
  const colors = []
  lodash.uniq(schedule.map((d) => d.feeder.name)).forEach((f, i) => {
    series[i] = { axis: f }
    axes.y[f] = { label: f }
    colors.push(generateColorStr(`${f.replace(/feeder/gi, '')} and hash it up!`))
  })

  const format = (d) => {
    const tmp = Array.from({ length: Object.keys(series).length }, () => null)
    const i = Object.keys(series).map((s) => series[s].axis).indexOf(d.feeder.name)
    tmp[i] = d.quantity
    return tmp
  }

  return (
    <div className="flex flex-col w-full items-center overflow-hidden">
      <Chart
        chartType="ScatterChart"
        height={200}
        width="100%"
        loader={<div className="mt-3 w-full h-48 bp3-skeleton" />}
        data={[
          ['Timestamp', ...Object.keys(series).map((s) => series[s].axis)],
          ...schedule.map((s) => [
            new Date(s.timestamp),
            ...format(s)
          ])
        ]}
        options={{
          legend: { position: 'none' },
          colors,
          animation: {
            duration: 1000,
            easing: 'inAndOut'
          },
          chartArea: {
            width: '85%',
            height: '80%'
          },
          series,
          hAxis: { minValue: (new Date()), maxValue: moment().add(23, 'hours').toDate() },
          vAxis: { title: 'Feed (lbs)', minValue: 0 },
          axes
        }}
      />
      <div className="mt-2 flex flex-wrap w-full justify-center">
        {
          Object.keys(series).map((f, i) => (
            <Legend key={i} feeder={series[f].axis} color={colors[i]} className="m-2" />
          ))
        }
      </div>
    </div>
  )
}
_.propTypes = {
  schedule: PropTypes.array
}

export default _
