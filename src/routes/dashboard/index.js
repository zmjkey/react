import React from 'react'
import PropTypes from 'prop-types'
import { colorList, iconList} from "../../utils/theme";
import { connect } from 'dva'
import { Row, Col, Card } from 'antd'
import { Loader } from 'components'
import { NumberCard, Sales, Browser } from './components'
import styles from './index.less'

const bodyStyle = {
  bodyStyle: {
    height: 432,
    background: '#fff',
  },
}

function Dashboard ({ dashboard, loading }) {
  const { numData, dayData } = dashboard
  var tempColor
  var tempIcon
  for (var i = 1; i <= numData.length; i++) {
    if (i % 2 !== 0) {
      const random1 = Math.floor(Math.random() * colorList.length)
      const random2 = Math.floor(Math.random() * iconList.length)
      tempColor = colorList[random1]
      tempIcon = iconList[random2]
    }
    var itemr = numData[i - 1]
    itemr.icon = tempIcon
    itemr.color = tempColor
  }
  const numberCards = numData.map((item, key) => (<Col key={key} lg={8} md={12}>
    <NumberCard {...item} />
  </Col>))

  return (
    <div>
      <Loader spinning={loading.models.dashboard} />
      <Row gutter={24}>
        {numberCards}
        <Col lg={18} md={24}>
          <Card bordered={false}
                bodyStyle={{
                  padding: '24px 36px 24px 0',
                }}
          >
            <Sales data={dayData} />
          </Card>
        </Col>
        <Col lg={6} md={24}>
          <Row gutter={24}>
            <Col lg={24} md={12}>
              <Card bordered={false} {...bodyStyle}>
                <Browser data={numData} />
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

Dashboard.propTypes = {
  dashboard: PropTypes.object,
  loading: PropTypes.object,
}

export default connect(({ dashboard, loading }) => ({ dashboard, loading }))(Dashboard)
