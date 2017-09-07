import React from 'react'
import { routerRedux } from 'dva/router'
import PropTypes from 'prop-types'
import { Row, Col, Card } from 'antd'
import { connect } from 'dva'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import Container from './Container'
import Filter from './Filter'

const EditorPage = ({ statisticAll ,dispatch}) => {
  const { data, types } = statisticAll
  const colProps = {
    lg: 12,
    md: 24,
  }
  const SimpleBarChart = () => (
    <Container>
      <BarChart data={data.list}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Bar dataKey="ratio" fill="#82ca9d" />
      </BarChart>
    </Container>
  )

// CustomShapeBarChart
  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}
        C${x + (width / 3)},${y + height} ${x + (width / 2)},${y + (height / 3)} ${x + (width / 2)}, ${y}
        C${x + (width / 2)},${y + (height / 3)} ${x + (2 * (width / 3))},${y + height} ${x + width}, ${y + height}
        Z`
  }

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props
    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />
  }

  TriangleBar.propTypes = {
    fill: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
  }

  const CustomShapeBarChart = () => (
    <Container>
      <BarChart data={data.list}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar dataKey="count" fill="#8884d8" shape={<TriangleBar />} label />
      </BarChart>
    </Container>
  )

  const filterProps = {
    types: types,
    filter: {
      ...location.query,
    },
    onFilterChange (value) {
      dispatch(routerRedux.push({
        pathname: '/statistics/'+ value.time,
      }))
    },
    onSearch (fieldsValue) {
      fieldsValue.time.length ? dispatch(routerRedux.push({
        pathname: '/statistics:time',
        query: {
          field: fieldsValue.field,
          time: fieldsValue.time,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/statisticAll',
      }))
    }
  }

  return (
    <div className="content-inner">
      <Filter {...filterProps} />
      <Row gutter={32}>
        <Col {...colProps}>
          <Card title="推送数据">
            <CustomShapeBarChart />
          </Card>
        </Col>
        <Col {...colProps}>
          <Card title="推送转化率分析">
            <SimpleBarChart />
          </Card>
        </Col>
      </Row>
    </div>)
}

EditorPage.propTypes = {
  statisticAll: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ statisticAll, loading }) => ({ statisticAll, loading: loading.models.statisticAll }))(EditorPage)
