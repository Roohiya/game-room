import Router from 'koa-router'
import { createReadStream } from 'fs'
import appRoot from 'app-root-path'

const router = Router()

router.get('/', (ctx, next) => {
  ctx.status = 200
  ctx.body = {
    response: 'I am alive!'
  }
  // ctx.type = 'html'
  // ctx.body = createReadStream(`${appRoot}/public/index.html`)
})

export default router
