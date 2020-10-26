import React from 'react'
import PropTypes from 'prop-types'
import Chart from 'react-google-charts'
import moment from 'moment'
import lodash from 'lodash'

const config = require('../../../tailwind.config')

const _ = ({ schedule }) => {
  const series = {}
  const axes = { y: {} }
  lodash.uniq(schedule.map((d) => d.feeder.name)).forEach((f, i) => {
    series[i] = { axis: f }
    axes[f] = { label: f }
  })

  const format = (d) => {
    const tmp = Array.from({ length: Object.keys(series).length }, () => null)
    const i = Object.keys(series).map((s) => series[s].axis).indexOf(d.feeder.name)
    tmp[i] = d.quantity
    return tmp
  }

  return (
    <div className="flex w-full justify-center overflow-hidden">
      <Chart
        chartType="ScatterChart"
        height={200}
        width="100%"
        loader={<div className="mt-3 w-full h-48 bp3-skeleton" />}
        data={[
          ['', ...Object.keys(series).map((s) => series[s].axis), { type: 'string', role: 'tooltip' }],
          ...schedule.map((s) => [
            new Date(s.timestamp),
            ...format(s),
            /* specifies the tooltip */
            `${s.quantity} lb${s.quantity === 1 ? '' : 's'} from ${s.feeder.name} at ${moment(s.timestamp).format('MMM Do h:mm:ss')}`
          ])
        ]}
        options={{
          legend: { position: 'none' },
          // colors: [config.theme.colors.primary],
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
        legendToggle
      />
    </div>
  )
}
_.propTypes = {
  schedule: PropTypes.array
}

export default _
