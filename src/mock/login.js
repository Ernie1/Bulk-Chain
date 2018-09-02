import { param2Obj } from '@/utils'

const userMap = {
  admin: {
    roles: ['admin'],
    token: 'admin',
    introduction: 'Super Admin',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  editor: {
    roles: ['editor'],
    token: 'editor',
    introduction: 'Normal Editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  },
  m: {
    roles: ['member'],
    token: 'm',
    introduction: 'Member account',
    avatar: 'http://icons.iconarchive.com/icons/ariil/alphabet/256/Letter-M-icon.png',
    name: 'Member account'
  },
  e: {
    roles: ['exchange'],
    token: 'e',
    introduction: 'Exchange account',
    avatar: 'http://icons.iconarchive.com/icons/ariil/alphabet/256/Letter-E-icon.png',
    name: 'Exchange account'
  },
  s: {
    roles: ['storage'],
    token: 's',
    introduction: 'Storage account',
    avatar: 'http://icons.iconarchive.com/icons/ariil/alphabet/256/Letter-S-icon.png',
    name: 'Storage account'
  },
  b: {
    roles: ['bank'],
    token: 'b',
    introduction: 'Bank account',
    avatar: 'http://icons.iconarchive.com/icons/ariil/alphabet/256/Letter-B-icon.png',
    name: 'Bank account'
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
