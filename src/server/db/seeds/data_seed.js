const fs = require('fs');

const format = str => str ? str.trim() : '';

exports.seed = (knex, Promise) => {
  const data = fs.readFileSync(__dirname + '/data.txt', 'utf-8');
  const dataArr = data.split('\n').slice(1);

  const sitters = {};
  const owners = {};
  const owners_sitters = [];

  dataArr.forEach(item => {
    const fields = item.split(',');
    const objData = {
      owner_email: format(fields[12]),
      owner_phone_number: format(fields[11]),
      owner_image: format(fields[4]),
      sitter_phone_number: format(fields[9]),
      sitter_email: format(fields[10]),
      sitter_image: format(fields[1]),
      sitter: format(fields[6]),
      owner: format(fields[7]),
      rating: parseFloat(format(fields[0])),
      text: format(fields[3]),
      dogs: format(fields[5]) !== '' ? format(fields[5]).split('|') : [],
      start_date: format(fields[8]) !== '' ? new Date(format(fields[8])) : null,
      end_date: format(fields[2]) ? new Date(format(fields[2])) : null
    };

    if (objData.sitter_email !== '') {
      if (sitters[objData.sitter_email]) {
        sitters[objData.sitter_email].images.push(objData.sitter_image);
      } else {
        sitters[objData.sitter_email] = {
          name: objData.sitter,
          email: objData.sitter_email,
          phone_number: objData.sitter_phone_number,
          images: [objData.sitter_image]
        };
      }
    }

    if (objData.owner_email !== '') {
      if (owners[objData.owner_email]) {
        if (objData.owner_email === 'Shelli K.') {
          console.log(objData);
        }
        owners[objData.owner_email].images.push(objData.owner_image);
      } else {
        owners[objData.owner_email] = {
          name: objData.owner,
          email: objData.owner_email,
          phone_number: objData.owner_phone_number,
          images: [objData.owner_image]
        };
      }
    }

    if (objData.sitter_email !== '' && objData.owner_email !== '') {
      owners_sitters.push({
        sitter: objData.sitter_email,
        owner: objData.owner_email,
        dogs: objData.dogs,
        text: objData.text,
        rating: objData.rating,
        start_date: objData.start_date,
        end_date: objData.end_date
      });
    }

  });

  const insertSitter = () => knex('sitters').insert(Object.keys(sitters).map(key => sitters[key]));
  const insertOwner = () => knex('owners').insert(Object.keys(owners).map(key => owners[key]));
  const insertOwnerSitter = () => knex('owners_sitters').insert(owners_sitters);

  return knex('sitters').del()
    .then(knex('owners').del())
    .then(knex('owners_sitters').del())
    .then(insertSitter)
    .then(insertOwner)
    .then(insertOwnerSitter);

};
