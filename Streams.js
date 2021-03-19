const fs = require('fs');
const readStream = fs.createReadStream('./docs/file.txt' );

const writeStream = fs.createWriteStream('./docs/writingFile.txt')

/* readStream.on('data' , (chunk) => {
console.log("----- NEW CHUNK -----");
console.log(chunk.toString());
writeStream.write('\n ----- NEW CHUNK ----- \n');
writeStream.write(chunk.toString());
}); */

readStream.pipe(writeStream);