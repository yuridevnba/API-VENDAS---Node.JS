import path from 'path'; //biblioteca para trabalhar com definições de caminhos, para armazenar/encontrar arquivos etc.
import multer from 'multer';
import crypto from 'crypto';

const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads'); //caminho para encontrar um dirétorio ou um arquivo é separar com vírgula o endereço
//variável global que é a dirname que vai pegar referência do local atual do arquivo que ela está sendo chamada.
// conseguiu pegar o path do local que quer armazenar as imagens.
//'..','..' volta dois níveis até chegar na pasta upload, desta forma conseguiu pegar o path do local que queremos armazenar as imagens.
export default {
  directory: uploadFolder,
  storage: multer.diskStorage({
    // armazenar em um disco de um servidor,diskstorage,memomystorage,
    destination: uploadFolder,
    filename(request, file, callback) {
      // definir de que forma vai compor o nome do arquivo., o arquivo chega com o nome dele e para salvar no servidor vai ser mudado para garantir que arquivos não tenha nomes reptidos.
      const fileHash = crypto.randomBytes(10).toString('hex'); //crypto cria um hash, é uma biblioteca nativa do nodejs.

      const filename = `${fileHash}-${file.originalname}`;

      callback(null, filename); //  caso tenha,retornar um erro, executar o nome do arquivo
    },
  }),
};
