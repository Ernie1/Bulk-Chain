import { request, getToken } from '@/api/utils'
import { parseTime } from './utils';

export function storageRequest(fcn, form) {
    var req = {}
    req.token = getToken()
    req.fcn = fcn
    req.peers = ["peer1"]
    req.args = [JSON.stringify(form)]
    if (fcn == "registerInbound")
        req.args.push(form.Signer, form.SignPlace, form.SignDate, form.StartDate, form.EndDate, form.Address, form.Location)
    else if (fcn == "matchDeliveryRequest")
        req.args = [parseTime(new Date(), '{y}-{m}-{d}')]
    return request({
        url: '/channels/mychannel/chaincodes/mycc/invoke',
        method: 'post',
        data: req,
        dataType: 'json'
    })
}