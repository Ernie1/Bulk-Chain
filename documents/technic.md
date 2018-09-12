# 技术分析
## Vuex工作流程
Vuex 是为Vue.js设计的状态管理模式。它采用集中式存储Store管理应用的所有组件的状态State，Store的数据是响应式的，需要通过提交Mutations来修改State的值，Mutations会记录操作，方便调试时跟踪每一个状态的变化。

<p align="center">
  <img width="600" src="vuex.png">
</p>

组件的 methods 分发 Action，Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，支持载荷方式和对象方式进行分发，可以调用 context.commit 提交一个 Mutation，或者通过 context.state 和 context.getters 来获取 state 和 getters。Action 支持异步操作，一个 store.dispatch 可以触发多个 Action。

Mutation 必须是同步函数，因为异步执行的状态变化无法被追踪。Mutaion 函数接受 state 作为第一个参数，对State直接修改。组件也可以直接提交Mutation。

## 多用户身份
登录：当用户填写完账号和密码后向服务端验证是否正确，验证通过之后，服务端会返回一个token，拿到token之后，将这个token存贮到cookie中，保证刷新页面后能记住用户登录状态，前端会根据token再去拉取一个 user_info的接口来获取用户的详细信息（如用户权限，用户名等等信息）。

权限验证：通过token获取用户对应的 role，动态根据用户的 role 算出其对应有权限的路由，通过 router.addRoutes动态挂载这些路由。为了确保后端安全，每次向后端请求数据时都会带上token，在后端进行身份验证。

## 模拟后端数据
开发时前后端分离，为了保证开发进度，开发时前端数据都是用mockjs生成的，它拦截了所有的请求并代理到本地模拟数据，该项目使用了easy-mock，支持跨域，支持mockjs 的语法，支持Swagger。
