import { request, getToken, store, parseTime, frontToBackReceipt } from '@/api/utils'

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
  if (fcn != "sendUnpledgeRequest" && fcn != "confirmPledgeRequest")
    form.DateRequest = parseTime(new Date(), '{y}-{m}-{d}')
  req.args = [JSON.stringify(form)]
  return request({
    url: '/channels/mychannel/chaincodes/mycc/invoke',
    method: 'post',
    data: req,
    dataType: 'json'
  })
}