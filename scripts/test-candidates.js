const candidateIds = [
  // Serene florals / memory / memorial
  'photo-1518199266791-5375a83190b7', // known 200
  'photo-1490750967868-88aa4486c946', // known 200
  'photo-1507290439931-a861b5a38200', // white flowers
  'photo-1526047932273-341f2a7631f9', // white lilies/florals
  'photo-1447875569765-2b3db822bec9', // gentle flowers
  'photo-1534447677768-be436bb09401', // peaceful scenery
  'photo-1509198397868-475647b2a1e5', // serene petals

  // Books / literary / writing / journal
  'photo-1455390582262-044cdead277a', // known 200 (pen)
  'photo-1544716278-ca5e3f4abd8c', // known 200 (book)
  'photo-1476275466078-4007374efbbe', // vintage open book
  'photo-1457369804613-52c61a468e7d', // open book pages
  'photo-1512820790803-83ca734da794', // stacked books
  'photo-1497633762265-9d179a990aa6', // classic library books

  // Ceremonial coordination / elegant venue / banquet / candles
  'photo-1511795409834-ef04bbd61622', // known 200 (venue)
  'photo-1464366400600-7168b8af9bc3', // known 200 (celebration banquet)
  'photo-1478146896981-b80fe463b330', // known 200 (elegant tables)
  'photo-1520854221256-17451cc331bf', // serene setup
  'photo-1492684223066-81342ee5ff30', // event gathering lights
  'photo-1519741497674-611481863552', // elegant white floral arch / venue
];

async function checkCandidates() {
  console.log('Testing Unsplash candidate IDs...');
  for (const id of candidateIds) {
    const url = `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;
    try {
      const res = await fetch(url, { method: 'HEAD', headers: { 'User-Agent': 'Mozilla/5.0' } });
      if (res.ok) {
        console.log(`✅ [${res.status}] ${id}`);
      } else {
        console.log(`❌ [${res.status}] ${id}`);
      }
    } catch (e) {
      console.log(`❌ [ERR: ${e.message}] ${id}`);
    }
  }
}

checkCandidates();
