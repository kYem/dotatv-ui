import React from 'react'

const defaultProps = ({
  fill: '#28a745',
  height: '16px',
})

const IconRadiant = (props) => {
  const mergedProps = { ...defaultProps, ...props }
  return (
    <svg {...mergedProps} className={'radiant'} viewBox='0 0 300 300'>
      <ellipse cx='148.6' cy='65.5' rx='35' ry='64.4' />
      <path
        d='M299.3,212.1c0,0-27.5-6.1-27.5-21.5c-0.5-15.4,8.9-22.4,8.9-22.4s-0.9-1.9-0.5-4.2c0.5-2.3,7.9-2.3,7.9-2.3
        s-0.9-2.3-0.5-4.7c0-1.9,3.3-4.2,3.3-4.2s-4.2-0.5-5.1-1.9c-1.4-1.4-1.4-3.7-1.4-3.7s-30.3,4.2-28.5-9.8s21.5-13.1,21.5-13.1
        l-0.9-7.5c0,0-9.3-0.5-11.7-2.8c-0.9-0.9-8.9-22.9-18.7-40.1c-11.2-19.6-23.8-34.5-23.8-34.5l-9.3,2.8l1.4,19.1
        c0,0,13.1,3.3,16.3,13.5c4.7,14.9-8.9,61.6-25.7,67.7c-14,5.1-29.9,0.9-29.9,0.9l-0.5,9.3l16.8,14l-13.5,6.5l-4.2-7l-5.1,8.4h-6.1
        l-4.7,5.6l-7.9,0.9l-7.9-1.4l-4.7-5.6h-6.1l-5.6-8.4l-3.7,7.5l-12.6-6.1l16.8-14l-0.5-9.3c0,0-15.9,4.7-29.9-0.9
        c-16.8-6.1-30.3-52.7-25.7-67.7c3.3-10.3,16.3-13.5,16.3-13.5l0.9-18.7l-9.3-2.8c0,0-12.6,14.9-23.8,34.5
        c-9.8,16.8-17.7,38.7-18.7,40.1c-2.3,1.9-11.7,2.8-11.7,2.8l-0.9,7.5c0,0,19.6-0.5,21.5,13.1c1.9,14-28.5,9.8-28.5,9.8
        s0,0.9-1.4,2.8c-1.4,1.4-5.1,1.9-5.1,1.9s3.3,1.9,3.3,4.2c0,1.9-0.5,4.7-0.5,4.7s7.5,0,7.9,2.3c0.5,2.3-0.5,4.2-0.5,4.2
        s8.9,7,8.9,22.4c-0.5,14.9-28,21.5-28,21.5l28.9-4.7l8.9,11.7l-5.6,5.1l38.7-3.7c0,0-10.7,9.3-14.9,10.7
        c-4.2,1.4-10.3,2.3-10.3,2.3s4.7,4.7,0.5,9.3c-3.7,3.7-12.1,7.5-12.1,7.5l28-11.7h20.1c0,0-12.6,6.1-15.9,8.9
        c-3.3,3.3-6.1,9.8-6.1,9.8l-12.6,0.5c0,0,15.4,7,16.3,13.5c0.5,6.5-0.9,9.8-0.9,9.8l9.8,7.5c0,0-4.7-12.6-2.8-15.4
        c1.9-2.8,10.7,1.9,14.9,7c6.5,7,7,18.7,7,18.7s0.9-6.1-0.5-14.9c-1.4-10.7-14.9-14.5-19.6-18.2c-4.2-3.3-3.7-9.3-1.4-14
        c4.2-7.5,16.8-13.1,16.8-13.1l0.9,4.2l4.7-3.7c0,0,8.9,13.5,8.4,18.2c0,4.7-2.3,7.9-1.9,11.7c0.5,3.7,6.1,10.7,6.1,10.7
        s-1.9-5.1-1.4-10.7c0.5-5.6,2.3-11.7,8.4-11.2c7.5,0.5,21,12.1,24.3,18.7c3.3,6.5,3.3,18.7,4.7,18.7s3.3-12.6,4.7-14.9
        c1.4-2.3,3.3-2.3,3.3-2.3s1.9,0,3.3,2.3c1.4,2.3,3.3,14.9,4.7,14.9s1.4-12.1,4.7-18.7c3.3-6.5,16.8-18.2,24.3-18.7
        c5.6-0.5,7.9,5.6,8.4,11.2c0,5.6-1.4,10.7-1.4,10.7s5.6-6.5,6.1-10.7c0.5-3.7-1.4-7-1.9-11.7c0-4.7,8.4-18.2,8.4-18.2l4.7,3.7
        l0.9-4.2c0,0,12.1,5.6,16.8,13.1c2.8,4.2,2.8,10.7-1.4,14c-4.7,3.7-18.2,7.5-19.6,18.2c-1.4,8.9-0.5,14.9-0.5,14.9s0.5-11.7,7-18.7
        c4.7-5.1,13.1-9.8,14.9-7s-2.8,15.4-2.8,15.4l9.8-7.5c0,0-1.9-3.3-0.9-9.8c0.5-6.5,16.3-13.5,16.3-13.5h-12.6c0,0-3.3-7-6.1-9.8
        c-3.3-3.3-15.9-8.9-15.9-8.9h20.1l28,11.7c0,0-8.4-3.7-12.1-7.5c-4.2-4.2,0.5-9.3,0.5-9.3s-6.1-0.9-10.3-2.3
        c-4.2-1.9-14.9-11.2-14.9-11.2l38.7,3.7l-5.6-5.1l8.9-11.7L299.3,212.1z M79.1,212.5l-32.7,3.3l-7-9.3l42.5,1.4L79.1,212.5z
        M142.1,262.9c-0.9,7.9-0.5,12.1-0.5,12.1s-5.6-7-12.1-13.1c-8.4-7-14.5-7.5-14.5-7.5s7.5-3.7,16.3-3.7s13.5,1.4,13.5,1.4
        S142.5,257.3,142.1,262.9z M171,262.5c-7,5.6-12.1,13.1-12.1,13.1s0.5-4.2-0.5-12.1c-0.5-6.1-2.8-10.7-2.8-10.7s4.7-1.4,13.5-1.4
        s16.3,3.7,16.3,3.7S179.9,255,171,262.5z M254.1,215.8l-33.1-3.3l-2.8-4.2l42.5-1.4L254.1,215.8z'
      />
    </svg>
  )
}

export default IconRadiant
