/* eslint-disable indent */
import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button'

const _ = ({
  currentPage, changePage, totalPages, clickablePages, className, ...props
}) => (
  <div {...props} className={`flex w-full justify-center items-center ${className}`}>
    <Button icon="double-chevron-left" minimal disabled={currentPage === 0} onClick={() => changePage(0)} />
    <Button icon="chevron-left" minimal disabled={currentPage === 0} onClick={() => changePage((prev) => prev - 1)} />
    {
      Array.from(Array(clickablePages)).map((v, i) => {
        const page = currentPage < Math.floor(clickablePages / 2)
          ? i
          : currentPage > totalPages - Math.floor(clickablePages / 2)
            ? totalPages - clickablePages + i
            : currentPage - Math.floor(clickablePages / 2) + i
        if (page > totalPages - 1) return null
        if (page < 0) return null
        return (
          <Button minimal disabled={currentPage === page} onClick={() => changePage(page)} key={i}>
            {page + 1}
          </Button>
        )
      })
    }
    <Button icon="chevron-right" minimal disabled={currentPage === totalPages - 1} onClick={() => changePage((prev) => prev + 1)} />
    <Button icon="double-chevron-right" minimal disabled={currentPage === totalPages - 1} onClick={() => changePage(totalPages - 1)} />
  </div>
)
_.propTypes = {
  currentPage: PropTypes.number,
  changePage: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired,
  className: PropTypes.string,
  /** number of distinct clickable page numbers that will appear between the chevrons */
  clickablePages: PropTypes.number
}
_.defaultProps = {
  currentPage: 0,
  clickablePages: 5
}

export default _
