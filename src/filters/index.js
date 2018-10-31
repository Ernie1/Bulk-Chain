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

export function MatchState2ColorFilter(status) {
  const statusMap = {
    Matching: "primary",
    Matched: "success",
    Unmatched: "info"
  };
  return statusMap[status] || "danger";
}

export function appStatus2CHFilter(status) {
  const statusMap = {
    Checking: "审核中",
    Resolved: "审核通过",
    Rejected: "审核失败",
    Finished: "已完成"
  };
  return statusMap[status] || status;
}

export function inboundAppStatus2CHFilter(status) {
  const statusMap = {
    Checking: "审核中",
    Resolved: "审核通过",
    Rejected: "审核失败",
    Finished: "生成仓单"
  };
  return statusMap[status] || status;
}

export function MatchState2CHFilter(status) {
  const statusMap = {
    Matching: "未匹配",
    Matched: "已匹配",
    Unmatched: "匹配失败"
  };
  return statusMap[status] || status;
}

export function CheckState2CHFilter(status) {
  const statusMap = {
    Resolved: "审核通过",
    Rejected: "审核拒绝",
    Finished: "登记完成"
  };
  return statusMap[status] || status;
}

export function TxType2CHFilter(status) {
  const statusMap = {
    InboundRequest: "入库",
    OutboundRequest: "出库",
    RegisterRequest: "注册",
    UnregisterRequest: "注销",
    DeliveryRequest: "交割",
    PledgeRequest: "质押",
    UnpledgeRequest: "解押"
  };
  return statusMap[status] || status;
}

export function DeliveryType2CHFilter(status) {
  const statusMap = {
    Buyer: '买入',
    Seller: '卖出'
  };
  return statusMap[status] || status;
}

export function rcptStatus2CHFilter(status) {
  const statusMap = {
    Inbound: "入库完成",
    Flowable: "可流转",
    Pledged: "已质押",
    Outbounded: "已出库",
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
    InboundRequest: '入库',
    RegisterRequest: '注册',
    RequestDetails: '申请',
    DeliveryRequest: '交割',
    PledgeRequest: '质押',
    UnpledgeRequest: '解押',
    UnregisterRequest: '注销',
    OutboundRequest: '出库'
  };
  return statusMap[status] || status;
}