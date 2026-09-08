/**
 * @author Luuxis
 * Luuxis License v1.0 (voir fichier LICENSE pour les détails en FR/EN)
 */

const pkg = require('../package.json');
const nodeFetch = require("node-fetch");
const convert = require('xml-js');
let url = pkg.user ? `${pkg.url}/${pkg.user}` : pkg.url

let config = `${url}/config.json`;
let articles = `${url}/articles.json`;

const fallbackConfig = {
    maintenance: false,
    maintenance_message: "Le launcher Filo est en maintenance.<br>Merci de réessayer plus tard.",
    online: true,
    client_id: "13f589e1-e2fc-443e-a68a-63b0092b8eeb",
    dataDirectory: "Filo"
};

const fallbackInstances = {
    Filo: {
        name: "Filo",
        url: "",
        loader: {
            minecraft_version: "1.21.10",
            loader_type: "none",
            loader_version: "latest"
        },
        verify: false,
        ignored: ["logs", "saves", "options.txt", "resourcepacks", "shaderpacks", "screenshots"],
        whitelistActive: false,
        whitelist: [],
        game_args: ["--quickPlayMultiplayer", "filo.helloserv.net:25565"],
        status: {
            nameServer: "Filo",
            ip: "filo.helloserv.net",
            port: 25565
        }
    }
};

const fallbackArticles = [
    {
        title: "Bienvenue sur Filo",
        content: "Minecraft vanilla 1.21.10 — connexion Microsoft (compte premium) uniquement.\nServeur : filo.helloserv.net",
        author: "Filo",
        publish_date: "2026-09-08"
    }
];

class Config {
    GetConfig() {
        return new Promise((resolve) => {
            nodeFetch(config).then(async res => {
                if (res.status === 200) return resolve(res.json());
                else return resolve(fallbackConfig);
            }).catch(() => {
                return resolve(fallbackConfig);
            })
        })
    }

    async getInstanceList() {
        let urlInstance = `${url}/instances.json`
        let instances = await nodeFetch(urlInstance).then(res => res.ok ? res.json() : fallbackInstances).catch(() => fallbackInstances)
        if (!instances || typeof instances !== 'object' || Array.isArray(instances) || instances.error) {
            instances = fallbackInstances
        }
        let instancesList = []
        instances = Object.entries(instances)

        for (let [name, data] of instances) {
            let instance = data
            instancesList.push(instance)
        }
        return instancesList
    }

    async getNews(config) {
        if (config.rss) {
            return new Promise((resolve, reject) => {
                nodeFetch(config.rss).then(async config => {
                    if (config.status === 200) {
                        let news = [];
                        let response = await config.text()
                        response = (JSON.parse(convert.xml2json(response, { compact: true })))?.rss?.channel?.item;

                        if (!Array.isArray(response)) response = [response];
                        for (let item of response) {
                            news.push({
                                title: item.title._text,
                                content: item['content:encoded']._text,
                                author: item['dc:creator']._text,
                                publish_date: item.pubDate._text
                            })
                        }
                        return resolve(news);
                    }
                    else return resolve(fallbackArticles);
                }).catch(() => resolve(fallbackArticles))
            })
        } else {
            return new Promise((resolve) => {
                nodeFetch(articles).then(async res => {
                    if (res.status === 200) return resolve(res.json());
                    else return resolve(fallbackArticles);
                }).catch(() => {
                    return resolve(fallbackArticles);
                })
            })
        }
    }
}

export default new Config;
