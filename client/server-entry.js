import React from 'react'
import { StaticRouter } from 'react-router-dom'
import { Provider, useStaticRendering } from 'mobx-react'
import AppServer from './views/AppServer'
import { createStoreMap } from './store/store'

// 让mobx在服务端渲染的时候不会重复数据变换

useStaticRendering(true)

export default (stores, routerContext, url) => (
  <Provider {...stores}>
    <StaticRouter context={routerContext} location={url}>
      <AppServer />
    </StaticRouter>
  </Provider>
)

export { createStoreMap }
