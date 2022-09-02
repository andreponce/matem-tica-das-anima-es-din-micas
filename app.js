const express = require('express');
const browsersync = require('browser-sync').create();
const { existsSync, readdirSync } = require('fs')

const app = express();

const publicDir = 'public';
const examplesDir = 'exemplos';

app.set('view engine', 'ejs');
app.set('views', `./${publicDir}`);

const getDirectories = source =>
    readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

app.use('/', express.static(`${__dirname}/${publicDir}`));

app.get('/', (req, res) => {
    res.render('index',{classes: getDirectories(`${publicDir}/${examplesDir}`)});
});

app.get('/:class/:static*?', (req, res, next) => {
    let className = req.params.class;
    let static = req.params.static;
    if (!static && existsSync(`${__dirname}/${publicDir}/${examplesDir}/${className}`)) {
        let hasHTML = existsSync(`${__dirname}/${publicDir}/${examplesDir}/${className}/index.html`);
        let hasStyle = existsSync(`${__dirname}/${publicDir}/${examplesDir}/${className}/style.css`);
        let stylePath = hasStyle ? `./${className}/style.css` : null;
        res.render(`${examplesDir}/template`,{title:`${className}`, className:className, stylePath:stylePath, hasHTML:hasHTML});
    }else if(static){
        res.sendFile(`${__dirname}/${publicDir}/${examplesDir}${unescape(req.path)}`);
    }
});

app.listen(3000, function (a) {
    let config = {
        watchEvents: ["add", "change", 'unlink'],
        logConnections: true,
        files: `${publicDir}`,
        logLevel: "info",
        notify: true,
        port: 3000,
        proxy: "localhost:3000"

    };
    browsersync.init(config)
});