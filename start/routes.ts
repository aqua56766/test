import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'InviteesController.list')
Route.get('/hash/:hash', 'InviteesController.hashDetail')
Route.get('/:id', 'InviteesController.detail')
Route.post('/', 'InviteesController.create')
Route.put('/:id', 'InviteesController.edit')
Route.delete('/:id', 'InviteesController.delete')

Route.get('/check', () => {
  return 'Hello world'
})
