/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex('todos').del()
  await knex('todos').insert([
    { id: 1, task: 'Find rainbow', priority: 7, completed: false },
    { id: 2, task: 'Eat strawberries', priority: 1, completed: false },
    { id: 3, task: 'Set explosives', priority: 4, completed: false },
    { id: 4, task: 'Have coffee', priority: 2, completed: true },
  ])
}
