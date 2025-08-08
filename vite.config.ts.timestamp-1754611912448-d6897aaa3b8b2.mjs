// vite.config.ts
import { defineConfig } from "file:///C:/Users/quent/Documents/GitHub/atari643.github.io/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/quent/Documents/GitHub/atari643.github.io/node_modules/@vitejs/plugin-react/dist/index.js";
import { viteStaticCopy } from "file:///C:/Users/quent/Documents/GitHub/atari643.github.io/node_modules/vite-plugin-static-copy/dist/index.js";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        { src: "images", dest: "" },
        { src: "pdf", dest: "" },
        { src: "icofont", dest: "" },
        { src: "Video", dest: "" },
        { src: "react.production.min.js", dest: "" },
        { src: "react-dom.production.min.js", dest: "" },
        { src: "babel.min.js", dest: "" }
      ]
    })
  ],
  build: {
    outDir: "dist",
    emptyOutDir: true
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxxdWVudFxcXFxEb2N1bWVudHNcXFxcR2l0SHViXFxcXGF0YXJpNjQzLmdpdGh1Yi5pb1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxccXVlbnRcXFxcRG9jdW1lbnRzXFxcXEdpdEh1YlxcXFxhdGFyaTY0My5naXRodWIuaW9cXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL3F1ZW50L0RvY3VtZW50cy9HaXRIdWIvYXRhcmk2NDMuZ2l0aHViLmlvL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xyXG5pbXBvcnQgeyB2aXRlU3RhdGljQ29weSB9IGZyb20gJ3ZpdGUtcGx1Z2luLXN0YXRpYy1jb3B5J1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuXHRwbHVnaW5zOiBbXHJcblx0XHRyZWFjdCgpLFxyXG5cdFx0dml0ZVN0YXRpY0NvcHkoe1xyXG5cdFx0XHR0YXJnZXRzOiBbXHJcblx0XHRcdFx0eyBzcmM6ICdpbWFnZXMnLCBkZXN0OiAnJyB9LFxyXG5cdFx0XHRcdHsgc3JjOiAncGRmJywgZGVzdDogJycgfSxcclxuXHRcdFx0XHR7IHNyYzogJ2ljb2ZvbnQnLCBkZXN0OiAnJyB9LFxyXG5cdFx0XHRcdHsgc3JjOiAnVmlkZW8nLCBkZXN0OiAnJyB9LFxyXG5cdFx0XHRcdHsgc3JjOiAncmVhY3QucHJvZHVjdGlvbi5taW4uanMnLCBkZXN0OiAnJyB9LFxyXG5cdFx0XHRcdHsgc3JjOiAncmVhY3QtZG9tLnByb2R1Y3Rpb24ubWluLmpzJywgZGVzdDogJycgfSxcclxuXHRcdFx0XHR7IHNyYzogJ2JhYmVsLm1pbi5qcycsIGRlc3Q6ICcnIH1cclxuXHRcdFx0XVxyXG5cdFx0fSlcclxuXHRdLFxyXG5cdGJ1aWxkOiB7XHJcblx0XHRvdXREaXI6ICdkaXN0JyxcclxuXHRcdGVtcHR5T3V0RGlyOiB0cnVlXHJcblx0fVxyXG59KVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQW9WLFNBQVMsb0JBQW9CO0FBQ2pYLE9BQU8sV0FBVztBQUNsQixTQUFTLHNCQUFzQjtBQUUvQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMzQixTQUFTO0FBQUEsSUFDUixNQUFNO0FBQUEsSUFDTixlQUFlO0FBQUEsTUFDZCxTQUFTO0FBQUEsUUFDUixFQUFFLEtBQUssVUFBVSxNQUFNLEdBQUc7QUFBQSxRQUMxQixFQUFFLEtBQUssT0FBTyxNQUFNLEdBQUc7QUFBQSxRQUN2QixFQUFFLEtBQUssV0FBVyxNQUFNLEdBQUc7QUFBQSxRQUMzQixFQUFFLEtBQUssU0FBUyxNQUFNLEdBQUc7QUFBQSxRQUN6QixFQUFFLEtBQUssMkJBQTJCLE1BQU0sR0FBRztBQUFBLFFBQzNDLEVBQUUsS0FBSywrQkFBK0IsTUFBTSxHQUFHO0FBQUEsUUFDL0MsRUFBRSxLQUFLLGdCQUFnQixNQUFNLEdBQUc7QUFBQSxNQUNqQztBQUFBLElBQ0QsQ0FBQztBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNOLFFBQVE7QUFBQSxJQUNSLGFBQWE7QUFBQSxFQUNkO0FBQ0QsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
