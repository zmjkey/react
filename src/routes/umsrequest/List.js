import React from 'react'
import PropTypes from 'prop-types'
import { Table, Button } from 'antd'
import classnames from 'classnames'
import { Link } from 'dva/router'
import AnimTableBody from '../../components/DataTable/AnimTableBody'
import styles from './List.less'

const List = ({ isMotion, location, ...tableProps }) => {

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => <Link to={`umsrequest/${record.id}`}>{text}</Link>,
    }, {
      title: '消息标题',
      dataIndex: 'title',
      key: 'title',
    }, {
      title: '消息内容',
      dataIndex: 'body',
      key: 'body',
    }, {
      title: '接收设备',
      dataIndex: 'deviceCount',
      key: 'deviceCount',
      render: text => (<span>{text == 0
        ? '单设备'
        : '群发'}</span>),
    }, {
      title: 'AppId',
      dataIndex: 'appId',
      key: 'appId',
    }, {
      title: '业务类型',
      dataIndex: 'bizType',
      key: 'bizType',
    }, {
      title: '消息通道',
      dataIndex: 'channelType',
      key: 'channelType',
    }, {
      title: '过期时间',
      dataIndex: 'expireTime',
      key: 'expireTime',
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
