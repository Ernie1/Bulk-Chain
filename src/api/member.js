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
  const usertype_mem = "Member"
  const requestsType_mem = "InboundRequest"
  var queryMyRequests = {}
  queryMyRequests.token = getToken()
  queryMyRequests.fcn = "queryMyRequests"
  queryMyRequests.peers = ["peer1"]
  queryMyRequests.args = [mid, usertype_mem, requestsType_mem]
  console.log(queryMyRequests)
  return request({
    url: '/channels/mychannel/chaincodes/mycc/query',
    method: 'post',
    data: queryMyRequests,
    dataType: 'json'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

