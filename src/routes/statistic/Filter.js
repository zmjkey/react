import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem } from 'components'
import { Form, Button, Row, Col, Select, Input, Cascader, Switch } from 'antd'

const Search = Input.Search

const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
}

const TwoColProps = {
  ...ColProps,
  xl: 96,
}

const Filter = ({
  types:types,
  onFilterChange,
  filter,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
  },
}) => {
  const handleFields = (fields) => {
    const { time } = fields
    if (time.length) {
      fields.time = time
    }
    return fields
  }

  const handleSubmit = () => {
    let fields = getFieldsValue()
    fields = handleFields(fields)
    onFilterChange(fields)
  }

  const handleReset = () => {
    const fields = getFieldsValue()
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = []
        } else {
          fields[item] = undefined
        }
      }
    }
    setFieldsValue(fields)
    handleSubmit()
  }

  const handleChange = (key, values) => {
    let fields = getFieldsValue()
    fields[key] = values
    fields = handleFields(fields)
    onFilterChange(fields)
  }

  const { name, time } = filter

  return (
    <Row gutter={24}>
      <Col {...ColProps} xl={{span: 4}} md={{span: 8}}>
        {getFieldDecorator('time', {initialValue: time})(
          <Select
            size="large"
            style={{width: '100%'}}
            placeholder="Please pick the time"
            onChange={handleChange.bind(null, 'time')}>
            {types.map(t=> <Select.Option value={t.value}>{t.key}</Select.Option>)}
          </Select>)}
      </Col>
      <Col {...TwoColProps} xl={{ span: 10 }} md={{ span: 24 }} sm={{ span: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <div >
            <Button type="primary" size="large" className="margin-right" onClick={handleSubmit}>Search</Button>
            <Button size="large" onClick={handleReset}>Reset</Button>
          </div>
        </div>
      </Col>
    </Row>
  )
}

Filter.propTypes = {
  value: PropTypes.number,
  types: PropTypes.array,
  switchIsMotion: PropTypes.func,
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Form.create()(Filter)
