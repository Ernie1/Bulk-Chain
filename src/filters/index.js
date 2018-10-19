// set function parseTime,formatTime to filter
export { parseTime, formatTime } from '@/utils'

function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

/* 数字 格式化*/
export function numberFormatter(num, digits) {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

export function toThousandslsFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

export function appStatus2ColorFilter(status) {
  const statusMap = {
    Checking: "primary",
    Resolved: "warning",
    Rejected: "danger",
    Finished: "success"
  };
  return statusMap[status] || "success";
}

export function appStatus2CHFilter(status) {
  const statusMap = {
    Checking: "审核中",
    Resolved: "货物待入库",
    Rejected: "审核失败",
    Finished: "生成仓单"
  };
  return statusMap[status] || status;
}

export function rcptStatus2CHFilter(status) {
  const statusMap = {
    Inbound: "入库完成",
    Flowable: "可流转",
    Pledged: "已质押",
    Outbound: "已出库",
    Outbounding: "出库审核中",
    Registering: "注册审核中",
    Pledging: "质押审核中",
    Unpledging: "解押审核中",
    Unregistering: "注销审核中",
    Deliverying: "交割审核中"
  };
  return statusMap[status] || status;
}

export function reqType2CHFilter(status) {
  const statusMap = {
    InboundRequest: '入库申请',
    RegisterRequest: '注册申请',
    RequestDetails: '申请详情',
    DeliveryRequest: '交割申请',
    PledgeRequest: '质押申请',
    UnpledgeRequest: '解押申请',
    CancellationRequest: '注销申请',
    OutboundRequest: '出库申请'
  };
  return statusMap[status] || status;
}