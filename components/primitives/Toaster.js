import { Position, Toaster } from '@blueprintjs/core'

const Toast = (typeof window !== 'undefined') ? Toaster.create({
  position: Position.TOP
}) : null

const _ = {
  success: (props) => Toast.show({
    className: 'toast-success',
    icon: 'tick-circle',
    ...props
  }),
  warning: (props) => Toast.show({
    className: 'toast-warning',
    icon: 'warning-sign',
    ...props
  }),
  error: (props) => Toast.show({
    className: 'toast-error',
    icon: 'issue',
    ...props
  })
}

export default _
