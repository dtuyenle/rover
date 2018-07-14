exports.up = (knex, Promise) => {

  const createSittersTable = () => {
    return knex.schema.createTable('sitters', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('email').notNullable().unique();
      table.string('phone_number');
      table.float('sitter_score');
      table.float('rating_score');
      table.float('overall_score');
      table.specificType('images', 'varchar[]');
    });
  };

  const createOwnersTable = () => {
    return knex.schema.createTable('owners', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('email').notNullable().unique();
      table.string('phone_number');
      table.specificType('images', 'varchar[]');
    });
  };

  const createSittersOwnersTable = () => {
    return knex.schema.createTable('owners_sitters', (table) => {
      table.increments('id').primary();

      table.string('sitter').references('sitters.email');
      table.string('owner').references('owners.email');

      table.specificType('dogs', 'text[]');
      table.text('text');
      table.float('rating');
      table.dateTime('start_date');
      table.dateTime('end_date');
    });
  };

  return createSittersTable()
    .then(createOwnersTable)
    .then(createSittersOwnersTable);
};

exports.down = (knex, Promise) => {
  const dropSitters = () => knex.schema.dropTable('sitters');
  const dropOwners = () => knex.schema.dropTable('owners');
  const dropOwnersSitters = () => knex.schema.dropTable('owners_sitters');

  const dropReferenceSitter = () => knex.schema.table('owners_sitters', table => {
    table.dropForeign('sitter');
  });
  const dropReferenceOwner = () => knex.schema.table('owners_sitters', table => {
    table.dropForeign('owner');
  });

  return dropReferenceSitter()
    .then(dropReferenceOwner)
    .then(dropOwnersSitters)
    .then(dropOwners)
    .then(dropSitters);
};
