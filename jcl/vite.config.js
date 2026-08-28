import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// App independiente de JCL Pantalones. Se sirve bajo /jcl-pantalones/ dentro
// del deploy de Estudio Flores, así que el build sale directo a la carpeta
// public de ese proyecto. Para actualizar el sitio de JCL: editar acá,
// `npm run build`, y commitear tanto jcl/ como web/public/jcl-pantalones/.
export default defineConfig({
  base: '/jcl-pantalones/',
  plugins: [react()],
  build: {
    outDir: '../web/public/jcl-pantalones',
    emptyOutDir: true,
    assetsDir: 'assets',
  },
});
