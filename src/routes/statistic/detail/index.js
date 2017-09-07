import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Card } from 'antd'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import Container from '../Container'
import { connect } from 'dva'

const EditorPage = ({ statisticDetail }) => {
  const { data } = statisticDetail
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

  return (
    <div className="content-inner">

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
  statisticDetail: PropTypes.object,
}

export default connect(({ statisticDetail, loading }) => ({ statisticDetail, loading: loading.models.statisticDetail }))(EditorPage)
