import request from '@/utils/request'
import { getToken } from '@/utils/auth'
import store from '@/store'
import { parseTime } from '@/utils'
import { frontToBackReceipt } from '@/utils/conversion'

export { request, getToken, store, parseTime, frontToBackReceipt }

export function queryTable(usertype, requestsType, fcn) {
    var query = {}
    query.token = getToken()
    query.fcn = fcn
    query.peers = ["peer1"]
    query.args = [store.getters.id, usertype, requestsType]
    return request({
        url: '/channels/mychannel/chaincodes/mycc/query',
        method: 'post',
        data: query,
        dataType: 'json'
    })
}