import request from '@/utils/request'
import { getToken } from '@/utils/auth'
import store from '@/store'
import { parseTime } from '@/utils'
import { frontToBackReceipt } from '@/utils/conversion'

export function requestInbound(ruleForm) {
  var InboundRequest = frontToBackReceipt(ruleForm)
  Object.assign(InboundRequest, {
    TxType: "InboundRequest",
    MemberId: store.getters.id,
    MemberName: store.getters.name,
    DateRequest: parseTime(new Date(), '{y}-{m}-{d}')
  })
  const sendInboundRequest = {
    token: getToken(),
    peers: ["peer1"],
    fcn: "sendInboundRequest",
    args: [JSON.stringify(InboundRequest)]
  }
  return request({
    url: '/channels/mychannel/chaincodes/mycc/invoke',
    method: 'post',
    data: sendInboundRequest,
    token: getToken()
  })
}

export function queryRequests() {
  const mid = store.getters.id
  const usertype = "Member"
  const requestsType = "InboundRequest"
  var queryMyRequests = {}
  queryMyRequests.token = getToken()
  queryMyRequests.fcn = "queryMyRequests"
  queryMyRequests.peers = ["peer1"]
  queryMyRequests.args = [mid, usertype, requestsType]
  return request({
    url: '/channels/mychannel/chaincodes/mycc/query',
    method: 'post',
    data: queryMyRequests,
    dataType: 'json'
  })
}

export function queryMyWarehouseReceipts() {
  const mid = store.getters.id
  const usertype = "Member"
  const requestsType = "*"
  var query = {}
  query.token = getToken()
  query.fcn = "queryMyWarehouseReceipts"
  query.peers = ["peer1"]
  query.args = [mid, usertype, requestsType]
  return request({
    url: '/channels/mychannel/chaincodes/mycc/query',
    method: 'post',
    data: query,
    dataType: 'json'
  })
}

export function queryWarehouseReceiptTransactionHistory(seriesId) {
  var query = {}
  query.token = getToken()
  query.fcn = "queryWarehouseReceiptTransactionHistory"
  query.peers = ["peer1"]
  query.args = [seriesId]
  return request({
    url: '/channels/mychannel/chaincodes/mycc/query',
    method: 'post',
    data: query,
    dataType: 'json'
  })
}

export function memberRequest(fcn, form) {
  var req = {}
  req.token = getToken()
  req.fcn = fcn
  req.peers = ["peer1"]
  form.MemberId = store.getters.id
  form.MemberName = store.getters.name
  form.DateRequest = parseTime(new Date(), '{y}-{m}-{d}')
  req.args = [JSON.stringify(form)]
  return request({
    url: '/channels/mychannel/chaincodes/mycc/invoke',
    method: 'post',
    data: req,
    dataType: 'json'
  })
}