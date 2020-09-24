import React from 'react'
import PropTypes from 'prop-types'
import Chart from 'react-google-charts'
import moment from 'moment'

const config = require('../../../tailwind.config')

const _ = ({ schedule }) => (
  <div className="flex w-full justify-center overflow-hidden">
    <Chart
      chartType="ScatterChart"
      height={200}
      width="100%"
      loader={<div className="mt-3 w-full h-48 bp3-skeleton" />}
      data={[
        ['', 'Feed (lbs)', { type: 'string', role: 'tooltip' }],
        ...schedule.map((s) => [
          s.timestamp.toDate(),
          s.quantity,
          /* specifies the tooltip */
          `${s.quantity} lb${s.quantity === 1 ? '' : 's'} from ${s.feeder} at ${s.timestamp.format('MMM Do h:mm:ss')}`
        ])
      ]}
      options={{
        legend: { position: 'none' },
        colors: [config.theme.colors.primary],
        hAxis: { minValue: (new Date()), maxValue: moment().add(23, 'hours').toDate() },
        vAxis: { title: 'Feed (lbs)', minValue: 0 },
        animation: {
          duration: 1000,
          easing: 'inAndOut'
        },
        chartArea: {
          width: '85%',
          height: '80%'
        }
      }}
    />
  </div>
)
_.propTypes = {
  schedule: PropTypes.array
}

export default _
