import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'invitees'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.enum('sumbangan', ['ya', 'tidak']).defaultTo('tidak').notNullable()
      table.enum('from', ['adya', 'ijal']).notNullable()
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('from')
      table.dropColumn('sumbangan')
    })
  }
}
