import React from 'react'
import PropTypes from 'prop-types'
import Chart from 'react-google-charts'
import moment from 'moment'

const config = require('../../../tailwind.config')

const _ = ({ schedule }) => (
  <div className="flex w-full justify-center mt-3">
    <Chart
      chartType="ScatterChart"
      loader={<div className="w-full h-48 bp3-skeleton" />}
      data={[
        ['', 'Feed (lbs)'],
        ...schedule.map((s) => [s.timestamp.toDate(), s.quantity])
      ]}
      options={{
        legend: { position: 'none' },
        colors: [config.theme.colors.primary],
        hAxis: { minValue: (new Date()), maxValue: moment().add(23, 'hours').toDate() },
        vAxis: { title: 'Feed (lbs)', minValue: 0 },
        animation: {
          duration: 1000,
          easing: 'inAndOut'
        }
      }}
    />
  </div>
)
_.propTypes = {
  schedule: PropTypes.array
}

export default _
