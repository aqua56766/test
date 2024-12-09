import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Invitee from 'App/Models/Invitee'
import Database from '@ioc:Adonis/Lucid/Database'

export default class InviteesController {
  private makeid(length) {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    let counter = 0
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
      counter += 1
    }
    return result
  }

  public async list(ctx: HttpContextContract) {
    try {
      const from = ctx.request.qs().from

      console.log(from)

      const data = await Database.from('invitees').where((query) => {
        if (from) {
          query.where('from', from)
        }
      })

      return ctx.response.json({
        data,
      })
    } catch (error) {
      console.log(error)
      return ctx.response.json({
        error: error,
      })
    }
  }

  public async hashDetail({ request, response }: HttpContextContract) {
    const hash = request.param('hash')

    try {
      const data = await Invitee.findBy('hash', hash)

      return response.json({
        data,
      })
    } catch (error) {
      console.log(error)
      return response.json({
        error,
      })
    }
  }

  public async detail({ request, response }: HttpContextContract) {
    const id = request.param('id')

    try {
      const data = await Invitee.find(id)

      return response.json({
        data,
      })
    } catch (error) {
      console.log(error)
      return response.json({
        error,
      })
    }
  }

  public async create({ response, request }: HttpContextContract) {
    const name = request.input('name')
    const from = request.input('from')
    const sumbangan = request.input('sumbangan')

    try {
      const newPackage = new Invitee()
      newPackage.name = name
      newPackage.from = from
      newPackage.sumbangan = sumbangan
      newPackage.hash = this.makeid(5)

      const data = await newPackage.save()

      return response.status(201).json({
        data: data,
      })
    } catch (error) {
      console.log(error)

      return response.json({
        error: error,
      })
    }
  }

  public async edit({ request, response }: HttpContextContract) {
    const id = request.param('id')
    const name = request.input('name')
    const from = request.input('from')
    const sumbangan = request.input('sumbangan')

    try {
      const newData = await Invitee.find(id)

      if (newData) {
        if (name) {
          newData.name = name
        }

        if (from) {
          newData.from = from
        }

        if (sumbangan) {
          newData.sumbangan = sumbangan
        }

        const data = await newData.save()

        return response.json({
          data: data,
        })
      } else {
        return response.json({
          data: 'Data not found',
        })
      }
    } catch (error) {
      console.log(error)

      return response.json({
        error,
      })
    }
  }

  public async delete({ request, response }: HttpContextContract) {
    const id = request.param('id')

    try {
      const data = await Invitee.find(id)

      if (data) {
        await data.delete()

        return response.json({
          data: 'Data successfully deleted',
        })
      } else {
        return response.json({
          data: 'Data successfully deleted',
        })
      }
    } catch (error) {
      console.log(error)

      return response.json({
        error,
      })
    }
  }
}
