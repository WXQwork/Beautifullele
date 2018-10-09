const gulp=require("gulp");
const server=require("gulp-webserver");
const webpack=require("webpack-stream");
const sass=require("gulp-sass");
const watch=require("gulp-watch");
const proxy=require("http-proxy-middleware");

gulp.task("packjs",()=>{
    return gulp.src("./src/scripts/*.js")
            .pipe(webpack({
                mode:"development",
                entry:{
                    app:["@babel/polyfill","./src/scripts/app.js"]
                },
                output:{
                    filename:"app.js"
                },
                module:{
                    rules:[
                       {
                        test:/\.html$/,
                        use:["string-loader"] 
                       },
                       {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        use: {
                          loader: 'babel-loader',
                          options: {
                            presets: ['@babel/preset-env'],
                            plugins: ['@babel/plugin-transform-runtime']
                          }
                        }
                      }
                    ]
                }
            }))
            .pipe(gulp.dest("./dev/scripts"))
})

gulp.task("packscss",()=>{
    return gulp.src("./src/styles/app.scss")
            .pipe(sass().on("error",sass.logError))
            .pipe(gulp.dest("./dev/styles"))
})

gulp.task("copyhtml",()=>{
    return gulp.src("./src/*.html")
            .pipe(gulp.dest("./dev/"))
})

gulp.task('copylibs', () => {
    return gulp.src('./src/libs/**/*')
      .pipe(gulp.dest('./dev/libs'))
})

gulp.task('copymock', () => {
    return gulp.src('./src/mock/**/*')
      .pipe(gulp.dest('./dev/mock'))
})

gulp.task("copyicons",()=>{
    return gulp.src("./src/iconfonts/**/*")
            .pipe(gulp.dest("./dev/iconfonts"))
})

gulp.task("server",()=>{
    return gulp.src("./dev")
            .pipe(server({
                host:"localhost",
                port:7777,
                liverelode:true,
                middleware:[
                    proxy('/api', {
                        target: 'http://localhost:3000',
                        changeOrigin: true
                    })
                    // proxy("/api",{
                    //     target:"https://m.lagou.com/",
                    //     changeOrigin:true,
                    //     pathRewrite:{
                    //         '^/api':''
                    //     }
                    // })
                ]
            }))
})

gulp.task("watch",()=>{
    gulp.watch("./src/*.html",["copyhtml"])
    watch("./src/styles/**/*",()=>{
        gulp.start(["packscss"]);
    })
    watch("./src/libs/**/*",()=>{
        gulp.start(['copylibs'])
    })
    gulp.watch("./src/scripts/**/*",["packjs"])
})

gulp.task("default",["copyhtml","packjs","copylibs","copymock","copyicons","packscss","watch","server"],()=>{
    console.log("all OK");
})