import { log } from 'console';
import path from 'path'

const fullPath = path.join('/path','index.js','test.java');
// console.log('path joined: ', fullPath);
const resolvePath = path.resolve()
// console.log("we are currently workingon: ", resolvePath);

const extname = path.extname('resume.docx');

console.log('ext name: ', extname);

