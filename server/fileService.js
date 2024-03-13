const uuid = require("uuid");
const path = require("path");

class FileService {
    SaveFile(file) {
      try {
        if (file && file.mv) {
          const filename = uuid.v4() + ".jpg";
          const filePath = path.resolve("static", filename);
          file.mv(filePath);
          return filename;
        } else {
          throw new Error("Invalid file object");
        }
      } catch (e) {
        console.log(e);
        throw e;
      }
    }
  }
  
module.exports = new FileService;
