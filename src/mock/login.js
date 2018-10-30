import { param2Obj } from '@/utils'

const userMap = {
  admin: {
    roles: ['admin'],
    token: 'admin',
    introduction: 'Super Admin',
    avatar: 'http://icons.iconarchive.com/icons/ariil/alphabet/256/Letter-A-icon.png',
    name: 'Super Admin'
  },
  editor: {
    roles: ['editor'],
    token: 'editor',
    introduction: 'Normal Editor',
    avatar: 'http://icons.iconarchive.com/icons/ariil/alphabet/256/Letter-E-icon.png',
    name: 'Normal Editor'
  },
  m: {
    roles: ['member'],
    token: 'm',
    introduction: 'Member account',
    avatar: '@/img/M.png',
    name: '会员用户'
  },
  e: {
    roles: ['exchange'],
    token: 'e',
    introduction: 'Exchange account',
    avatar: '@/img/E.png',
    name: '交易所用户'
  },
  s: {
    roles: ['storage'],
    token: 's',
    introduction: 'Storage account',
    avatar: '@/img/S.png',
    name: '仓库用户'
  },
  b: {
    roles: ['bank'],
    token: 'b',
    introduction: 'Bank account',
    avatar: '@/img/B.png',
    name: '银行用户'
  }
}

export default {
  loginByUsername: config => {
    const { username } = JSON.parse(config.body)
    return userMap[username] || false
  },
  getUserInfo: config => {
    const { token } = param2Obj(config.url)
    if (userMap[token]) {
      return userMap[token]
    } else {
      return false
    }
  },
  logout: () => 'success'
}
