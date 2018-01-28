import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'

const Progress = () => (
  <div style={{ textAlign: 'center', marginTop: '30px' }}>
    <CircularProgress size={80} thickness={5} mode={'indeterminate'} value={0} min={0} max={100} />
  </div>
)

export default Progress
