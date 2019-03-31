function lotsMatrix () {
    this.attributes = {
        size: { width: 3, height:3 },
        grid: JSON.parse(localStorage.getItem("matrix")) || [
            []
        ]
    }
}