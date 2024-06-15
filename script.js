let search = document.getElementById("searchInput");
let sortMarketCapBtn = document.getElementById("sort-marketCap");
let sortPercentageBtn = document.getElementById("sort-percentge");

let tableData = document.getElementById("tableData");


let fetchedData = fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false")
.then(res => res.json())
.then((data) => {
    renderData(data);
    return data;
})
.catch(err => console.log("error",err));

//if we use async function


// async function fetchData() {
//     try {
//       const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   }
// let responseData;

// fetchData().then(data => {
//   responseData = data;
//   renderData(data);
// });

function renderData(data){
    tableData.innerHTML = "";
    data.forEach(item => {
        let itemSymbol = item.symbol;
        let s= itemSymbol.toUpperCase();
        let row = tableData.insertRow();
        let curentPrice =item.current_price.toLocaleString();
        let totvol =item.total_volume.toLocaleString();
        let perChange =item.price_change_percentage_24h.toFixed(2);
        let mktCap = item.market_cap.toLocaleString();

        let color = perChange >= 0 ? 'green' : 'red';

        row.innerHTML =`
        <td><img style="width:12px" src="${item.image}">${item.name}</td>
        <td>${s}</td>
        <td>$${curentPrice}</td>
        <td>$${totvol}</td>
        <td style="color:${color}">${perChange}%</td>
        <td>Mkt Cap:$${mktCap}</td>
        `
        let hrRow = tableData.insertRow();
        let hrCell = hrRow.insertCell();
        hrCell.colSpan = 6; 
        hrCell.innerHTML = "<hr>";
    })
}


sortMarketCapBtn.addEventListener("click", function sort(e){
    e.preventDefault();
    fetchedData.then(data => {
        data.sort((a, b) => a.market_cap - b.market_cap);
        renderData(data);

    })
    .catch(err => console.log("error", err));
});


sortPercentageBtn.addEventListener("click", function sort(e){
    e.preventDefault();
    fetchedData.then(data => {
        data.sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h);
        renderData(data);

    })
    .catch(err => console.log("error", err));
});


document.getElementById("searchInput").addEventListener("input", function() {
    const searchValue = this.value.toLowerCase();
    fetchedData.then(data => {
        const filteredData = data.filter(item => 
            item.name.toLowerCase().includes(searchValue) || 
            item.symbol.toLowerCase().includes(searchValue)
        );
        renderData(filteredData);
    })
    .catch(err => console.log("error", err));
});

