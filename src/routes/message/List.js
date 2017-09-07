import React from 'react'
import PropTypes from 'prop-types'
import { Table, Button } from 'antd'
import classnames from 'classnames'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import styles from './List.less'

const List = ({ isMotion, location, ...tableProps }) => {

  const columns = [
    {
      title: 'RequestId',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '转发失败',
      dataIndex: '转发失败',
      key: '转发失败',
      render: (text) => text == null ? 0 : text,
    }, {
      title: '转发成功',
      dataIndex: '转发成功',
      key: '转发成功',
      render: (text) => text == null ? 0 : text,
    }, {
      title: '到达',
      dataIndex: '到达',
      key: '到达',
      render: (text) => text == null ? 0 : text,
    }, {
      title: '打开',
      dataIndex: '打开',
      key: '打开',
      render: (text) => text == null ? 0 : text,
    }, {
      title: '过期',
      dataIndex: '过期',
      key: '过期',
      render: (text) => text == null ? 0 : text,
    }, {
      title: '统计图表',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <Button>
          <a href={`statistic/${record.id}`} target="blank">查看</a>
        </Button>
      },
    },
  ]

  const getBodyWrapperProps = {
    page: location.query.page,
    current: tableProps.pagination.current,
  }

  const getBodyWrapper = (body) => { return isMotion ? <AnimTableBody {...getBodyWrapperProps} body={body} /> : body }

  return (
    <div>
      <Table
        {...tableProps}
        className={classnames({ [styles.table]: true, [styles.motion]: isMotion })}
        bordered
        scroll={{ x: 1250 }}
        columns={columns}
        simple
        rowKey={record => record.id}
        getBodyWrapper={getBodyWrapper}
      />
    </div>
  )
}

List.propTypes = {
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List
