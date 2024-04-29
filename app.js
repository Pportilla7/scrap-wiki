const url = 'https://es.wikipedia.org/wiki/Categor%C3%ADa:M%C3%BAsicos_de_rap';

const Express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = Express();

app.get('/', (req, res) => {
    axios.get(url)
        .then((response) => {
            if (response.status === 200) {
                const html = response.data;
                
                const $ = cheerio.load(html);

                const pageTitle = $('title').text();

                const imgs=[];
                const ps=[];
                const links=[];

                $('img').each((i, el)=>{
                    const img=$(el).attr('src');
                    imgs.push(img);
                })

                $('#mw-pages a').each((index, element)=>{
                    const link = $(element).attr('href');
                    links.push(link);
                })
                console.log(links)

                $('p').each((i, el)=>{
                    const p=$(el).text();
                    ps.push(p);
                })

                ps.forEach(el => console.log(el))

                res.send(`<h1>${pageTitle}</h1>
                <p>${ps[1]}</p>
                <ul>
                    ${links.map(link => `<li><a href="https://es.wikipedia.org${link}">${link}<a/></li>`).join('')}
                </ul>
                `);
            }
        })
});

app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000...');
});
