import React from 'react'
import PropTypes from 'prop-types'
import { Table, Tag } from 'antd'
import { color } from 'utils'
import styles from './browser.less'

const status = {
  1: {
    color: color.green,
  },
  2: {
    color: color.red,
  },
  3: {
    color: color.blue,
  },
  4: {
    color: color.yellow,
  },
}

function Browser ({ data }) {
  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      className: styles.name,
    }, {
      title: 'percent',
      dataIndex: 'ratio',
      className: styles.percent,
      render: text => <Tag color={status[Math.floor((Math.random()*4)+1)].color}>{text * 1000 / 10}%</Tag>,
    },
  ]
  return <Table pagination={false} showHeader={false} columns={columns} rowKey={(record, key) => key} dataSource={data} />
}

Browser.propTypes = {
  data: PropTypes.array,
}

export default Browser
