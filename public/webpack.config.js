import path from "path";
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
    mode: 'development',
    entry: './src/game_client/game.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname,'dist')
    },
      resolve: {
        alias: {
          config$: './configs/app-config.js',
          react: './vendor/react-master',
        },
        extensions: ['', 'js', 'jsx'],
        modules: [
          'node_modules'
        ],
      },
}

export default config;