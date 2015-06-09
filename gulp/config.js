var dest = "./dist";
var src = './source';
var tmp = './tmp';

module.exports = {
  browserSync: {
    server: {
      baseDir: dest,
      port: 8080
    },
    open: false
  },
  sass: {
    srcImport: src + "/css/import.scss",
    src: src + "/css/**/*.{css,scss,sass}",
    dest: dest + "/css",
    renamedFile: 'main.css',
    settings: {
      indentedSyntax: true, // Enable .scss syntax!
      imagePath: 'images' // Used by the image-url helper
    }
  },
  vendorstyles: {
    src: './node_modules/normalize.css/normalize.css',
    dest: dest + '/css'
  },
  javascript: {
    src: src + "/js/**.js",
    dist: dest + "/js"
  },
  images: {
    src: src + "/images/**/**.*",
    dest: dest + "/images"
  },
  html: {
    src: src + "/**.html",
    dest: dest
  },
  iconFonts: {
    name: 'Jalo Icons',
    src: src + '/icons/*.svg',
    dest: src + '/fonts',
    sassPath: '../css/_icons.scss',
    template: 'gulp/tasks/iconFont/template.scss',
    fontPath: '../fonts',
    className: 'ja-icon',
    copysrc: src + '/fonts/**',
    copydest: dest + '/fonts',
    options: {
      fontName: 'jalo-icons',
      appendCodepoints: true,
      normalize: false
    }
  },
  production: {
    cssSrc: dest + '/css/*.css',
    cssDest: dest + '/css',
    jsSrc: dest + '/js/*.js',
    jsDest: dest + '/js',
    dest: dest
  }
};