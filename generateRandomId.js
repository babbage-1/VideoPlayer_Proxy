const fs = require('fs');
const csvWriter = require('csv-write-stream');
const writer = csvWriter();
const faker = require('faker');


const generateId = () => {
  writer.pipe(fs.createWriteStream('id.csv'));
  for (let i = 0; i < 50; i++) {
    writer.write({
      id: faker.random.number({'min': 1,'max': 10000000})
    });
  }

  writer.end();
};

generateId();