import svgSprite from "gulp-svg-sprite";
export const svgSprive = () => {
    return app.gulp.src('src/svg/*.svg')
        .pipe(svgSprite({
            mode: {
                stack: {
                    sptite: `../icons/icons.svg`,
                    //Создавать страницу с перечнем иконок
                    example: true
                }
            },
        }
        ))
    .pipe (app.gulp.dest('build/img/'));
}