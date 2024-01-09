const express = require("express");

const router = express.Router();

const path = require("path");
const db = require("../data/db");

class HaberObserver {
    constructor() {
        this.observers = [];
    }

    subscribe(observer) {
        this.observers.push(observer);
    }

    unsubscribe(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    notify(data) {
        this.observers.forEach(observer => observer.update(data));
    }
}

class HaberIstemci {
    update(data) {
        console.log('Yeni haberler geldi:', data);
        
    }
}

const haberObserver = new HaberObserver();
const istemci = new HaberIstemci();
haberObserver.subscribe(istemci);






router.use("/haklar", async function (req, res) {

    const [tblSosyal] = await db.execute("select * from sosyalsigortalar")
    const [tblCezai] = await db.execute("select * from cezaiyaptirim")
    const [tblIsverenhaklari] = await db.execute("SELECT m.*, k.kanunbasligi FROM isverenkanunlarimaddeleri m JOIN isverenkanunlari k ON m.kanun_id = k.kanun_id ")
    const [tblIscihaklari] = await db.execute("select * from iscikanunlari")
    const [tblIscihaklariMaddeleri] = await db.execute("SELECT m.*, k.kanunbasligi FROM iscikanunlarimaddeleri m JOIN iscikanunlari k ON m.kanun_id = k.kanun_id where m.kanun_id=1 ")


    try {
        res.render("isci-ve-isveren/isci-ve-isveren.ejs", {
            sosyal: tblSosyal[0],
            cezai: tblCezai[0],
            isveren: tblIsverenhaklari,
            isci: tblIscihaklari,
            isciKanunlari: tblIscihaklariMaddeleri,
        });

    } catch (error) {
        console.log(error)
    }
});
router.use("/sigortasiz", async function (req, res) {
    const [tblIller] = await db.execute("select * from iller order by sehiradi")

    try {
        res.render("sigortasiz_isci/sigortasiz-isci.ejs", {
            iller: tblIller,
        });

    } catch (error) {
        console.log(error)
    }

});
router.use("/sendikalar", async function (req, res) {
    const [tblDisk] = await db.execute("select * from `isciatlasi`.`disk sendika`");
    const [tblSendikaKonfederasyonlar] = await db.execute("select * from `isciatlasi`.`sendikakonfederasyonlar`");
    try {
        res.render("sendikalar/sendikalar.ejs", {
            disk: tblDisk,
            sendikaKonfederasyonlar: tblSendikaKonfederasyonlar,
        });

    } catch (error) {
        console.log(error)
    }

});
router.use("/haberler/:id", async function (req, res) {
    const id = req.params.id;


    try {
        const [haber,] = await db.query("select * from haberler where id=?", [id])

        if (haber[0]) {
            res.render("haberler/haber-detail", {

                haber: haber[0]
            });
        } else {
            res.redirect("/")
        }


    } catch (error) {
        console.log(error)
    }


});

router.get("/haberler", async function (req, res) {
    // Haberlerin alınması işlemleri
    try {
        const [haberler] = await db.execute("SELECT * FROM haberler ORDER BY id DESC LIMIT 3");
        haberObserver.notify(haberler);
        res.render("haberler/haberler.ejs", {
            haberler: haberler
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

router.post('/getVeri', async function (req, res) {
    const { ilAdi } = req.body;

    try {
        const [veri] = await db.execute('SELECT * FROM sehirleregoreistihdam WHERE il = ?', [ilAdi]);
        const [veriSayi] = await db.execute('SELECT * FROM sehirleregoreistihdamsayilari WHERE il = ?', [ilAdi]);

        const combinedData = {
            istihdam: veri,
            istihdamSayilari: veriSayi
        };

        const veriTemizle = (veri) => {
            for (const key in veri) {
                if (veri.hasOwnProperty(key)) {
                    for (const prop in veri[key]) {
                        if (veri[key].hasOwnProperty(prop)) {
                            if (typeof veri[key][prop] === 'string') {
                                // Boşlukları ve virgülleri temizle
                                veri[key][prop] = veri[key][prop].replace(/\s/g, '').replace(/,/g, '.');
                            }
                        }
                    }
                }
            }
        };

        // Boşlukları ve virgülleri temizlenmiş veri
        veriTemizle(combinedData.istihdam);
        veriTemizle(combinedData.istihdamSayilari);

        res.json(combinedData);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Veri alınamadı.' });
    }
});



////////////////////////////////////////////////////////////////////////////////////

async function getDataFromTable(tableName) {
    try {
        const [data] = await db.execute(`SELECT * from ${tableName}`);
        return data;
    } catch (error) {
        throw new Error(`Veri alınırken hata oluştu: ${error}`);
    }
}

function prepareChartData(data, label, backgroundColor) {
    const labels = data.map(item => item.Yillar);
    const values = Object.keys(data[0]).filter(key => key !== 'Yillar').map(key => ({
        label: key,
        data: data.map(item => parseFloat(item[key].replace(',', '.').replace(" ", ""))),
        backgroundColor: backgroundColor[key],
        // İhtiyaca göre diğer özellikler eklenebilir
    }));

    return {
        labels: labels,
        datasets: values,
    };
}

function prepareChartData2(data) {
    const labels = data.map(item => item.bolge);
    const datasets = Object.keys(data[0])
        .filter(key => key !== 'bolge')
        .map(key => {
            const dataPoints = data.map(item => parseFloat(item[key].replace(',', '.').replace(" ", "")));
            return {
                label: key,
                data: dataPoints,
                // Diğer özellikler eklenebilir
            };
        });

    return {
        labels: labels,
        datasets: datasets,
    };
}
function prepareChartData3(data, label) {
    const labels = data.map(item => item.Yillar);
    const values = Object.keys(data[0]).filter(key => key !== 'Yillar').map(key => ({
        label: key,
        data: data.map(item => {
            const value = item[key].replace(',', '.').replace(" ", "");
            return !isNaN(value) ? parseFloat(value) : null;
        }),
        // İhtiyaca göre diğer özellikler eklenebilir
    }));

    return {
        labels: labels,
        datasets: values,
    };
}





router.use("/", async function (req, res) {
    try {
        const sgietopyuzData = await getDataFromTable('sgietopyuz');
        const sgietoperkekData = await getDataFromTable('sgieerkekbin');
        const sgietopkadinData = await getDataFromTable('sgiekadinyuz');


        const [haberler] = await db.execute("SELECT * FROM haberler ORDER BY id DESC LIMIT 3");

        //deneme
        const temel15yiltoplamData = await getDataFromTable('temel15yiltoplam');
        const temel15yilerkekData = await getDataFromTable('temel15yilerkek');
        const temel15yilkadinData = await getDataFromTable('temel15yilkadindata');
        const bolgeleregoreistihdam2022yuzdeleriData = await getDataFromTable('bolgeleregoreistihdam2022yuzdeleri')


        const backgroundColor = {
            Tarim: '#bafa7b',
            Sanayi: '#3303a9',
            Insaat: '#ffb6c1',
            İnsaat: '#ffb6c1',
            Hizmetler: '#be4d4d',
        };
        const backgroundtemel15yiltoplam = {
            nufus: '#bafa7b',
            isgucu: '#3303a9',
            istihdam: '#ff0000',
            issiz: '#00ff00',
            dahilOlmayanlar: '#0000ff',
            isgucuneKatilim: '#ffff00',
            istihdamOrani: '#00ffff',
            issizlikOrani: '#ff00ff',

        };

        const chartDataTarim = prepareChartData(sgietopyuzData, 'Tarim', backgroundColor);
        const chartDataSanayi = prepareChartData(sgietopyuzData, 'Sanayi', backgroundColor);

        //deneme
        const chartDatatemel15yiltoplam = prepareChartData(temel15yiltoplamData, 'nufus', backgroundtemel15yiltoplam);
        const charttemel15yilerkekData = prepareChartData3(temel15yilerkekData, 'nufus');
        const charttemel15yilkadinData = prepareChartData3(temel15yilkadinData, 'nufus');
        const chartBolgeleregoreistihdam2022yuzdeleri = prepareChartData2(bolgeleregoreistihdam2022yuzdeleriData)

        const chartSgietoperkekData = prepareChartData(sgietoperkekData, 'Tarim', backgroundColor)
        const chartSgietopkadinData = prepareChartData(sgietopkadinData, 'Tarim', backgroundColor)


        // Diğer veri türleri için aynı işlemi yapabilirsiniz


        res.render("anasayfa/index", {
            chartDataTarim: JSON.stringify(chartDataTarim),
            chartDataSanayi: JSON.stringify(chartDataSanayi),
            //deneme
            chartDatatemel15yiltoplam: JSON.stringify(chartDatatemel15yiltoplam),
            charttemel15yilerkekData: JSON.stringify(charttemel15yilerkekData),
            charttemel15yilkadinData: JSON.stringify(charttemel15yilkadinData),
            chartBolgeleregoreistihdam2022yuzdeleri: JSON.stringify(chartBolgeleregoreistihdam2022yuzdeleri),
            chartSgietoperkekData: JSON.stringify(chartSgietoperkekData),
            chartSgietopkadinData: JSON.stringify(chartSgietopkadinData),

            haberler: haberler
        });

    } catch (error) {
        console.log(error);
    }
});



module.exports = router;
