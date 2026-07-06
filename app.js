async function searchCrypto() {
  const name = document.getElementById("cryptoInput").value.trim().toLowerCase();
  if (!name) return alert("Please enter a cryptocurrency name");

  try {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/${name}`);
    if (!res.ok) throw new Error("Crypto not found");

    const data = await res.json();
    const container = document.getElementById("cryptoContainer");

    container.innerHTML = `
      <h2>${data.name} (${data.symbol.toUpperCase()})</h2>
      <img src="${data.image.small}" alt="${data.name}" />
      <p><strong>Current Price (USD):</strong> $${data.market_data.current_price.usd}</p>
      <p><strong>Market Cap:</strong> $${data.market_data.market_cap.usd.toLocaleString()}</p>
      <p><strong>24h Change:</strong> ${data.market_data.price_change_percentage_24h.toFixed(2)}%</p>
    `;
  } catch (err) {
    console.error(err);
    document.getElementById("cryptoContainer").innerHTML = "<p>Crypto not found or API error.</p>";
  }
}
