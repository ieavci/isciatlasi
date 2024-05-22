// Verilerinizin yüklenmesi
d3.csv("temel_isgucu.csv").then(function (data) {

    // Verileri formatlama
    data.forEach(function (d) {
        d.yıl = parseInt(d["Yillar"]); // Yıl sütununu sayıya dönüştürün
        d["15 ve daha yukarı yastaki nüfus"] = parseInt(d["15 ve daha yukarı yastaki nufus"]);
        d["isgucu"] = parseInt(d["isgucu"]);
        d["istihdam"] = parseInt(d["istihdam"]);
        d["issiz"] = parseInt(d["issiz"]);
        d["isgucune dahil olmayanlar"] = parseInt(d["isgucune dahil olmayanlar"]);
    });

    // Düğümler (Yıllar)
    const nodes = data.map(function (d) {
        return { id: d.yıl };
    });

    // Kenarlar (Yıl ve Göstergeler Arasındaki Bağlantılar)
    const links = data.map(function (d) {
        return {
            source: nodes.findIndex(n => n.id === d.yıl),
            target: {
                id: d["15 ve daha yukarı yastaki nüfus"],
                type: "Nüfus",
                value: d["15 ve daha yukarı yastaki nüfus"]
            }
        };
    }).concat(
        data.map(function (d) {
            return {
                source: nodes.findIndex(n => n.id === d.yıl),
                target: {
                    id: d["isgucu"],
                    type: "İşgücü",
                    value: d["isgucu"]
                }
            };
        }).concat(
            data.map(function (d) {
                return {
                    source: nodes.findIndex(n => n.id === d.yıl),
                    target: {
                        id: d["istihdam"],
                        type: "İstihdam",
                        value: d["istihdam"]
                    }
                };
            }).concat(
                data.map(function (d) {
                    return {
                        source: nodes.findIndex(n => n.id === d.yıl),
                        target: {
                            id: d["issiz"],
                            type: "İşsizlik",
                            value: d["issiz"]
                        }
                    };
                }).concat(
                    data.map(function (d) {
                        return {
                            source: nodes.findIndex(n => n.id === d.yıl),
                            target: {
                                id: d["isgucune dahil olmayanlar"],
                                type: "İşgücüne Dahil Olmayanlar",
                                value: d["isgucune dahil olmayanlar"]
                            }
                        };
                    })
                )
            )
        ));

    // Grafik oluşturma
    const width = 800;
    const height = 600;

    const svg = d3.select("#graph")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    const force = d3.layout.force()
        .gravity(.05)  // Düğümleri birbirine çeken kuvvet
        .distance(100)  // Düğümler arasındaki minimum mesafe
        .charge(-200)  // Düğümleri birbirinden iten kuvvet
        .nodes(nodes)
        .links(links)
        .on("tick", tick);

    // Düğümleri çizme
    const node = svg.selectAll(".node")
        .data(nodes)
        .enter()
        .append("circle")
        .attr("class", "node")
        .attr("r", 5)
        .attr("fill", "blue")
        .call(d3.drag()
            .on("drag", dragged));

    // Düğüm etiketleri
    const nodeLabel = svg.selectAll(".node-label")
        .data(nodes)
        .enter()
        .append("text")
        .attr("class", "node-label")
        .attr("dx", 10)
        .attr("dy", -5)
        .text(function (d) { return d.yıl; });

    // Kenarları çizme
    const link = svg.selectAll(".link")
        .data(links)
        .enter()
        .append("line")
        .attr("class", "link")
        .style("stroke", "gray")
        .style("stroke-width", 1);

    // Kenar etiketleri (Gösterge Türü ve Değer)
    const linkLabel = svg.selectAll(".link-label")
        .data(links)
        .enter()
        .append("text")
        .attr("class", "link-label")
        .attr("dx", 10)
        .attr("dy", 5)
        .text(function (d) {
            return d.target.type + ": " + d.target.value;
        });

    // Simülasyon fonksiyonu
    function tick() {
        node.attr("cx", function (d) { return d.x; });
        node.attr("cy", function (d) { return d.y; });
        link
            .attr("x1", function (d) { return nodes[d.source].x; })
            .attr("y1", function (d) { return nodes[d.source].y; })
            .attr("x2", function (d) { return d.target.x; })
            .attr("y2", function (d) { return d.target.y; });
        nodeLabel
            .attr("x", function (d) { return d.x; })
            .attr("y", function (d) { return d.y; });
        linkLabel
            .attr("x", function (d) {
                return (nodes[d.source].x + d.target.x) / 2;
            })
            .attr("y", function (d) {
                return (nodes[d.source].y + d.target.y) / 2;
            });
    }

    // Düğüm sürükleme fonksiyonu
    function dragged(event) {
        const d = d3.select(this).datum();
        d.x = event.x;
        d.y = event.y;
        simulation.alpha(1).restart();
    }

});
